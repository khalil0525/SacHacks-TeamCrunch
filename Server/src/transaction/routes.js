const { Router } = require("express");
const router = Router();
const pool = require("../database/db");
const { getAllTransactions } = require("./queries");

router.get("/", async (req, res) => {
  let query = await pool.query(getAllTransactions);
  let result = query.rows;

  res.json(result);
});

module.exports = router;
