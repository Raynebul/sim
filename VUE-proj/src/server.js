// Node.js utility
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import db from "./databases/database.js";
//import fsm from "./databases/fsm.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import constructor from "./routers/constructorRouter.js";
import trainer from "./routers/trainerRouter.js";
import trainers from "./routers/trainersRouter.js";
import createtrainercourse from "./routers/createtrainercourseRouter.js";
import trainercourse from "./routers/trainercourseRouter.js";
import user from "./routers/userRouter.js";
import upload from "./routers/uploadRouter.js";
import constructor_socket from "./routers/constructorSocket.js";
import { Server } from "socket.io";
import { PythonShell } from "python-shell";
import multer from "multer";

//var forms = multer();


// это нужно для токенов и паспортнов - для авторизации.
/*
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
*/

const port = 3000;

// Vite (создаём сервер на express, Vite - для сборки)
//import { createServer } from "vite";

// Express (Express сервер)
import express from "express";
import session from "express-session";
// Helpers
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // файл __dirname
const resolve = (p) => path.resolve(__dirname, p);

var SQLqueryCode = "select * from humans";
var SessionString;
var SessionState;
var SessionRed;

var Session = {
  username: undefined,
  email: undefined,
  password: undefined,
  id: undefined,
};

const app = express(); //Express - parent server
const router = express.Router();

app.use(
  session({
    // store: store,
    username: undefined,
    password: undefined,
    email: undefined,
    resave: false,
    saveUninitialized: true,
    SQLquery: "select * from humans",
    secret: "supersecret",
  })
);

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(forms.array()); 
/*
app.get("/", async (req, res) => {
  console.log(1);
  res.json({
    username: "SERGEY1",
  });
});
*/
//res.json(
/*
app.get("/", (req, res) => {
  res.json({
    id: Session.id,
  });
});

app.post("/", (req, res) => {
  console.log(req.headers["cookie"]);
  req.session.username = undefined;
  req.session.password = undefined;
  req.session.email = undefined;
  res.json({
    username: req.session.username,
  });
});
*/
app.use("/edit", constructor.router);

app.use("/run", trainer.router);

app.use("/trainers", trainers.router)

app.use("/user", user.router);

app.use("/upload", upload.router);

app.use("/trainercourse", trainercourse.router);

app.use("/createtrainercourse", createtrainercourse.router);

// Routes

//app.use("/", router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", constructor_socket.SocketConstructor);

/*
io.on("connection", (socket) => {
  socket.on("periodFunction", (arg) => {
    console.log("SOCKET periodFunction");
    let input = arg.input;
    //console.log("Входные данные: ", arg);
    let delay = arg.delay;
    let code = arg.code;
    let code1 =
      "while True:\n" +
      "  command = input()\n" +
      "  if command == 'None':\n" +
      "     index = index + 1\n" +
      "     print(index)\n" +
      "  if command == 'addFive':\n" +
      "     index = index + 5\n" +
      "     print(index)\n" +
      "  if command == 'addTen':\n" +
      "     index = index + 10\n" +
      "     print(index)\n" +
      "  if command == 'stop':\n" +
      "     break\n";
    let data = arg.input;
    let interval = "";
    let command = "None";
    let options = {
      args: [code1, input],
    };
    let pyshell = new PythonShell("./src/test.py", options);
    pyshell.on("message", function (message) {
      console.log(message);
      console.log("Ответ был написан!");
      socket.emit("commandFunction", message);
    });
  });
}); */

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

/*
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); */
//}

//start();
