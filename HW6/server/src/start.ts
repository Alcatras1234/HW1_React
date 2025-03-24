import express from "express";
import productsRouter from "./controller/itemController";
import authRouter from './controller/authController';
import categoryRouter from "./controller/categoryController";
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

app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use('/api/auth', authRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
