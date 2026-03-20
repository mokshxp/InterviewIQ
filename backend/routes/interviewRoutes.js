const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");
const authMiddleware = require("../middleware/authMiddleware");

const { interviewSchemas } = require("../middleware/validator");

router.get("/", authMiddleware, interviewSchemas.listSessions, interviewController.listSessions);
router.post("/start", authMiddleware, interviewSchemas.startInterview, interviewController.startInterview);
router.get("/:id", authMiddleware, interviewSchemas.getById, interviewController.getSession);
router.post("/:id/next-round", authMiddleware, interviewSchemas.getById, interviewSchemas.startInterview, interviewController.nextRound);
router.post("/:id/submit-answer", authMiddleware, interviewSchemas.getById, interviewSchemas.submitAnswer, interviewController.submitAnswer);
router.post("/:id/end", authMiddleware, interviewSchemas.getById, interviewController.endInterview);
router.get("/:id/results", authMiddleware, interviewSchemas.getById, interviewController.getResults);

module.exports = router;
