require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const apiRoutes = require("./app_api/routes/index");
const authRoutes = require("./app_auth/routes/index");
const cookieSession = require('cookie-session');
const app = express();

require("./models/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);
app.use("/", authRoutes);

if (process.env.NODE_ENV === 'production'){
  //Express will serve up production assets like main.js main.css
  app.use(express.static('client/build'));
  //Express will serve up index.html if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);