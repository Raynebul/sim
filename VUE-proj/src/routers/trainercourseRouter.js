import express from "express";
import fs from "fs";
const router = express.Router();
import db from "../databases/database.js";
import { spawn } from "child_process";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.js";

router.get("/:id/:task", (req, res) => {
  let data1 = "";
  let data2 = 0;
  let code = "";
  db.selectTrainerCourseById(req.params.id, function (error, coursetrainer) {
    if (error) {
      console.log(error);
    } else {
      console.log(coursetrainer);
      db.selectTrainerByIDtext(
        coursetrainer.IDtext,
        function (error1, trainer) {
          if (error1) {
            console.log(10);
            res.status(500).end();
          } else {
            console.log(11);
            if (trainer.dataUI != "") {
              //data1 = JSON.parse(trainer.data);
              data1 = JSON.parse(trainer.dataUI);
              code = JSON.parse(trainer.code);
              console.log(data1);
            }
            res.json({
              name: trainer.name,
              //inputs: trainer.inputs,
              //outputs: trainer.outputs,
              //functions: trainer.functions,
              dataUI: data1,
              code: code,
              trainercourse: coursetrainer,
            });
          }
        }
      );
    }
  });
});
router.put("/:id/:task", (req, res) => {
  /* Здесь будет выполняться тест на Python'е */
  //console.log(req.body.dataUI)
  let id = req.body.arrayOfInputs[0];
  //let code = req.body.code.functions[0].functionCode;
  let code = req.body.functionCode;
  let object = req.body.input;
  var output = "";
  console.log(req.body.code.functions[0].functionCode);
  console.log(req.body.code.functions[0].jsonInput);
  console.log(object);

  let testValue = 1;

  const childPython = spawn("python", [
    "./src/routers/translator/translator.py",
    code,
    JSON.stringify(object),
  ]);
  childPython.stdout.on("data", (data) => {
    console.log(`stdout ${data}`);
    output = data.toString();
    /*
    res.json({
      output: data.toString(),
    }); */
  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr ${data}`);
  });

  childPython.on("close", (code) => {
    console.log(`end with ${code}`);
  });

  setTimeout(() => {
    console.log("Результат = ", output);
    res.json({
      output: output,
    });
  }, 1000);

  // console.log("Результат = ", output);
});
router.get("/:id", (req, res) => {
  let data1 = "";
  let data2 = 0;
  let code = "";
  db.selectTrainerCourseById(req.params.id, function (error, trainercourse) {
    if (error) {
      console.log(error);
    } else {
      console.log(trainercourse);
      res.json({
        trainercourse: trainercourse,
      });
    }
  });
});

router.post("/:id", (req, res) => {
  db.addCourseForUser(
    req.body.user,
    req.body.trainercourse,
    function (error1, new_user) {
      if (error1) {
        console.log(error1);
      } else {
        console.log("Этап создание токена для входа пользователя в систему!");
        //console.log(new_user.password, new_user.password);
        //let passwordIsValid = bcrypt.compare(new_user.password, new_user.password);
        /*
        if (!passwordIsValid) {
          console.log("Проблема с паролем");
          return res.status(401).send({ auth: false, token: null });
        }
        let token = jwt.sign({ id: new_user.id }, config.secret, {
          expiresIn: "120s", // expires in 24 hours
          // 86400
        }); */
        console.log("Все норм");
        console.log("DONE!!!");
        res.json({
          //auth: true,
          //token: token,
          user: new_user,
          error: false,
        });
      }
    }
  );
});

router.put("/:id", (req, res) => {
  db.UpdateProgressForUser(
    req.body.user,
    req.body.trainercourse,
    function (error1, new_user) {
      if (error1) {
        console.log(error1);
      } else {
        console.log("Этап создание токена для входа пользователя в систему!");
        //console.log(new_user.password, new_user.password);
        //let passwordIsValid = bcrypt.compare(new_user.password, new_user.password);
        /*
        if (!passwordIsValid) {
          console.log("Проблема с паролем");
          return res.status(401).send({ auth: false, token: null });
        }
        let token = jwt.sign({ id: new_user.id }, config.secret, {
          expiresIn: "120s", // expires in 24 hours
          // 86400
        }); */
        console.log("Все норм");
        console.log("DONE!!!");
        res.json({
          //auth: true,
          //token: token,
          user: new_user,
          error: false,
        });
      }
    }
  );
});

export default {
  router,
};
