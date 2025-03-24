import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Invalid token" });
    }

    req.user = user; // Добавляем пользователя в `req` для дальнейшего использования
    next(); // Передаем управление следующему middleware или обработчику
  })(req, res, next);
};