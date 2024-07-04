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

//import { validate } from 'jsonschema';

router.get("/", (req, res) => {
  //let tmcourses;
  /* tm.selectAllTMCourses(function (error, tm_courses) {
      tmcourses = tm_courses;
    });
    setTimeout(
      () =>
        db.selectAllCourses(function (error, courses) {
          if (error) {
            console.log(1);
            res.status(500).end();
          } else if (courses) {
            db.selectAllFSMCourses(function (error, fsm_courses) {
              if (fsm_courses) {
                res.json({
                  courses: courses,
                  fsm_courses: fsm_courses,
                  tm_courses: tmcourses,
                  username: req.session.username,
                });
              }
            });
          } else {
            console.log(3);
            res.status(404).end();
          }
        }),
      1000
    ); */
});

router.post("/", (req, res) => {
  let IDtext = req.body.IDtext;
  let name = req.body.name;
  //let inputs = req.body.inputs;
  //let outputs = req.body.outputs;
  //let functions = req.body.functions;
  let date = req.body.date;
  let author = req.body.author;
  let data = {
    date: date,
    author: author,
  };
  db.addTrainer(
    IDtext,
    name,
    //inputs,
    //outputs,
    //functions,
    data,
    function (error) {}
  );
});

router.get("/:id", (req, res) => {
  let UI1 = "";
  let code = "";
  let data2 = 0;
  let metadata = "";
  db.selectTrainerByIDtext(req.params.id, function (error, trainer) {
    if (error) {
      console.log(10);
      res.status(500).end();
    } else if (trainer !== undefined) {
      if (trainer.dataUI != "") {
        UI1 = JSON.parse(trainer.dataUI);
      }
      if (trainer.code != "") {
        code = JSON.parse(trainer.code);
      }
      res.json({
        name: trainer.name,
        dataUI: UI1,
        code: code,
      });
    } else {
      res.status(500).end();
    }
  });
});

router.post("/:id", (req, res) => {
  var UI = JSON.stringify(req.body.dataUI);
  var code = JSON.stringify(req.body.code);
  db.addDataToTrainer(req.params.id, UI, code, function (error) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        test: true,
      });
    }
  });

  /*
  db.seletcTrainerByIDtext(req.params.id, function (error, trainer) {
    if (error) {
      console.log(10);
      res.status(500).end();
    } else {
      console.log(11);
      res.json({
        name: trainer.name,
        inputs: trainer.inputs,
        outputs: trainer.outputs,
        functions: trainer.functions,
      });
    }
  }); */
});

router.post("/:id/file", upload.single("file"), (req, res) => {
  //console.log(req.file);
  res.json(req.file);
});

router.delete("/:id/file", (req, res) => {
  let path = "./src/components/files/" + req.body.attributes.filename
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  console.log(path);
  res.json({ test: true });
});

router.put("/:id/file", (req, res) => {
  //let path = "./src/components/files/" + req.body.attributes.filename
  let path = "./src/components/files/" + req.body.attributes.filename
  console.log(path)
  fs.readFile(path, (err, data) => {
    let error = false;
    if (!err && data) {
      console.log(data)
      error = false
    }
    if(err) {
      console.log(err)
      error = true;
    }
    res.json({ error: error });
  })
  //res.json({ test: true });
});


router.put("/:id", (req, res) => {
  /* Здесь будет выполняться тест на Python'е */
  let code = req.body.functionCode;
  let object = req.body.input;
  var output = "";

  /* Здесь будет происходить запуск Docker'a */
  /* использовать -detach, чтобы код крутился бесконечно*/
  /*
  DOCKERFILE:
  FROM python
  WORKDIR /app
  COPY . /app/
  ENTRYPOINT ["python", "translator.py"
  */
  //docker run --rm translator code JSON.stringify(object)
  /* Здесь будет происходить запуск Docker'a */
  //console.log(req.body);
  console.log("данные для теста:", code, JSON.stringify(object));
  const childPython = spawn(process.env.VITE_PYTHON_MODE, [
    "./src/routers/translator/translator.py",
    code,
    JSON.stringify(object),
  ]);
  let stringChildPython = JSON.stringify(childPython);
  //console.log("Детский процесс -", childPython);
  //console.log("Детский процесс -", stringChildPython);
  stringChildPython = JSON.parse(stringChildPython);
  //console.log("Детский процесс -", stringChildPython);

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
});



router.delete("/:id", (req, res) => {
  db.deleteTrainerByIDtext(req.params.id, function (error) {
    if (error) {
      console.log(error);
    }
  });
});

router.put("/:id/period", (req, res) => {
  let startPeriod = req.body.startPeriod;
  let command = req.body.command; //команда, которая будет отсылаться на питон;
  let delay = req.body.delay;
  let pyshell;
  delay *= 1000; //если время = 0.1, то будет 100
  let stopPeriod;
  let code = req.body.functionCode;
  let object;
  let id;
  if (req.body.arrayOfInputs != "") {
    id = req.body.arrayOfInputs[0];
  }
  if (req.body.input != "") {
    object = req.body.input;
  }
  console.log(req.body.code.functions[0].functionCode);
  console.log(req.body.code.functions[0].jsonInput);
  //console.log(object);
  //onsole.log("checked!", command, delay);
  pyshell = new PythonShell("./src/routers/translator/translatorPeriod.py");
  //console.log(pyshell);
  //console.log("Process!");
  pyshell.send(command);
  pyshell.on("message", function (output) {
    console.log(output);
    res.json({
      output: output,
    });
  });
  // Здесь мы будем использовать fork(), а не spawn(), так как нужно
  // обеспечить коммуникацию между родительским и дочерним, непрерывая процесса дочернего

  let commands = ["None", "stop"];

  if (startPeriod === true) {
    pyshell = new PythonShell("./src/routers/translator/translatorPeriod.py");
    //console.log(pyshell);
    setInterval(function request() {
      //console.log("Process!");
      pyshell.send(command);
    }, 2000);

    pyshell.on("message", function (output) {
      console.log(output);
      res.json({
        output: output,
      });
    });
  }

  if (stopPeriod === true) {
    pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
    });
  }
});

router.post("/:id/stream", (req, res) => {
  let i = 0;
  let options = {
    mode: "text",
    args: [15, 13],
  };
  let pyshell = new PythonShell(
    "./src/routers/translator/translatorPeriod.py",
    options
  );
  pyshell.on("message", function (data) {
    let jsonres = data;
    console.log(jsonres);
    console.log("Выход", jsonres);
    res.write(`id: ${i++}\n`);
    res.write(`event: post\n`);
    res.write(`data: ${jsonres}\n\n`);
    jsonres = {};
  });
});

export default {
  router,
};
