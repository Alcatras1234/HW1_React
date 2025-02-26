import axios from "axios";
import { Product } from "../models/productInterface";

export const handlerPostProduct = async (data: Product) => {
  try {
    const response = await axios.post("http://localhost:3000/api/products", data);
    return response;
  } catch (error) {
    return error;
  }
};
