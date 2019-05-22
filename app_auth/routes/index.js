const express = require('express');
const router = express.Router();

const passportService = require('../services/passport');
const passport = require('passport');

router.get('/auth', (req,res)=>{
    res.send('Auth here')
});

router.get(
    "/auth/google",
    passport.authenticate("google", { 
      scope: ["profile", "email"]
    })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req,res) => {
      res.redirect('/posts');
    }
);

router.get(
    '/auth/facebook',
    passport.authenticate("facebook", {
        session: false,
        scope: "email"
    })
);

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: '/' }),
    (req,res) => {
      res.redirect('/posts');
    }
);

module.exports = router;