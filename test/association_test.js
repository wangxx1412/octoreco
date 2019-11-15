const assert = require("assert");
const User = require("../models/user");
const Post = require("../models/post");

describe("Associations Test", () => {
  let joe, cindy, post, fancypost;
  beforeEach(done => {
    joe = new User({ username: "Joe" });
    cindy = new User({ username: "Cindy" });
    post = new Post({ content: "123x" });
    fancypost = new Post({ content: "U likey" });

    joe.posts.push(post);
    joe.savedPosts.push(fancypost);
    post.likes.push(cindy);

    Promise.all([joe.save(), post.save(), cindy.save(), fancypost.save()]).then(
      () => done()
    );
  });

  it("saves a relation between a user and a post", done => {
    User.findOne({ username: "Joe" })
      .populate("posts")
      .then(user => {
        assert(user.posts[0].content === "123x");
        done();
      });
  });

  it("saves a relation between a user and a savedPost", done => {
    User.findOne({ username: "Joe" })
      .populate("savedPosts")
      .then(user => {
        assert(user.savedPosts[0].content === "U likey");
        done();
      });
  });

  it("saves a relation between a post and user through likes", done => {
    Post.findOne({ content: "123x" })
      .populate("likes")
      .then(post => {
        assert(post.likes[0].username === "Cindy");
        done();
      });
  });

  it("saves a full relation tree", done => {
    User.findOne({ username: "Joe" })
      .populate({
        path: "posts",
        populate: {
          path: "likes",
          model: "user"
        }
      })
      .populate("savedPosts")
      .then(user => {
        assert(user.username === "Joe");
        assert(user.posts[0].content === "123x");
        assert(user.savedPosts[0].content === "U likey");
        assert(user.posts[0].likes[0].username === "Cindy");
        done();
      });
  });
});
