import express from "express";
import fs from "fs";
const router = express.Router();
import db from "../databases/database.js";
import { spawn, fork } from "child_process";
import { PythonShell } from "python-shell";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/components/files/");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

//const upload = multer({ dest: "src/components/file/" });
const upload = multer({ storage: storage });

router.post("/file", upload.single("file"), (req, res) => {
  //console.log(req.file);
  res.json(req.file);
});

export default {
    router,
  };
  