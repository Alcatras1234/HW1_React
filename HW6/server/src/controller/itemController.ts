import { Router } from "express";
import express from "express";
import { addItem, deleteItem, getItem, putItem } from "../service/itemService";
import { authenticateJWT } from "../service/authMiddleware";

const router = Router();

router.use(express.json());

export const itemController = {
  addItem: addItem,
  getItem: getItem,
  putItem: putItem,
  deleteItem: deleteItem,
};

router.post("/", authenticateJWT, itemController.addItem);
router.get("/", authenticateJWT, itemController.getItem);
router.put("/:id", authenticateJWT, itemController.putItem);
router.delete("/:id", authenticateJWT, itemController.deleteItem);

export default router;
