const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost/octoreco_test", {
    useNewUrlParser: true
  });
  mongoose.connection
    .once("open", () => {
      console.log("Connected To Test DB");
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  const { users, posts } = mongoose.connection.collections;
  users.drop(() => {
    posts.drop(() => {
      done();
    });
  });
});
