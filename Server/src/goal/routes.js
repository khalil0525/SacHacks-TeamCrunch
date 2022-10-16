const { Router } = require("express");
const router = Router();
const pool = require("../database/db");

router.post("/", async (req, res) => {
  res.send("Testing");
});

module.exports = router;
