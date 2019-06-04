const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = require('../../var_config');
const User = require('../../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
          const existingUser = await User.findOne({ "google.id": profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const user = await new User({
            method:'google',
            google: {
              id: profile.id,
              email: profile.emails[0].value
          },
          username:profile.displayName
        }).save();
          done(null, user);    
      }
    )
  );
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        proxy: true,
        profileFields: ['id', 'emails', "name"]
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          method:'facebook',
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
        },
          username: profile.name.givenName
      }).save();
        done(null, user);   
      }
    )
  );