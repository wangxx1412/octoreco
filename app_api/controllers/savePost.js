const Post = require('../../models/post');
const User = require('../../models/user');

const savePost = (req, res) => {
    const { saved } = req.query;
    const { postid } = req.params;
    const userid = req.user._id;

    if (userid) {
        User.findById(userid)
            .select("savedPosts")
            .exec((err, user) => {
                if(err) {
                    res.status(400).json(err);
                } else {
                    Post.findById(postid)
                        .exec((err, post) => {
                            if(err) {
                                res.status(400).json(err);
                            } else {
                                //Use Switch clause
                                if( saved === "yes") {
                                    user.savedPosts.push(post);
                                    user.save((err, user) => {
                                        if(err) {
                                            res.status(400).json(err);
                                        } else {
                                            res.status(201).json({message: "Post saved"});
                                        }
                                    });
                                } else {
                                    user.savedPosts.pull(post);
                                    user.save((err, user) => {
                                        if(err) {
                                            res.status(400).json(err);
                                        } else {
                                            res.status(201).json({message: "Post unsaved"});
                                        }
                                    });
                                }
                            }
                        });
                }
            });
            
    } else {
        res.status(404).json({message:"Post not found"});
    }
};

module.exports = {
    savePost
};