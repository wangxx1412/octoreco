const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["google", "facebook"]
  },
  google: {
    id: String,
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: String,
    email: {
      type: String,
      lowercase: true
    }
  },
  username: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post"
    }
  ],
  following: [{ type: Schema.Types.ObjectId, ref: "user" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post"
    }
  ]
});

userSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

//middleware call next
userSchema.pre("remove", function(next) {
  const Post = mongoose.model("post");
  //this === joe
  Post.remove({ _id: { $in: this.posts } }).then(() => next());
});

const User = mongoose.model("user", userSchema);

module.exports = User;
