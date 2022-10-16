const { Router } = require("express");
const router = Router();
const pool = require("../database/db");
const { addToVisionBoard } = require("./queries");

router.post("/", async (req, res) => {
  const { img1, img2, img3 } = req.body;

  const parametersPresent = img1 && img2 && img3;
  if (!parametersPresent) {
    console.log("Not enough parameters in POST /goal route");
    res.status(400).send("Not enough parameters in POST /goal route");
  } else {
    const result = await pool.query(addToVisionBoard, [img1, img2, img3]);
    res.json({ message: "Successful" });
  }
});

module.exports = router;
