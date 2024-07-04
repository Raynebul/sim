import express from "express";
const router = express.Router();
import db from "../databases/database.js";

router.get("/", (req, res) => {
  res.json({
    test: true,
  });
});

export default {
  router,
};
