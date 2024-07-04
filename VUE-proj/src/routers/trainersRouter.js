import express from "express";
import fs from "fs";
const router = express.Router();
import db from "../databases/database.js";
import { spawn } from "child_process";

router.get("/", (req, res) => {
  db.selectAllTrainers(function (error, trainers) {
    if (error) {
      console.log(1);
    } else {
      res.json({ trainers });
    }
  });
});

export default {
  router,
};
