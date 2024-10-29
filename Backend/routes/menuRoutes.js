const express = require("express");
const { createMenu, getMenus, getMenuById, deleteMenu, editMenu } = require("../controllers/menuController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createMenu).get(protect, getMenus);
router.route("/:id").get(getMenuById).delete(protect, deleteMenu).put(protect, editMenu);

module.exports = router;
