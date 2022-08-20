const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1079878285444-g7ga6mkumcv5qmr6bil3tp8h3kqtnhf5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(["user_profile"], profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

module.exports = passport;
