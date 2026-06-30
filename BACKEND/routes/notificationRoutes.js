const express = require("express");
const router = express.Router();

const {
    createNotification,
    getNotifications,
    getNotificationById,
    markAsRead,
    deleteNotification,
    getLowStockNotifications,
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

// CREATE NOTIFICATION
router.post("/", protect, createNotification);

// GET ALL NOTIFICATIONS
router.get("/", protect, getNotifications);

// LOW STOCK NOTIFICATIONS
router.get(
    "/low-stock",
    protect,
    getLowStockNotifications
);

// GET NOTIFICATION BY ID
router.get("/:id", protect, getNotificationById);

// MARK NOTIFICATION AS READ
router.put(
    "/:id/read",
    protect,
    markAsRead
);

// DELETE NOTIFICATION
router.delete("/:id", protect, deleteNotification);

module.exports = router;