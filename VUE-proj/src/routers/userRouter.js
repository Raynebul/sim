import express from "express";
const router = express.Router();
import db from "../databases/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.js";

var Session = {
  username: undefined,
  email: undefined,
  password: undefined,
  id: undefined,
};

router.delete("/material", (req, res) => {
  console.log("DELETE trainer");
  let material = req.body.material;
  db.selectAllTrainers(function (error, trainers) {
    if (error) {
      console.log(1);
    } else {
      let trainer = trainers.find(
        (element) => element.IDtext === material.IDtext
      );
      if (trainer !== undefined) {
        db.deleteTrainerByIDtext(trainer.IDtext, function (error) {
          if (error) {
            console.log(error);
          }
        });
      }
    }
  });
});

router.get("/:id", (req, res) => {
  console.log("FOUNT IT");
  db.selectUserById(req.params.id, function (error, user) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        user: user,
      });
    }
  });
  /*
  db.selectProjectByAuthor(author, function (error, projects) {
    if (error) {
      res.status(500).end();
    } else if (projects) {
      res.json({
        projects: projects,
        username: Session.username,
        email: Session.email,
      });
    } else {
      res.status(404).end();
    }
  }); */
});

router.delete("/:id", (req, res) => {
  console.log("DELETE IT");
  //var author = Session.username;
  //var author = "Anton";
  db.deleteUser(req.params.id, function (error) {
    if (error) {
    } else {
      Session.email = undefined;
      Session.username = undefined;
      Session.password = undefined;
      Session.id = undefined;
    }
  });
});

router.put("/:id", (req, res) => {
  console.log("LOG OUT");
  //var author = Session.username;
  //  Session.email = undefined;
  // Session.username = undefined;
  // Session.password = undefined;
  // Session.id = undefined;
});

router.get("/", function (req, res) {
  db.selectAllTrainerCourses(function (error, trainercourses) {
    if (error) {
      console.log(error);
    } else {
      db.selectAllTrainers(function (error1, trainers) {
        //console.log(error, trainers)
        if (error1) {
          //console.log(error);
        } else {
          //console.log(trainers);
          let metadatas = [];
          trainers.forEach((trainer) => {
            metadatas.push(JSON.parse(trainer.metadata));
          });
          res.json({
            trainercourses: trainercourses,
            metadatas: metadatas,
          });
        }
      });
    }
  });

  /* res.json({
    username: Session.username,
    email: Session.email,
    id: Session.id,
  }); */
});

//POST РЕАЛИЗОВАНО
// Регистрация нового пользователя;
router.post("/", function (req, res) {
  // var foundUser;
  // поиск пользователся в базе данных;
  //var _row;
  //var sql = "select * from users";
  var login = req.body.login;
  console.log(login);
  var password = req.body.password;
  //console.log(req.headers["cookie"]);
  // если мы используем почту
  if (login.indexOf("@") != -1) {
    db.selectUserByEmail(login, password, function (error, user) {
      if (error) {
        console.log(1);
        res.json({
          error: true,
        });
      } else if (user) {
        //user.settings = JSON.parse(user.settings);
        console.log("Этап создание токена для входа пользователя в систему!");
        let passwordIsValid = bcrypt.compare(password, user.password);
        console.log(password, user.password);
        if (!passwordIsValid) {
          console.log("Проблема с паролем");
          return res.status(401).send({ auth: false, token: null });
        }
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "120s", // expires in 24 hours
        });
        res.json({
          auth: true,
          user: user,
          token: token,
          error: false,
        });
      } else {
        res.status(404).end();
      }
    });
  }
  // если мы используем никнейм
  else {
    db.selectUserByLogin(login, password, function (error, user) {
      if (error) {
        console.log(2);
        res.json({
          error: true,
        });
      } else if (user) {
        //user.settings = JSON.parse(user.settings);
        console.log("Этап создание токена для входа пользователя в систему!");
        let passwordIsValid = bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
          console.log("Проблема с паролем");
          return res.status(401).send({ auth: false, token: null });
        }
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "120s", // expires in 24 hours
        });
        res.json({
          auth: true,
          user: user,
          token: token,
          error: false,
        });
      } else {
        res.status(404).end();
      }
    });
  }
});

// Обновление настроек пользователя;
router.put("/", function (req, res) {
  let user = req.body.user;
  //user.settings = JSON.stringify(user.settings)
  db.changeMainSettingsOfUser(user, function (error, new_user) {
    console.log(new_user);
    if (error) {
      console.log(error);
    } else {
      //console.log(new_user)
      console.log("Этап создание токена для входа пользователя в систему!");
      console.log(user.password, new_user.password);
      let passwordIsValid = bcrypt.compare(user.password, new_user.password);
      if (!passwordIsValid) {
        console.log("Проблема с паролем");
        return res.status(401).send({ auth: false, token: null });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "120s", // expires in 24 hours
        // 86400
      });
      console.log("Все норм");
      res.json({
        auth: true,
        token: token,
        user: new_user,
        error: false,
      });
    }
  });
});

router.delete("/", function (req, res) {});

export default {
  router,
};
