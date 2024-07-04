import express from "express";
import fs from "fs";
const router = express.Router();
import db from "../databases/database.js";
import { spawn } from "child_process";

router.get("/:id", (req, res) => {
  let data1 = "";
  let data2 = 0;
  let code = ""
  db.selectTrainerByIDtext(req.params.id, function (error, trainer) {
    if (error) {
      res.status(500).end();
    } else {
      console.log(11);
      if (trainer.dataUI != "") {
        //data1 = JSON.parse(trainer.data);
        data1 = JSON.parse(trainer.dataUI);
        code = JSON.parse(trainer.code);
        //console.log(data1);
      }
      res.json({
        name: trainer.name,
        //inputs: trainer.inputs,
        //outputs: trainer.outputs,
        //functions: trainer.functions,
        dataUI: data1,
        code: code,
      });
    }
  });
});
router.put("/:id", (req, res) => {
  /* Здесь будет выполняться тест на Python'е */
  //console.log(req.body.dataUI)
  let id = req.body.arrayOfInputs[0];
  //let code = req.body.code.functions[0].functionCode;
  let code = req.body.functionCode;
  let object = req.body.input;
  var output = "";
  console.log(req.body);
  //console.log(req.body.code.functions[0].functionCode);
  //console.log(req.body.code.functions[0].jsonInput);
  //console.log(object);

  let testValue = 1;

  const childPython = spawn(process.env.VITE_PYTHON_MODE, [
    "./src/routers/translator/translator.py",
    code,
    JSON.stringify(object),
  ]);
  childPython.stdout.on("data", (data) => {
    //console.log(`stdout ${data}`);
    output = data.toString();
    console.log("Выход", output);
    res.json({
      output: output,
    });
  });

  childPython.stderr.on("data", (data) => {
    //console.log(data)
    console.error(`stderr ${data}`);
    /*
    res.json({
      error: data,
    }); */
  });

  childPython.on("close", (code) => {
    //console.log(`детский процесс завершился с кодом ${code}`);
  });
  /*
  childPython.stdout.on("data", (data) => {
   // console.log(`stdout ${data}`);
    output = data.toString();

  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr ${data}`);
  });

  childPython.on("close", (code) => {
    console.log(`end with ${code}`);
  }); /

  /*
  setTimeout(() => {
    console.log("Результат = ", output);
    res.json({
      output: output,
    });
  }, 1000); */

  // console.log("Результат = ", output);
});


export default {
    router,
  };
  