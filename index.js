import express from "express";
import service from "./service.js";
import functions from "@google-cloud/functions-framework";

const app = express();

functions.http("newService", async (req, res) => {
  const keyword = req.params[0];
  console.log(keyword);
  try {
    const response = await service(keyword);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

export const run = app;
