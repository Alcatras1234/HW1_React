import express from "express";
import authRouter from './controller/authController';
import { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`🔥 [${req.method}] ${req.url} - Body:`, req.body);
  next();
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Ошибка:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});


app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
