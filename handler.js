"use strict";
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const nbTrans = require("./nb.messages.json");
const enTrans = require("./en.messages.json");

const server = express();
server.set("port", process.env.PORT || 3000);
server.use(bodyParser.json({ type: "application/json" }));

server.get("/:language", (req, res) => {
  const trans = req.params.language === "en" ? enTrans : nbTrans;
  res.json(200, { [req.params.language]: trans });
});

server.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

const app = serverless(server);

// https://github.com/FidelLimited/serverless-plugin-warmup
module.exports.hello = async (event, context) => {
  // check if we get a warm up event
  if (event.source === "serverless-plugin-warmup") {
    console.log("Warm up!");
    return {
      statusCode: 200,
      body: "Warm up assistant-service"
    };
  }
  return app(event, context);
};
