const googleCredentialDecoder = require("../helper/googleCredentialDecoder");
const logger = require("../logger/logger");
const authenticator = {
  checkSessionExist: async (req, res, next) => {
    let status;
    if (req.session.userId) {
      return next();
    }
    status = 401;
    const message = "session expired";
    // res.status(status).json({
    //   message,
    //   statusCode: status,
    // });
    const error = new Error();
    error.message = message;
    error.status = status;

    logger.error(error);
    return next(error);
  },
  authenticate: async (req, res, next) => {
    const credentialToken = req.body.credential;
    let result;
    try {
      const { payload, userId, email } = await googleCredentialDecoder(
        credentialToken
      );
      console.log("googleCred@@", payload);
      console.log("googleCred@@@", userId);
      req.session.userId = payload.email;
      req.user = { ...payload };
      // 세션 저장
      req.session.userId = payload.email;

      return next();
    } catch (error) {
      return next(new Error(error));
    }
  },
};

module.exports = authenticator;
