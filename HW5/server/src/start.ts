import express from "express";
import productsRouter from "./controller/itemController";
import categoryRouter from "./controller/categoryController";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
