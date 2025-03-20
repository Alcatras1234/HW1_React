import bcrypt from "bcrypt";
import path from "path";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";


const app = express();
app.use(express.json());
app.use(passport.initialize());

const JWT_SECRET = 'rgddghdghdg';


interface MockUser {
  id: number;
  name: string;
  password: string;
}


const mockUser: MockUser = {
  id: 1,
  name: "root",
  password: bcrypt.hashSync("mockPassword", 10),
};


passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      if (username !== mockUser.name) {
        return done(null, false, { message: "Wrong username" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, mockUser.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "Wrong password" });
      }
      
      return done(null, mockUser);
    } catch (err) {
      return done(err);
    }
  })
);


type JwtPayload = { id: number };
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwt_payload: JwtPayload, done) => {
      if (jwt_payload.id === mockUser.id) {
        return done(null, mockUser);
      }
      return done(null, false, { message: "Invalid token" });
    }
  )
);

app.use((req, res, next) => {
  console.log(`🔥 [${req.method}] ${req.url} - Body:`, req.body);
  next();
});
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("❌ Ошибка:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Сервер работает!");
});

app.post("/login", (req: Request, res: Response, next) => {
  console.log("📥 Получен запрос на /login:", req.body);

  passport.authenticate("local", { session: false }, (err: any, user: MockUser | false, info: { message?: string }) => {
    console.log("🔍 Результат аутентификации:", { err, user, info });

    if (err) {
      console.error("Ошибка в аутентификации:", err);
      return next(err);
    }
    
    if (!user) {
      console.warn("Ошибка входа:", info?.message);
      return res.status(400).json({ path: "/login", message: info?.message || "Authentication Error" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  })(req, res, next);
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.json({
      message: "You made it to the secure route",
      user: req.user,
    });
  }
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
