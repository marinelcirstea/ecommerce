import express from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes";
import errorHandler from "./middlewares/error-handler";

const app = express();

/**
 * Compress all requests
 */
app.use(compression());
/**
 * Accept requests from other websites
 */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
/**
 * Use cookies
 */
app.use(cookieParser());
/**
 * Global API router
 */
app.use("/api", router);
/**
 * Global error handler
 */
app.use(errorHandler);

export default app;
