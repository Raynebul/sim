import express from "express";
import fs from "fs";
const router = express.Router();
import db from "../databases/database.js";
import trainers from "../components/data/trainers.json" with { type: "json" };


router.post("/", (req, res) => {
  db.script(trainers, function (script_load) {
    if (script_load) {
      res.json({ script_load: script_load });
    } else {
      console.log(1)
    }
  });
});

router.get("/", (req, res) => {
  db.selectAllTrainers(function (error, trainers) {
    if(error) {
      console.log(1)
    }
    else {
      let script_loaded = false;
      if(trainers.length != 0) {
         script_loaded = true
      } else {
        script_loaded = false
      }
      res.json({script_loaded: script_loaded})
    }
  })
})

export default {
    router,
  };
  