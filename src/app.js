const express = require("express");
const startCore = require("./startCore");

var app = express();
startCore(app);
