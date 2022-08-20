const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ message: "hi" });
});

router.use("/words", require("./wordsRouter"));
router.use("/register", require("./uploadRouter"));
router.use("/quiz", require("./quizRouter"));
router.use("/oauth", require("./oauthRouter"));

module.exports = router;
