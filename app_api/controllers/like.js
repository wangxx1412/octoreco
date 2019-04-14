const Post = require('../../models/post');
const User = require('../../models/user');

const likePost = (req, res) => {
    const { like } = req.params;
    const { postid } = req.params;
    const userid = req.user._id;

    if (postid) {
        Post.findById(postid)
        .select("likes")
        .exec((err, post) => {
            if (err) {
                res.status(400).json(err);
            } else {
                User.findById(userid)
                .exec((err, user) => {
                    if(err) {
                        res.status(400).json(err);
                    } else {
                        if(like === "yes") {
                            post.likes.push(user);
                            post.save((err, post) => {
                                if (err) {
                                    res.status(400).json(err);
                                } else {
                                    res.status(201).json({message: "Like"});
                                }
                            });
                        } else if(like === "cancel") {
                            post.likes.pull(user);
                            post.save((err, post) => {
                                if(err) {
                                    res.status(400).json(err);
                                } else {
                                    res.status(201).json({message: "Unlike"});
                                }
                            });
                        } else {
                            res.status(301).json({message:"Not accepted query"});
                        }
                    }
                });
            }
        });
    } else {
        res.status(404).json({message: "Post not found"});
    }
};

module.exports = {
    likePost
};