const { Router } = require("express");
const router = Router();
const pool = require("../database/db");
const { addToVisionBoard } = require("./queries");

router.post("/", async (req, res) => {
  const { img1, img2, img3 } = req.body;

  try {
    const parametersPresent = img1 && img2 && img3;
    if (!parametersPresent) {
      console.log("Not enough parameters in POST /goal route");
      res
        .status(400)
        .json({ message: "Not enough parameters in POST /goal route" });
    } else {
      emptyVisionBoardTable();
      const result = await pool.query(addToVisionBoard, [img1, img2, img3]);
      res.json({ message: "Successful" });
    }
  } catch (e) {
    console.log("Error in POST /goal route", e);
    res.status(400).json({ message: "Error in POST /goal route" });
  }
});

const emptyVisionBoardTable = async (req, res) => {
  const query = "DELETE FROM vision_board;";
  const result = await pool.query(query);
};

module.exports = router;
