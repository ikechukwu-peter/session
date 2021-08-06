import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
//@ts-ignore
import xss from 'xss-clean';
import compression from 'compression';
import passport from 'passport';
import cors from 'cors'
import userRouter from './routes/userRoutes'
import sessionRouter from './routes/sessionRoutes';
import authenticate from './config/passport';

const app: Application = express();

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//compress app
app.use(compression());

app.use(passport.initialize());

// Passport Config
authenticate(passport)

//CORS enable
app.use(cors());

// 3) ROUTES
app.use("/users", userRouter);
app.use("/api", sessionRouter);
//app.use("/admin", adminRouter)

//Handle all undefined route hit by the client
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json(
    `Can't find ${req.originalUrl} on this server!`,
  );
});

export default app;
