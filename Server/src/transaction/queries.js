const getAllTransactions = "SELECT * FROM Transactions;";
const getTransactionsInRange =
  "SELECT * FROM Transactions WHERE date >= $1 AND date<=$2";

module.exports = {
  getAllTransactions,
  getTransactionsInRange,
};
