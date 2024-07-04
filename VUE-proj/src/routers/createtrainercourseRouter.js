import express from "express";
import fs from "fs";
const router = express.Router();
import db from "../databases/database.js";

router.get("/", (req, res) => {
  db.selectAllTrainers(function (error, trainers) {
    //console.log(error, trainers)
    if (error) {
      //console.log(error);
    } else {
      //console.log(trainers);
      res.json({
        trainers: trainers,
      });
    }
  });
});

router.get("/:id", (req, res) => {
  let course = "";
  db.selectTrainerCourseById(req.params.id, function (error, trainercourse) {
    if (error) {
      console.log(error);
    } else {
      //console.log("Курс: ", trainercourse.tasks);
      course = JSON.parse(trainercourse.course);
      res.json({
        trainercourse: trainercourse,
        course: course,
      });
    }
  });
  /*
  db.selectAllTrainers(function (error, trainers) {
    //console.log(error, trainers)
    if (error) {
      //console.log(error);
    } else {
      //console.log(trainers);
      res.json({
        trainers: trainers,
      });
    }
  }); */
});

router.post("/", (req, res) => {
  var course = JSON.stringify(req.body.trainercourse.course);
  console.log(req.body.trainercourse);

  db.addTrainerCourse(req.body.trainercourse, course, function (error) {
    if (error) {
      console.log(error);
    }
  });
});

router.put("/:id", (req, res) => {
  var course = JSON.stringify(req.body.trainercourse.course);
  console.log(req.body.trainercourse)
  db.updateTrainerCourse(
    req.params.id,
    req.body.trainercourse,
    course,
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  let id = req.params.id
  db.deleteTrainerCourse(id, function(error) {
    if (error) {
      console.log(error);
    }
  })
})

export default {
  router,
};
