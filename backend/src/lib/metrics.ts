import { collectDefaultMetrics, Histogram, Registry } from "prom-client";
import type { Request, Response, NextFunction } from "express";

const registry = new Registry();
collectDefaultMetrics({ register: registry });

const httpRequestDurationSeconds = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

registry.registerMetric(httpRequestDurationSeconds);

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDurationSeconds.startTimer({
    method: req.method,
    route: req.route?.path ?? req.path
  });

  res.on("finish", () => {
    end({ status_code: res.statusCode });
  });

  next();
};

export const metricsHandler = (_req: Request, res: Response) => {
  res.set("Content-Type", registry.contentType);
  registry
    .metrics()
    .then((payload) => res.send(payload))
    .catch(() => {
      res.status(500).send("unable to collect metrics");
    });
};
