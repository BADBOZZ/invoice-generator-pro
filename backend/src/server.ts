import cors from "cors";
import express from "express";
import helmet from "helmet";
import type { PrismaClient } from "@prisma/client";
import { registerHealthRoutes } from "./routes/health.js";
import { logger } from "./lib/logger.js";

export const createServer = (_prisma: PrismaClient) => {
  const app = express();

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false
    })
  );
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*"
    })
  );
  app.use(express.json());

  registerHealthRoutes(app);

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({ err }, "Unhandled error");
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
};
