import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

/*
 * ============================================================
 * RESUME PARSER SERVICE
 * ============================================================
 *
 * Responsibility:
 * - Accept an uploaded PDF or DOCX file
 * - Extract plain text from it
 * - Return clean resume text to the analysis layer
 *
 * This service does NOT:
 * - analyze the resume
 * - calculate match score
 * - call the ML service
 *
 * Its only job is document -> text.
 * ============================================================
 */

/**
 * Normalize extracted text.
 *
 * This removes unnecessary whitespace while keeping
 * meaningful line breaks between sections.
 */
const normalizeText = (text) => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/**
 * Extract text from a PDF buffer.
 *
 * pdf-parse v2 uses the PDFParse class.
 */
const extractPdfText = async (buffer) => {
  let parser;

  try {
    parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    return normalizeText(result?.text || "");
  } finally {
    if (parser) {
      await parser.destroy();
    }
  }
};

/**
 * Extract text from a DOCX buffer.
 *
 * Mammoth can read a DOCX directly from a Buffer.
 */
const extractDocxText = async (buffer) => {
  const result = await mammoth.extractRawText({
    buffer,
  });

  return normalizeText(result?.value || "");
};

/**
 * Main resume parsing function.
 *
 * Supported formats:
 * - PDF
 * - DOCX
 */
const extractResumeText = async (file) => {
  if (!file) {
    const error = new Error("Resume file is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!Buffer.isBuffer(file.buffer)) {
    const error = new Error("Uploaded resume data is invalid.");
    error.statusCode = 400;
    throw error;
  }

  const fileName = String(file.originalname || "").toLowerCase();

  if (fileName.endsWith(".pdf")) {
    return extractPdfText(file.buffer);
  }

  if (fileName.endsWith(".docx")) {
    return extractDocxText(file.buffer);
  }

  const error = new Error(
    "Unsupported resume format. Please upload a PDF or DOCX file.",
  );

  error.statusCode = 400;
  throw error;
};

export {
  extractResumeText,
};

