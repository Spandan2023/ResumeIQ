import multer from "multer";

/*
 * ============================================================
 * RESUME UPLOAD MIDDLEWARE
 * ============================================================
 *
 * Responsibility:
 * - Receive a single resume file
 * - Keep the file in memory temporarily
 * - Allow PDF and DOCX only
 * - Limit the file size to 10 MB
 *
 * The parser service will later read:
 *
 * req.file.buffer
 *
 * We are NOT permanently storing the uploaded file yet.
 * ============================================================
 */

/*
 * Store uploaded files in memory.
 *
 * This is appropriate for our current flow because we only need
 * the resume temporarily to extract its text and send that text
 * to the analysis layer.
 */
const storage = multer.memoryStorage();

/*
 * Allowed resume MIME types.
 */
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/*
 * Validate uploaded file type.
 */
const fileFilter = (req, file, callback) => {
  const fileName = String(file.originalname || "").toLowerCase();

  const isPdf = fileName.endsWith(".pdf");
  const isDocx = fileName.endsWith(".docx");

  const hasAllowedExtension = isPdf || isDocx;
  const hasAllowedMimeType = allowedMimeTypes.has(file.mimetype);

  if (!hasAllowedExtension || !hasAllowedMimeType) {
    return callback(
      new Error("Only PDF and DOCX resume files are allowed."),
      false,
    );
  }

  return callback(null, true);
};

/*
 * Configure Multer.
 */
const uploadResume = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1,
  },

  fileFilter,
}).single("resume");

export default uploadResume;


