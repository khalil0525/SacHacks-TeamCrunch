const { Router } = require("express");
const router = Router();
const pool = require("../database/db");
const { addToVisionBoard, addToCommitmentTable } = require("./queries");

router.post("/", async (req, res) => {
  const { img1, img2, img3, duration, amount } = req.body;

  try {
    const parametersPresent = img1 && img2 && img3 && duration && amount;
    if (!parametersPresent) {
      console.log("Not enough parameters in POST /goal route");
      res
        .status(400)
        .json({ message: "Not enough parameters in POST /goal route" });
    } else {
      await emptyVisionBoardTable();
      const result = await pool.query(addToVisionBoard, [img1, img2, img3]);
      const resultCommitment = await pool.query(addToCommitmentTable, [
        parseInt(duration),
        parseInt(amount),
      ]);
      res.json({ message: "Successful" });
    }
  } catch (e) {
    console.log("Error in POST /goal route", e);
    res.status(400).json({ message: "Error in POST /goal route" });
  }
});

router.get("/", async (req, res) => {
  res.send("Here");
});

const emptyVisionBoardTable = async (req, res) => {
  const query = "DELETE FROM vision_board;";
  const result = await pool.query(query);
};

module.exports = router;
