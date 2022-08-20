const router = require("express").Router();
// const passport = require("../passport");
const authenticator = require("../middlewares/authenticate");
const { authenticate } = authenticator;
const Users = require("../models/users");

router.post("/google/oauth", authenticate, async (req, res) => {
  Users.findOne({ where: { email: req.user.email } })
    .then(async (user) => {
      if (user) {
        return res.status(200).json(user);
      } // 이미 있는 경우 사용자 아이디가
      const newUser = {
        snsId: req.user.userId,
        email: req.user.email,
        name: req.user.name,
        avartar: req.user.picture,
      };
      try {
        const a = await Users.create(newUser);
        return res.status(200).json(a);
      } catch (error) {
        throw new Error(error);
      }
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json(err);
    });
});

module.exports = router;
