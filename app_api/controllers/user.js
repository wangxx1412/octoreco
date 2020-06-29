const User = require("../../models/user");
const Post = require("../../models/post");
const AWS = require("aws-sdk");

//********** Delete a User account, including User model document
//********** and user's posts then logout
//********* comments not deleted showing the user displayed as 'not exist' */
const deleteUser = (req, res) => {
  const { userId } = req.body;
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  User.findOneAndRemove({ _id: userId }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      Post.deleteMany({ user: userId }).exec(async (err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          async function emptyS3Directory(bucket, dir) {
            const listParams = {
              Bucket: bucket,
              Prefix: dir,
            };

            const listedObjects = await s3.listObjectsV2(listParams).promise();

            if (listedObjects.Contents.length === 0) return;

            const deleteParams = {
              Bucket: bucket,
              Delete: { Objects: [] },
            };

            listedObjects.Contents.forEach(({ Key }) => {
              deleteParams.Delete.Objects.push({ Key });
            });

            await s3.deleteObjects(deleteParams).promise();

            if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
          }

          await emptyS3Directory("octoreco-bucket-1", `${userId}/`).then(
            res.json({ message: "User has been removed" })
          );
        }
      });
    }
  });
};

//Change username
const changeUserName = (req, res) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { username: req.body.newUserName },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
};

// follow unfollow
const addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { following: req.body.followId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

const addFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id username")
    .populate("followers", "_id username")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

// remove follow unfollow
const removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $pull: { following: req.body.unfollowId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

const removeFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id username")
    .populate("followers", "_id username")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

module.exports = {
  changeUserName,
  deleteUser,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
};
