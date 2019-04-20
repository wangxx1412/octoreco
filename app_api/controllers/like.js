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

const like = (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId, 
        {$push: {likes: req.body.userId}},
        { new: true }
        ).exec((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
}

const unlike = (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId, 
        {$pull: {likes: req.body.userId}},
        { new: true }
        ).exec((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result);
            }
        });
}

module.exports = {
    likePost,
    like,
    unlike
};

