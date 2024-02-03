import express from "express";
import helmet from "helmet";
import startCore from "./startCore.js";

var app = express();
startCore(app);

// security
app.use(helmet());
app.disable("x-powered-by");
app.use((_, res, next) => {
  res.setHeader("Content-Type", "application/json"); // Change 'application/json' to the relevant MIME type for your application.
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "deny");
  res.setHeader("Content-Security-Policy", "default-src 'none'");
  next();
});
