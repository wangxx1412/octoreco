const assert = require("assert");
const User = require("../models/user");
const Post = require("../models/post");

describe("Deleting a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ username: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("model instance delete", done => {
    joe
      .delete()
      .then(() => User.findOne({ username: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method delete", done => {
    User.deleteOne({ username: "Joe" })
      .then(() => User.findOne({ username: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findOneAndDelete", done => {
    User.findOneAndDelete({ username: "Joe" })
      .then(() => User.findOne({ username: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findByIdAndDelete", done => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({ username: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});

describe("Deleting a Post", () => {
  let apple;

  beforeEach(function(done) {
    apple = new Post({ content: "Apple" });
    apple.save().then(() => {
      done();
    });
  });

  it("model instance delete", done => {
    apple
      .delete()
      .then(() => Post.findOne({ content: "Apple" }))
      .then(post => {
        assert(post === null);
        done();
      });
  });

  it("class method deleteOne", done => {
    Post.deleteOne({ content: "Apple" })
      .then(() => Post.findOne({ content: "Apple" }))
      .then(post => {
        assert(post === null);
        done();
      });
  });

  it("class method findOneAndDelete", done => {
    Post.findOneAndDelete({ content: "Apple" })
      .then(() => Post.findOne({ content: "Apple" }))
      .then(post => {
        assert(post === null);
        done();
      });
  });

  it("class method findByIdAndDelete", done => {
    Post.findByIdAndDelete(apple._id)
      .then(() => Post.findOne({ content: "Apple" }))
      .then(post => {
        assert(post === null);
        done();
      });
  });
});
