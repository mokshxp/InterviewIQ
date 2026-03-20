const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { requireAuth } = require("@clerk/express");

const { chatSchemas } = require("../middleware/validator");

router.get("/sessions", requireAuth(), chatController.getSessions);
router.post("/sessions", requireAuth(), chatSchemas.createSession, chatController.createSession);
router.delete("/sessions/:id", requireAuth(), chatController.deleteSession);

router.post("/message", requireAuth(), chatSchemas.sendMessage, chatController.sendMessage);
router.get("/history", requireAuth(), chatSchemas.getHistory, chatController.getHistory);
router.post("/quick-action", requireAuth(), chatSchemas.quickAction, chatController.quickAction);

module.exports = router;
