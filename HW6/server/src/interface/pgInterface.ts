import {User} from "../models/user";
import {Token} from "../models/token";

var pgp = require("pg-promise")();
var db = pgp("postgres://amogus:1234@localhost:2750/auth_DB");

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