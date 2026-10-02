// ----------------------------------
// Analysis Controller
// ----------------------------------
//
// POST /api/analysis
//       ↓
// Check resume exists
//       ↓
// Validate Job Description
//       ↓
// Extract resume text
//       ↓
// Determine user ID
//       ↓
// analyzeResume(...)
//       ↓
// Guest → return result
// Authenticated → save + return analysis
// ----------------------------------

import {
  analyzeResume,
  getUserAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
} from "../services/analysisService.js";

import {
  extractResumeText,
} from "../services/resumeParserService.js";

// ----------------------------------
// Constants
// ----------------------------------

const MAX_JD_WORDS = 3000;

// ----------------------------------
// Count words in job description
// ----------------------------------

const countWords = (text) => {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
};

// ----------------------------------
// Analyze Resume Controller
// ----------------------------------

const analyzeResumeController = async (
  req,
  res,
  next
) => {
  try {
    const {
      jobDescription,
    } = req.body;

    // ----------------------------------
    // Check resume upload
    // ----------------------------------

    if (!req.file) {
      res.status(400);

      return next(
        new Error(
          "Resume file is required."
        )
      );
    }

    // ----------------------------------
    // Check job description
    // ----------------------------------

    if (!jobDescription?.trim()) {
      res.status(400);

      return next(
        new Error(
          "Job description is required."
        )
      );
    }

    const cleanedJobDescription =
      jobDescription.trim();

    // ----------------------------------
    // Check job description word count
    // ----------------------------------

    const wordCount =
      countWords(
        cleanedJobDescription
      );

    if (
      wordCount >
      MAX_JD_WORDS
    ) {
      res.status(400);

      return next(
        new Error(
          "Job description cannot exceed 3000 words."
        )
      );
    }

    // ----------------------------------
    // Extract resume text
    // ----------------------------------

    const resumeText =
      await extractResumeText(
        req.file
      );

    if (!resumeText) {
      res.status(400);

      return next(
        new Error(
          "Could not extract text from the uploaded resume."
        )
      );
    }

    // ----------------------------------
    // Determine authenticated user
    // ----------------------------------

    const userId =
      req.user?._id || null;

    // ----------------------------------
    // Run analysis
    // ----------------------------------

    const result =
      await analyzeResume({
        userId,

        resumeText,

        resume: {
          fileName:
            req.file.originalname,

          fileType:
            req.file.mimetype,

          storageKey: null,
        },

        jobDescription:
          cleanedJobDescription,
      });

    // ----------------------------------
    // Guest analysis
    // ----------------------------------

    if (!result.saved) {
      return res.status(200).json({
        success: true,
        message:
          "Resume analyzed successfully.",
        saved: false,
        analysis: null,
        result: result.result,
      });
    }

    // ----------------------------------
    // Authenticated user analysis
    // ----------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Resume analyzed and saved successfully.",
      saved: true,

      analysis: {
        id: result.analysis._id,

        resume:
          result.analysis.resume,

        jobDescription:
          result.analysis.jobDescription,

        status:
          result.analysis.status,

        matchScore:
          result.analysis.matchScore,

        matchedSkills:
          result.analysis.matchedSkills,

        missingSkills:
          result.analysis.missingSkills,

        categoryScores:
          result.analysis.categoryScores,

        recommendations:
          result.analysis.recommendations,

        createdAt:
          result.analysis.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Resume analysis error:",
      error.message
    );

    next(error);
  }
};

// ----------------------------------
// Get Analysis History
// ----------------------------------

const getAnalysisHistory = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
    } = req.query;

    const result =
      await getUserAnalysisHistory({
        userId: req.user._id,
        page,
        limit,
      });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------
// Get Single Analysis
// ----------------------------------

const getSingleAnalysis = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400);

      return next(
        new Error(
          "Analysis ID is required."
        )
      );
    }

    const analysis =
      await getAnalysisById({
        userId: req.user._id,
        analysisId: id,
      });

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    // ----------------------------------
    // Invalid MongoDB ObjectId
    // ----------------------------------

    if (
      error.name ===
      "CastError"
    ) {
      res.status(400);

      return next(
        new Error(
          "Invalid analysis ID."
        )
      );
    }

    // ----------------------------------
    // Analysis doesn't belong to this
    // user or does not exist
    // ----------------------------------

    res.status(404);

    next(error);
  }
};

// ----------------------------------
// Delete Analysis
// ----------------------------------

const deleteAnalysisController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const { id } =
        req.params;

      // ----------------------------------
      // Check analysis ID
      // ----------------------------------

      if (!id) {
        res.status(400);

        return next(
          new Error(
            "Analysis ID is required."
          )
        );
      }

      // ----------------------------------
      // Delete analysis
      // ----------------------------------
      //
      // req.user._id comes from the
      // authenticated JWT, not the frontend.
      // ----------------------------------

      await deleteAnalysis({
        userId:
          req.user._id,

        analysisId: id,
      });

      return res.status(200).json({
        success: true,
        message:
          "Analysis deleted successfully.",
      });
    } catch (error) {
      // ----------------------------------
      // Invalid MongoDB ObjectId
      // ----------------------------------

      if (
        error.name ===
        "CastError"
      ) {
        res.status(400);

        return next(
          new Error(
            "Invalid analysis ID."
          )
        );
      }

      // ----------------------------------
      // Analysis doesn't exist
      // or belongs to another user
      // ----------------------------------

      res.status(404);

      next(error);
    }
  };

// ----------------------------------
// Exports
// ----------------------------------

export {
  analyzeResumeController,
  getAnalysisHistory,
  getSingleAnalysis,
  deleteAnalysisController,
};