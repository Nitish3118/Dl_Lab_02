import express from "express";
import {
  addItem,
  getItems,
  deleteItem,
  updateItem,
  searchItems
} from "../controllers/itemController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addItem);
router.get("/", getItems);
router.get("/search", searchItems);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

export default router;