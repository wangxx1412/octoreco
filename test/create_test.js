const assert = require("assert");
var expect = require("chai").expect;
const User = require("../models/user");
const Post = require("../models/post");

describe("Creating correct records", () => {
  it("saves a user", done => {
    const joe = new User({ username: "Joe" });

    joe.save().then(() => {
      assert(!joe.isNew);
      expect(joe).to.be.a("object");
      expect(joe).to.have.property("username", "Joe");
      expect(joe).to.have.property("posts");
      expect(joe).to.have.property("savedPosts");
      done();
    });
  });

  it("saves a post", done => {
    const NewPost = new Post({ content: "New post" });

    NewPost.save().then(() => {
      assert(!NewPost.isNew);
      expect(NewPost).to.be.a("object");
      expect(NewPost).to.be.a("object");
      expect(NewPost).to.have.property("content", "New post");
      expect(NewPost).to.have.property("likes");
      expect(NewPost).to.have.property("user");
      expect(NewPost).to.have.property("comments");
      expect(NewPost).to.have.property("imageUrl");
      done();
    });
  });
});
