import { PrismaClient } from "@prisma/client";
import { createServer } from "./server.js";
import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";

const prisma = new PrismaClient();

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", () => {
  void gracefulShutdown();
});
process.on("SIGTERM", () => {
  void gracefulShutdown();
});

const bootstrap = async () => {
  const app = createServer(prisma);
  app.listen(env.PORT, env.HOST, () => {
    logger.info(`API ready at http://${env.HOST}:${env.PORT}`);
  });
};

bootstrap().catch((err) => {
  logger.error({ err }, "Failed to start API");
  process.exit(1);
});
