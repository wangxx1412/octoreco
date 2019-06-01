const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors');
const index = require("./app_server/routes/index");
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
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/api", apiRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);