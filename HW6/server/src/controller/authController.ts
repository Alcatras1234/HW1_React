import { Router } from "express";
import { loginUser, logoutUser } from "../services/loginService";

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const authController = {
  login: asyncHandler(loginUser),
  logout: asyncHandler(logoutUser),
};

router.post("/login", authController.login);
router.delete("/logout", authController.logout);

export default router;
