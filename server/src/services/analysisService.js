import Analysis from "../models/Analysis.js";

// ----------------------------------
// ML Service Configuration
// ----------------------------------

const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || "http://localhost:8000";

const USE_MOCK_ML =
  process.env.USE_MOCK_ML === "true";

// ----------------------------------
// Mock ML Result
// ----------------------------------
//
// Temporary result used until Spandan's
// FastAPI ML service is connected.
// ----------------------------------

const getMockMLResult = () => ({
  matchScore: 75,

  matchedSkills: [
    "JavaScript",
    "React",
    "HTML",
    "CSS",
  ],

  missingSkills: [
    "TypeScript",
    "Next.js",
  ],

  categoryScores: {
    technicalSkills: 78,
    experience: 72,
    education: 80,
    projects: 75,
  },

  recommendations: [
    "Highlight your most relevant React projects.",
    "Mention measurable outcomes from your projects.",
    "Add relevant TypeScript experience if applicable.",
  ],
});

// ----------------------------------
// Normalize ML Result
// ----------------------------------

const normalizeMLResult = (result) => {
  if (
    !result ||
    typeof result !== "object"
  ) {
    throw new Error(
      "ML service returned an invalid response."
    );
  }

  const matchScore = Number(
    result.matchScore
  );

  if (
    Number.isNaN(matchScore) ||
    matchScore < 0 ||
    matchScore > 100
  ) {
    throw new Error(
      "ML service returned an invalid match score."
    );
  }

  const matchedSkills =
    Array.isArray(result.matchedSkills)
      ? result.matchedSkills.map(String)
      : [];

  const missingSkills =
    Array.isArray(result.missingSkills)
      ? result.missingSkills.map(String)
      : [];

  const recommendations =
    Array.isArray(result.recommendations)
      ? result.recommendations.map(String)
      : [];

  const categoryScores =
    result.categoryScores &&
    typeof result.categoryScores === "object"
      ? result.categoryScores
      : {};

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    categoryScores,
    recommendations,
  };
};

// ----------------------------------
// Call ML Service
// ----------------------------------

const callMLService = async ({
  resumeText,
  jobDescription,
}) => {
  // ----------------------------------
  // Use mock ML when enabled
  // ----------------------------------

  if (USE_MOCK_ML) {
    return normalizeMLResult(
      getMockMLResult()
    );
  }

  // ----------------------------------
  // Call FastAPI ML service
  // ----------------------------------

  try {
    const response = await fetch(
      `${ML_SERVICE_URL}/analyze`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),

        signal: AbortSignal.timeout(60000),
      }
    );

    // ----------------------------------
    // Handle unsuccessful ML response
    // ----------------------------------

    if (!response.ok) {
      let errorMessage =
        `ML service returned HTTP ${response.status}`;

      try {
        const errorData =
          await response.json();

        if (errorData?.message) {
          errorMessage =
            errorData.message;
        }

        if (errorData?.detail) {
          errorMessage =
            errorData.detail;
        }
      } catch {
        // Ignore JSON parsing failure
      }

      throw new Error(errorMessage);
    }

    // ----------------------------------
    // Parse ML response
    // ----------------------------------

    const result =
      await response.json();

    return normalizeMLResult(result);
  } catch (error) {
    if (
      error.name === "TimeoutError"
    ) {
      throw new Error(
        "ML service request timed out."
      );
    }

    throw new Error(
      `ML analysis failed: ${error.message}`
    );
  }
};

// ----------------------------------
// Analyze Resume
// ----------------------------------

const analyzeResume = async ({
  userId = null,
  resumeText,
  resume,
  jobDescription,
}) => {
  if (!resumeText?.trim()) {
    throw new Error(
      "Resume text is required."
    );
  }

  if (!jobDescription?.trim()) {
    throw new Error(
      "Job description is required."
    );
  }

  if (!resume?.fileName) {
    throw new Error(
      "Resume file information is required."
    );
  }

  if (!resume?.fileType) {
    throw new Error(
      "Resume file type is required."
    );
  }

  const cleanedJobDescription =
    jobDescription.trim();

  // ----------------------------------
  // Run ML analysis
  // ----------------------------------

  const result =
    await callMLService({
      resumeText: resumeText.trim(),
      jobDescription:
        cleanedJobDescription,
    });

  // ----------------------------------
  // Guest
  // ----------------------------------

  if (!userId) {
    return {
      analysis: null,
      result,
      saved: false,
    };
  }

  // ----------------------------------
  // Authenticated user
  // ----------------------------------

  const analysis =
    await Analysis.create({
      user: userId,

      resume: {
        fileName: resume.fileName,
        fileType: resume.fileType,
        storageKey:
          resume.storageKey || null,
      },

      jobDescription:
        cleanedJobDescription,

      status: "completed",

      matchScore:
        result.matchScore,

      matchedSkills:
        result.matchedSkills,

      missingSkills:
        result.missingSkills,

      categoryScores:
        result.categoryScores,

      recommendations:
        result.recommendations,
    });

  return {
    analysis,
    result,
    saved: true,
  };
};

// ----------------------------------
// Get User Analysis History
// ----------------------------------

const getUserAnalysisHistory = async ({
  userId,
  page = 1,
  limit = 10,
}) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  const currentPage =
    Math.max(
      Number(page) || 1,
      1
    );

  const perPage =
    Math.min(
      Math.max(
        Number(limit) || 10,
        1
      ),
      50
    );

  const skip =
    (currentPage - 1) *
    perPage;

  const [
    analyses,
    total,
  ] = await Promise.all([
    Analysis.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(perPage)
      .lean(),

    Analysis.countDocuments({
      user: userId,
    }),
  ]);

  const totalPages =
    Math.ceil(
      total / perPage
    );

  return {
    analyses,

    pagination: {
      page: currentPage,
      limit: perPage,
      total,
      totalPages,

      hasNextPage:
        currentPage <
        totalPages,

      hasPreviousPage:
        currentPage > 1,
    },
  };
};

// ----------------------------------
// Get Single Analysis
// ----------------------------------

const getAnalysisById = async ({
  userId,
  analysisId,
}) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  if (!analysisId) {
    throw new Error(
      "Analysis ID is required."
    );
  }

  const analysis =
    await Analysis.findOne({
      _id: analysisId,
      user: userId,
    }).lean();

  if (!analysis) {
    throw new Error(
      "Analysis not found."
    );
  }

  return analysis;
};

// ----------------------------------
// Delete Analysis
// ----------------------------------
//
// Important:
// The authenticated user's ID is used in
// the MongoDB query.
//
// This prevents a user from deleting
// another user's analysis.
// ----------------------------------

const deleteAnalysis = async ({
  userId,
  analysisId,
}) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  if (!analysisId) {
    throw new Error(
      "Analysis ID is required."
    );
  }

  const analysis =
    await Analysis.findOneAndDelete({
      _id: analysisId,
      user: userId,
    });

  if (!analysis) {
    throw new Error(
      "Analysis not found."
    );
  }

  return analysis;
};

// ----------------------------------
// Exports
// ----------------------------------

export {
  analyzeResume,
  getUserAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
};


