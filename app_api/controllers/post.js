const Post = require("../../models/post");
const User = require("../../models/user");
const AWS = require("aws-sdk");

//***********Create a post***********/
const postCreateOne = async (req, res) => {
  const { content, imageUrl } = req.body;
  const userid = req.user._id;
  await Post.create(
    {
      content: content,
      imageUrl: imageUrl,
    },
    async (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        await User.findById(userid).exec((err, user) => {
          if (err) {
            res.status(400).json(err);
          } else {
            post.user = userid;
            user.posts.push(post);
            user.save((err, user) => {
              if (err) {
                res.status(400).json(err);
              } else {
                post.save((err, post) => {
                  if (err) {
                    res.status(400).json(err);
                  } else {
                    res.status(201).json({ message: "Post created" });
                  }
                });
              }
            });
          }
        });
      }
    }
  );
};

//**********Delet one post by id***********/
const postDeleteOne = async (req, res) => {
  const postid = req.body.postId;
  const loggedUserId = req.user._id; // the current auth user
  const userId = req.body.userId; // author of the post
  const imageUrls = req.body.imageUrl;

  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  //Check Auth User is the Poster, Id type are diffrent
  if (loggedUserId == userId) {
    if (postid) {
      await Post.findOneAndRemove({ _id: postid }).exec(async (err, post) => {
        if (err) {
          return res.status(404).json(err);
        }
        await User.findById(userId)
          .select("posts")
          .exec((err, user) => {
            if (err) {
              res.status(400).json(err);
            } else {
              user.posts.pull(post);
              user.save(async (err, user) => {
                if (err) {
                  res.status(400).json(err);
                } else {
                  await Promise.all(
                    imageUrls.map(async (imageUrl) => {
                      const key = `${imageUrl}`;
                      const params = {
                        Bucket: "octoreco-bucket-1",
                        Key: key,
                      };
                      await s3.deleteObject(params, (err, data) => {
                        if (err) console.log(err, err.stack);
                        else console.log(data);
                      });
                    })
                  ).then(
                    res
                      .status(201)
                      .json({ message: "Post removed successfully" })
                  );
                }
              });
            }
          });
      });
    } else {
      res.status(404).json({
        message: "No post found",
      });
    }
  } else {
    res.status(400).json({
      message: "User Not Authorized",
    });
  }
};

//********Get One post by id***********/
const postReadOne = async (req, res) => {
  const { postid } = req.params;
  await Post.findById(postid)
    .populate("user", "_id, username")
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    .exec((err, post) => {
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      } else if (err) {
        return res.status(404).json({ error: err });
      }
      res.status(200).json(post);
    });
};

//*********Get all posts with pagination***********/
const getPosts = async (req, res) => {
  // get current page from req.query or use default value of 1
  const currentPage = req.query.page || 1;
  const perPage = 20;
  let totalItems;

  const posts = await Post.find()
    // countDocuments() gives you total count of posts
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return (
        Post.find()
          .skip((currentPage - 1) * perPage)
          // .populate("comments", "content author")
          // .populate("comments.author", "_id username")
          .populate("user", "_id username")
          .select("_id imageUrl comments content created likes")
          .limit(perPage)
          .sort({ created: -1 })
      );
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => console.log(err));
};

//******** Get all posts from a certain user***********/
const postsByUser = (req, res) => {
  const { userid } = req.params;
  Post.find({ user: userid })
    .populate("user", "_id username")
    .sort({ created: -1 })
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.status(200).json(posts);
    });
};

module.exports = {
  postCreateOne,
  postDeleteOne,
  postReadOne,
  getPosts,
  postsByUser,
};
