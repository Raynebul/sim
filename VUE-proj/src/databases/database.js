//var sqlite3 = require("sqlite3").verbose();
// var md5 = require("md5");
//import sqlite3 from "sqlite3";
//sqlite3.verbose();
//Import sqlite3 from "sqlite3"
//Import sqlite3 from "sqlite3"
//Import md5 from "md5"
import sqlite3 from "sqlite3";
sqlite3.verbose();

const DBSOURCE = "./src/databases/database.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run("PRAGMA foreign_keys = ON");
    //db.run("DROP TABLE IF EXISTS users")
    // Создание базы данных trainers
    db.run(
      `CREATE TABLE trainers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    IDtext text,
                    name text,
                    dataUI json,
                    code json
                    )`,
      /*            inputs integer,
                    outputs integer,
                    functions integer, */
      (err) => {
        if (err) {
          // Table already created
          console.log("no Created table test");
        } else {
          // Table just created, creating some rows
          console.log("Created trainers table");
        }
      }
    );
    //db.run("DROP TABLE IF EXISTS trainercourses");
    // Создание курсов по тренажёрам:
    //  db.run("DROP TABLE IF EXISTS trainercourses");
    db.run(
      `CREATE TABLE trainercourses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name text,
                    author text,
                    IDtext text,
                    description text,
                    number_of_tasks integer,
                    difficulty text,
                    course json
                    )`,
      (err) => {
        if (err) {
          // Table already created
          console.log("no Created table test");
        } else {
          // Table just created, creating some rows
          console.log("Created trainers table");
        }
      }
    );
    //db.run("DELETE FROM trainers WHERE IDtext = 'test';");
  }
  /*
  db.run("ALTER TABLE trainers DROP COLUMN metadata", function (error) {
    console.log(error);
  });*/
  //db.run("DROP TABLE IF EXISTS users")
  /*
  var sql = `
  DELETE FROM 
  trainers 
  WHERE 
  IDtext = ?;`;
  db.run(sql, "test_test", function (error) {
    console.log(error)
    //callback(error);
  }); */
});

// Функции создания тренажера

function addTrainer(IDtext, name, data, callback) {
  console.log(1);
  var sql =
    "INSERT INTO trainers (IDtext, name, dataUI, code) VALUES (?,?,?,?)";
  let dataUI = {
    author: data.author,
    created: data.date,
  };
  //dataUI = JSON.stringify(dataUI);
  var params = [IDtext, name, "", ""];
  console.log("row is added");
  db.run(sql, params, function (error) {
    callback(error);
  });
}

function addDataToTrainer(IDtext, UI, code, callback) {
  var sql = `
    UPDATE trainers SET 
       dataUI=?,
       code=?
    WHERE 
       IDtext=?`;
  var params = [UI, code, IDtext];
  db.run(sql, params, function (error) {
    callback(error);
  });
}

function selectTrainerByIDtext(IDtext, callback) {
  var sql = `
  SELECT
   * FROM trainers 
  WHERE 
  IDtext = ?
  `;
  var params = [IDtext];
  db.get(sql, params, function (error, trainer) {
    callback(error, trainer);
  });
}

function deleteTrainerByIDtext(IDtext, callback) {
  var sql = `
  DELETE FROM 
  trainers 
  WHERE 
  IDtext = ?;`;
  db.run(sql, IDtext, function (error) {
    callback(error);
  });
}

function selectAllTrainers(callback) {
  var sql = `
  SELECT * FROM
  trainers
  `;
  db.all(sql, [], function (error, trainers) {
    callback(error, trainers);
  });
}

function script(trainers, callback) {
  var sql = `
  SELECT * FROM
  trainers
  `;
  db.all(sql, [], function (error, trainers_db) {
    console.log(trainers.length, trainers_db.length)
    if (trainers_db.length === 0) {
      let trainers_ = trainers;
      for (let i = 0; i < trainers.length; i++) {
        trainers_[i].dataUI = JSON.stringify(trainers_[i].dataUI);
        trainers_[i].code = JSON.stringify(trainers_[i].code);
      }
      let insert =
        "INSERT INTO trainers (IDtext, name, dataUI, code) VALUES (?,?,?,?)";
      for (let i = 0; i < trainers_.length; i++) {
        db.run(insert, [
          trainers_[i].IDtext,
          trainers_[i].name,
          trainers_[i].dataUI,
          trainers_[i].code,
        ]);
      }
      callback(true);
    } else {
      callback(false);
    }
  });
}

// Функции создания тренажера

// База данных user
function addUser(user, callback) {
  var settings = {
    trainercourses: [],
  };
  settings = JSON.stringify(settings);
  var sql = `INSERT INTO users (username, email, password, active, status, first_name, last_name, patronymic, telephone, settings) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  var params = [
    user.username,
    user.email,
    user.password,
    "false",
    user.status,
    user.first_name,
    user.last_name,
    user.patronymic,
    user.telephone,
    settings,
  ];
  db.run(sql, params, function (error) {
    callback(error);
  });
}

function selectUserById(id, callback) {
  var sql = `
  SELECT *
  FROM users
  WHERE id=?`;
  var params = [id];
  db.get(sql, params, function (error, user) {
    callback(error, user);
  });
}

function deleteUser(id, callback) {
  var sql = `
  DELETE FROM 
  users 
  WHERE 
  id = ?;`;
  db.run(sql, id, function (error) {
    callback(error);
  });
}

function selectUserByLogin(login, password, callback) {
  var sql = `
  SELECT *
  FROM users
  WHERE username=? and password=?`;
  var params = [login, password];
  db.get(sql, params, function (error, user) {
    callback(error, user);
  });
}

function selectUserByEmail(email, password, callback) {
  var sql = `
  SELECT *
  FROM users
  WHERE email=? and password=?`;
  var params = [email, password];
  db.get(sql, params, function (error, user) {
    callback(error, user);
  });
}

function selectAllUsers(callback) {
  var sql = `
  SELECT *
  FROM users
`;
  db.all(sql, [], function (error, users) {
    callback(error, users);
  });
}

function activateUser(user, callback) {
  var params;
  var sql = `
      UPDATE users SET 
         active=? 
      WHERE 
         id=?`;
  if (user.active == "false") {
    params = ["true", user.id];
  } else {
    params = ["false", user.id];
  }
  db.run(sql, params, function (error) {
    callback(error);
  });
}

function changePassword(user, password, callback) {
  var params;
  var sql = `
      UPDATE users SET 
         password=? 
      WHERE 
         id=?`;
  let sql2 = `SELECT * FROM users WHERE id=?`;
  let params2 = [user.id];
  params = [password, user.id];
  db.run(sql, params, function (error) {
    db.get(sql2, params2, function (error2, user) {
      callback(error2, user);
    });
  });
}

function changeMainSettingsOfUser(user, callback) {
  var params;
  var params2;
  user.settings = JSON.stringify(user.settings);
  var sql = `
      UPDATE users SET 
         email=?,
         status=?,
         first_name=?,
         last_name=?,
         patronymic=?,
         telephone=?,
         settings=?
      WHERE 
         id=?`;
  let sql2 = `SELECT * FROM users WHERE id=?`;
  params = [
    user.email,
    user.status,
    user.first_name,
    user.last_name,
    user.patronymic,
    user.telephone,
    user.settings,
    user.id,
  ];
  params2 = [user.id];
  db.run(sql, params, function (error) {
    db.get(sql2, params2, function (error2, new_user) {
      callback(error2, new_user);
    });
    //callback(error, new_user);
  });
}

/* курсы и функции с ними*/

function addCourseForUser(user, trainercourse, callback) {
  //console.log(user.settings)
  /* 
  if (
    user.settings["trainercourses"] != undefined &&
    user.settings["trainercourses"] != null
  ) {
    user.settings = {
      trainercourses: [],
    };
    console.log("Во!");
  }
  */

  //user.settings = JSON.parse(user.settings);

  console.log(user.settings);
  user.settings["trainercourses"].push(trainercourse);
  user.settings = JSON.stringify(user.settings);
  //var one = 1
  var sql = `
    UPDATE users SET 
       settings=?
    WHERE 
       id=?`;
  var params = [user.settings, user.id];
  db.run(sql, params, function (error) {
    selectUserById(user.id, function (error1, new_user) {
      callback(error, new_user);
    });
  });
}
function UpdateProgressForUser(user, trainercourse, callback) {
  console.log(user.settings);
  let index = user.settings.trainercourses.findIndex(
    (object) => object.id == trainercourse.id
  );
  user.settings.trainercourses[index] = trainercourse;
  user.settings = JSON.stringify(user.settings);
  //var one = 1
  var sql = `
    UPDATE users SET 
       settings=?
    WHERE 
       id=?`;
  var params = [user.settings, user.id];
  db.run(sql, params, function (error) {
    selectUserById(user.id, function (error1, new_user) {
      callback(error, new_user);
    });
  });
}

/* курсы и функции с ними*/

// База данных user

// База данных trainercourse

function selectTrainerCourseById(id, callback) {
  var sql = `
  SELECT *
  FROM trainercourses
  WHERE id=?`;
  var params = [id];
  db.get(sql, params, function (error, user) {
    callback(error, user);
  });
}

function addTrainerCourse(trainercourse, course, callback) {
  var sql = `INSERT INTO trainercourses (name, author, IDtext, description, number_of_tasks, difficulty, course) VALUES (?,?,?,?,?,?,?)`;
  var params = [
    trainercourse.name,
    trainercourse.author,
    trainercourse.IDtext,
    trainercourse.description,
    trainercourse.number_of_tasks,
    trainercourse.difficulty,
    course,
  ];
  db.run(sql, params, function (error) {
    callback(error);
  });
}

function updateTrainerCourse(id, trainercourse, course, callback) {
  var params;
  //var params2;
  var sql = `
      UPDATE trainercourses SET 
         name=?,
         description=?,
         IDtext=?,
         number_of_tasks=?,
         difficulty=?,
         course=?
      WHERE 
         id=?`;
  //let sql2 = `SELECT * FROM trainercourses WHERE id=?`;
  params = [
    trainercourse.name,
    trainercourse.description,
    trainercourse.IDtext,
    trainercourse.number_of_tasks,
    trainercourse.difficulty,
    course,
    id,
  ];
  db.run(sql, params, function (error) {
    callback(error);
    //callback(error, new_user);
  });
}

function selectAllTrainerCourses(callback) {
  var sql = `
  SELECT *
  FROM trainercourses
`;
  db.all(sql, [], function (error, trainercourses) {
    callback(error, trainercourses);
  });
}

function deleteTrainerCourse(id, callback) {
  var sql = `
  DELETE FROM 
  trainercourses 
  WHERE 
  id = ?;`;
  let params = [id];
  db.run(sql, params, function (error) {
    callback(error);
  });
}

// База данных trainercourse

export default {
  db,
  addUser,
  deleteUser,
  selectUserByLogin,
  selectUserByEmail,
  addTrainer,
  selectTrainerByIDtext,
  addDataToTrainer,
  selectAllUsers,
  activateUser,
  selectUserById,
  deleteTrainerByIDtext,
  changePassword,
  changeMainSettingsOfUser,
  selectAllTrainers,
  selectTrainerCourseById,
  addTrainerCourse,
  updateTrainerCourse,
  selectAllTrainerCourses,
  addCourseForUser,
  UpdateProgressForUser,
  deleteTrainerCourse,
  script,
};
