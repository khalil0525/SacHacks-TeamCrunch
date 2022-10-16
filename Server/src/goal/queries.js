const addToVisionBoard =
  "INSERT INTO vision_board (uid,img_link) VALUES(1,$1), (1, $2),(1, $3)";

module.exports = {
  addToVisionBoard,
};
