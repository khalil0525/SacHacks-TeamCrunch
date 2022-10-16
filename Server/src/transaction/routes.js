const { Router } = require("express");
const router = Router();
const pool = require("../database/db");
const { getAllTransactions, getTransactionsInRange } = require("./queries");

router.get("/", async (req, res) => {
  try {
    const aggregate = req.query.aggregate;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (startDate && endDate) {
      const { rows } = await pool.query(getTransactionsInRange, [
        startDate,
        endDate,
      ]);
      const aggregatedTransactions = aggregateData(rows);
      const sorted = aggregatedTransactions.sort(sortDescending);
      res.json(sorted);
    } else if (aggregate) {
      const { rows } = await pool.query(getAllTransactions);
      const aggregatedTransactions = aggregateData(rows);
      const sorted = aggregatedTransactions.sort(sortDescending);
      return sorted;
    } else {
      const { rows } = await pool.query(getAllTransactions);
      res.json(rows);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("error");
  }
});

function sortDescending(a, b) {
  return b.amount - a.amount;
}

function aggregateData(transactions) {
  let singles = [];

  transactions.map((transaction) => {
    const found = singles.findIndex((element) => {
      return element.merchant_name === transaction.merchant_name;
    });
    if (found === -1) {
      console.log(transaction.merchant_name);
      singles.push(transaction);
    } else {
      singles[found].amount = singles[found].amount + transaction.amount;
    }
  });

  return singles;
}

module.exports = router;
