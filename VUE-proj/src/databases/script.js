import db from "./database.js";
import trainers from "../components/data/trainers.json" with { type: "json" };

//console.log(trainers[0])

db.script(trainers, function (script_load) {
    if (script_load) {
      console.log(script_load)
    } else {
      console.log(1)
    }
  });