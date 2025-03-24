import { Request, Response } from "express";
import {
  deleteProduct,
  getProducts,
  putProduct,
  saveProduct,
} from "../interface/dataInterface";
import { Item } from "../models/product";

export const addItem = async (req: Request, res: Response) => {
  console.log("Начал добавлять элемент в бд");

  try {
    console.log(req.body);
    var item = req.body as Item;
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        console.log(`${key}: ${req.body[key as keyof Item]}`);
        if (!req.body[key]) {
          res.status(400).send(`Поле ${key} не может быть пустым`);
          return;
        }
      }
    }
    await saveProduct(item);

    res.status(200).json({ message: "Элемент успешно добавлен в бд" });
    console.log("Элемент успешно добавлен в бд");
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении элемента в бд" });
  }
};
export const getItem = async (req: Request, res: Response) => {
  console.log("Начал получать элемент из бд");

  try {
    console.log(req.query);
    var page = parseInt(req.query.page as string);
    var pageSize = parseInt(req.query.pageSize as string);

    if (Number.isNaN(page) || Number.isNaN(pageSize)) {
      res.status(400).send("Один из параметров пустой");
    }
    const products = await getProducts(page, pageSize);
    res.status(200).json(products);
    console.log("Элемент успешно получен из бд");
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const putItem = async (req: Request, res: Response) => {
  console.log("Начал обновлять элемент в бд");

  try {
    console.log(req.body);
    var id: number = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    var item = req.body as Item;
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        console.log(`${key}: ${req.body[key as keyof Item]}`);
        if (!req.body[key]) {
          res.status(400).send(`Поле ${key} не может быть пустым`);
          return;
        }
      }
    }
    var updatedProduct: Item = await putProduct(item, id);

    res.status(200).json(updatedProduct);
    console.log("Элемент успешно обновлен в бд");
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении элемента в бд" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  console.log("Начал удалять элемент из бд");

  try {
    console.log(req.query);
    var id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    await deleteProduct(id);
    res.status(200).json({ message: "Элемент успешно удален из бд" });
    console.log("Элемент успешно удален из бд");
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении элемента из бд" });
  }
};
