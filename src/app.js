import express from "express";
import helmet from "helmet";
import startCore from "./startCore.js";
import { validateContentType } from "./middlewares/security.js";
import deleteTokenJob from "./cron-jobs/delete-tokens.js";

var app = express();
startCore(app);

// security
app.use(helmet());
app.use(validateContentType);
app.disable("x-powered-by");
app.use((_, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "deny");
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://cdn.socket.io;",
  );
  next();
});

// start cron jobs
deleteTokenJob.start();
