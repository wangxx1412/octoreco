const assert = require("assert");
const User = require("../models/user");
const Post = require("../models/post");

describe("Reading users out of database", function() {
  let joe, peter, adam, cindy;

  beforeEach(function(done) {
    adam = new User({ username: "Adam" });
    peter = new User({ username: "Peter" });
    joe = new User({ username: "Joe" });
    cindy = new User({ username: "Cindy" });
    Promise.all([adam.save(), cindy.save(), joe.save(), peter.save()]).then(
      () => done()
    );
  });

  it("finds all users with a username of joe", done => {
    User.find({ username: "Joe" }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("finds a user with a particular id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.username === "Joe");
      done();
    });
  });

  it("can skip and limit the result set", done => {
    User.find({})
      .sort({ username: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].username === "Cindy");
        assert(users[1].username === "Joe");
        done();
      });
  });
});

describe("Reading posts out of database", function() {
  let apple, pear, banana;
  beforeEach(function(done) {
    apple = new Post({ content: "Apple" });
    pear = new Post({ content: "Pear" });
    banana = new Post({ content: "Banana" });

    Promise.all([apple.save(), pear.save(), banana.save()]).then(() => done());
  });

  it("finds all posts with a content of pear", done => {
    Post.find({ content: "Pear" }).then(posts => {
      assert(posts[0]._id.toString() === pear._id.toString());
      done();
    });
  });

  it("finds a post with a particular id", done => {
    Post.findOne({ _id: pear._id }).then(post => {
      assert(post.content === "Pear");
      done();
    });
  });

  it("can skip and limit the result set", done => {
    Post.find({})
      .sort({ content: 1 })
      .skip(1)
      .limit(2)
      .then(posts => {
        assert(posts.length === 2);
        assert(posts[0].content === "Banana");
        assert(posts[1].content === "Pear");
        done();
      });
  });
});
