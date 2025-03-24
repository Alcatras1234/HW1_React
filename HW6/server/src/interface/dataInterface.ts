import { Category } from "../models/category";
import { Item } from "../models/product";
import {Token} from "../models/token";
import { User } from "../models/user";

var pgp = require("pg-promise")();
var db = pgp("postgres://amogus:1234@localhost:2750/auth_DB");

export const saveProduct = async (req: Item) => {
  try {
    await db.none(
      `INSERT INTO products (name, category, description, count, price) VALUES ('${req.name}', '${req.category}', '${req.description}', ${req.count}, ${req.price})`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProducts = async (page: number, pageSize: number) => {
  try {
    const product = await db.any(
      `SELECT * FROM products LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
    );
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putProduct = async (req: Item, id: number) => {
  try {
    await db.oneOrNone(
      `UPDATE products SET name = '${req.name}', category = '${req.category}', description = '${req.description}', count = ${req.count}, price = ${req.price} WHERE id = '${id}'`
    );
    const product = await db.one(`SELECT * FROM products WHERE id = ${id}`);
    console.log(product);
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await db.none(`DELETE FROM products WHERE id = ${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveCategory = async (req: Category) => {
  try {
    await db.none(`INSERT INTO categories (name) VALUES ('${req.name}')`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategories = async (page: number, pageSize: number) => {
    try {
        const category = await db.any(
        `SELECT * FROM categories LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
        );
        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const putCategory = async (req: Category, id: number) => {
    try {
        await db.oneOrNone(
        `UPDATE categories SET name = '${req.name}' WHERE id = '${id}'`
        );
        const category = await db.one(`SELECT * FROM categories WHERE id = ${id}`);
        console.log(category);
        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCategory = async (id: number) => {
    try {
        const category = await db.one(`SELECT * FROM categories WHERE id = ${id}`);
        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCategory = async (id: number) => {
    try {
        await db.none(`DELETE FROM categories WHERE id = ${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = async (email: string) => {
    try {
      const user: User = await db.oneOrNone(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return user
    } catch (error) {
      console.log(error);
      throw error;
    }
};

export const saveToken = async (token: Token, userId: number) => { 
    try {
        await db.none(
            'INSERT INTO refresh_tokens(token, user_id) VALUES($1, $2)',
            [token.refresahtoken, userId],
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteRefreshToken = async (userId: number): Promise<void> => {
  try {
      const result = await db.result(
          'DELETE FROM refresh_tokens WHERE user_id = $1',
          [userId]
      );

  } catch (error) {
      console.log(error);
      throw error;
  }
};