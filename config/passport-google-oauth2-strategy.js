const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
// const env = require("./enviorment");

// tell passport to use new strategy for google login
passport.use(
  new googleStrategy(
    {
      // clientID: `${env.google_client_ID}`,
      clientID: `${process.env.google_client_ID}`,
      // "606863490315-8aflrermm45btcfgmv6in1inlpqrgkf8.apps.googleusercontent.com",
      clientSecret: `${process.env.google_client_Secret}`,
      // clientSecret: `${env.google_client_Secret}`,
      // "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",
      callbackURL: `${process.env.google_callback_URL}`,
      callbackURL: `${process.env.google_callback_URL}`,
      // "http://localhost:8000/users/auth/google/callback",
    },

    // find user
    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user

          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              // password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
