import { Request, Response } from "express";
import { User } from "../models/user";
import { Token } from "../models/token";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import {
  deleteRefreshToken,
  getUser,
  saveToken,
} from "../interface/pgInterface";

// Local Strategy for login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Extract email from req.body
      passwordField: "password", // Extract password from req.body
    },
    async (
      email: string,
      password: string,
      done: (error: any, user?: any, options?: any) => void
    ) => {
      try {
        const user: User | null = await getUser(email);

        if (!user) {
          // If user is not found
          return done(null, false, { message: "Incorrect email." });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy for token validation
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "default_secret",
    },
    async (payload: any, done: (err: any, user?: any) => void) => {
      try {
        if (!payload || !payload.sub) {
          return done(null, false);
        }

        const userId = payload.sub;
        return done(null, userId);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Logout user
export const logoutUser = async (req: Request, res: Response) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err: any, user: number, info: any) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (!user) {
          return res.status(401).json({
            message: info?.message || "Invalid token",
          });
        }

        // Clear cookies
        res.clearCookie("accessToken", {
          httpOnly: true,
        });

        res.clearCookie("refreshToken", {
          httpOnly: true,
        });

        // Delete refresh token from database
        await deleteRefreshToken(user);

        return res.status(200).json({ message: "User logged out" });
      }
    )(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server problem",
    });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    passport.authenticate(
      "local",
      { session: false },
      async (err: any, user: User, info: any) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (!user) {
          return res.status(400).json({
            message: info?.message || "Invalid credentials",
          });
        }

        // Generate access token
        const accessToken = jwt.sign(
          {
            sub: user.id,
            email: user.email,
            group: user.groupName,
            avatar: user.avatar,
          },
          process.env.JWT_SECRET || "default_secret",
          {
            algorithm: "HS256",
            expiresIn: "15m",
          }
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
          {
            sub: user.id,
            email: user.email,
            group: user.groupName,
            avatar: user.avatar,
          },
          process.env.JWT_SECRET || "default_secret",
          {
            algorithm: "HS256",
            expiresIn: "7d",
          }
        );

        // Set cookies
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Save refresh token in database
        const refreshTokenAsObject: Token = { refresahtoken: refreshToken };
        await saveToken(refreshTokenAsObject, user.id);

        return res.json({ accessToken, refreshToken });
      }
    )(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Server problem",
    });
  }
};