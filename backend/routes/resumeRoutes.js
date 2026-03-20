const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const { requireAuth } = require("@clerk/express");
const upload = require("../middleware/upload");

const { resumeSchemas } = require("../middleware/validator");

router.post("/upload", requireAuth(), upload.single("resume"), resumeController.uploadResume);
router.get("/list", requireAuth(), resumeController.listResumes);
router.get("/:id", requireAuth(), resumeSchemas.getById, resumeController.getResume);
router.delete("/:id", requireAuth(), resumeSchemas.getById, resumeController.deleteResume);
router.put("/:id/touch", requireAuth(), resumeSchemas.getById, resumeController.touchResume);
router.get("/:id/structured", requireAuth(), resumeSchemas.getById, resumeController.getStructuredResume);

module.exports = router;
