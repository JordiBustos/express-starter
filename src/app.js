import express from "express";
import startCore from "./startCore.js";
import helmet from "helmet";

var app = express();
startCore(app);

// security
app.use(helmet());
app.disable("x-powered-by");
