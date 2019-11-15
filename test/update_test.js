const assert = require("assert");
const User = require("../models/user");

describe("Updating records", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ username: "Joe" });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].username === "Alex");
        done();
      });
  }

  it("instance set and save", done => {
    joe.set("username", "Alex");
    assertName(joe.save(), done);
  });

  it("instance updateOne", done => {
    assertName(joe.updateOne({ username: "Alex" }), done);
  });

  it("model class updateOne", done => {
    assertName(User.updateOne({ username: "Joe" }, { username: "Alex" }), done);
  });

  it("model class findOneAndUpdate", done => {
    assertName(
      User.findOneAndUpdate({ username: "Joe" }, { username: "Alex" }),
      done
    );
  });

  it("model class find one record with and id and update", done => {
    assertName(User.findOneAndUpdate(joe._id, { username: "Alex" }), done);
  });
});
