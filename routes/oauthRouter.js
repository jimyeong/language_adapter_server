const router = require("express").Router();
// const passport = require("../passport");
const authenticator = require("../middlewares/authenticate");
const { authenticate, checkSessionExist } = authenticator;
const Users = require("../models/users");
const logger = require("../logger/logger");

router.post("/user", checkSessionExist, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.session.userId } });
    if (user) return res.status(200).json(user);
  } catch (error) {
    // error가 발생하는 케이스들이 더 있나?
    logger.error(error.message);
    return res.status(500).json({
      message: "enquire administrator",
      action: "ALARM",
      statusCode: "500",
      errorCode: "SYSYEM_01",
    });
  }
});

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
