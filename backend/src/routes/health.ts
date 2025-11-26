import type { Router } from "express";

export const registerHealthRoutes = (router: Router) => {
  router.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });
};
