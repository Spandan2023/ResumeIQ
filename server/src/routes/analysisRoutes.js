import express from "express";

import {
  analyzeResumeController,
  getAnalysisHistory,
  getSingleAnalysis,
  deleteAnalysisController,
} from "../controllers/analysisController.js";

import protect, {
  optionalProtect,
} from "../middlewares/authMiddleware.js";

import uploadResume from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// ----------------------------------
// Resume Analysis
// ----------------------------------
//
// Guest + authenticated users
//
// POST /api/analysis
// ----------------------------------

router.post(
  "/",
  optionalProtect,
  uploadResume,
  analyzeResumeController
);

// ----------------------------------
// Analysis History
// ----------------------------------
//
// Authenticated users only
//
// GET /api/analysis/history
// ----------------------------------

router.get(
  "/history",
  protect,
  getAnalysisHistory
);

// ----------------------------------
// Single Analysis
// ----------------------------------
//
// Authenticated users only
//
// GET /api/analysis/:id
// ----------------------------------

router.get(
  "/:id",
  protect,
  getSingleAnalysis
);

// ----------------------------------
// Delete Analysis
// ----------------------------------
//
// Authenticated users only
//
// DELETE /api/analysis/:id
// ----------------------------------

router.delete(
  "/:id",
  protect,
  deleteAnalysisController
);

export default router;