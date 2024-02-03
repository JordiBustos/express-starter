import express from "express";
import helmet from "helmet";
import startCore from "./startCore.js";

var app = express();
startCore(app);

// security
app.use(helmet());
app.disable("x-powered-by");
