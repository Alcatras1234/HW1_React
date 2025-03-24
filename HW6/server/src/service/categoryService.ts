import { Request, Response } from "express";
import {
  deleteCategory,
  getCategories,
  getCategory,
  putCategory,
  saveCategory,
} from "../interface/dataInterface";
import { Category } from "../models/category";

export const addCategory = async (req: Request, res: Response) => {
  try {
    console.log(`Начал сохранение категории! ${req.body.name}`);
    const category = req.body as Category;
    if (!category.name) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    await saveCategory(category);
    res.status(201).send();
    console.log("Категория успешно сохранена!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCategoriesData = async (req: Request, res: Response) => {
  try {
    console.log("Начало получения категорий!");
    var page = parseInt(req.query.page as string);
    var pageSize = parseInt(req.query.pageSize as string);

    if (Number.isNaN(page) || Number.isNaN(pageSize)) {
      res.status(400).send("Один из параметров пустой");
    }

    const categories = await getCategories(page, pageSize);
    res.status(200).send(categories);
    console.log("Категории успешно получены!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const putCategoryData = async (req: Request, res: Response) => {
  try {
    console.log(`Начало изменения категории! ${req.body.name}`);
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    const category = req.body as Category;
    if (!category.name) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    const categoryOut = await putCategory(category, id);
    res.status(200).send(categoryOut);
    console.log("Категория успешно изменена!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCategoryData = async (req: Request, res: Response) => {
  try {
    console.log("Начало получения категории!");
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    const category = await getCategory(id);
    res.status(200).send(category);
    console.log("Категория успешно получена!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteCategoryData = async (req: Request, res: Response) => {
  try {
    console.log("Начало удаления категории!");
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Имя категории не может быть пустым");
      return;
    }
    await deleteCategory(id);
    res.status(200).send();
    console.log("Категория успешно удалена!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
