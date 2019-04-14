const Comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');

const doAddComment = (req, res, post) => {
    if(!post) {
        res.status(404).json({ message: "Post not found"});
    } else {
        const { content } = req.body;
        const userid = req.user._id;
        
        Comment.create(
            {
                content: content
            }, (err, comment) => {
                if(err) {
                    res.status(400).json(err);
                } else {
                    User.findById(userid)
                        .exec((err, user) => {
                            if(err) {
                                res.status(400).json(err)
                            } else {
                                comment.author.push(user);
                                comment.save((err, comment) =>{
                                    if(err) {
                                        res.status(400).json(err);
                                    } else {
                                        post.comments.push(comment);
                                        post.save((err, post) => {
                                            if(err) {
                                                res.status(400).json(err);
                                            } else {
                                                res.status(201).json(post);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                }
            }
        );

    }
};

const commentCreateOne = (req, res) => {
    console.log(req.user);
    const { postid } = req.params;
    if (postid) {
      Post.findById(postid)
        .select("comments")
        .exec((err, post) => {
          if (err) {
            res.status(400).json(err);
          } else {
            doAddComment(req, res, post);
          }
        });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
};

const commentDeleteOne = (req, res) => {
    const { commentid } = req.params;
    const { postid } = req.params;
    if (commentid) {
        Comment.findByIdAndRemove(commentid).exec((err, comment) => {
            if (err) {
                return res.status(404).json(err);
            }
            if(postid) {
                Post.findById(postid).exec((err, post) => {
                    if(err) {
                        return res.status(400).json(err);
                    }            
                    post.comments.pull(commentid);
                    post.save(function (err) {
                        if(err) {
                            return res.status(400).json(err);
                        } else {
                            res.status(204).json(null);
                        }
                    });
                });
            } else {
                res.status(404).json ({
                    message: "No post found"
                });
            }
        });

    } else {
        res.status(404).json ({
            message: "No comment found"
        });
    }
};

const commentReadOne = (req, res) => {
    const { commentid } = req.params;
    Comment.findById(commentid).exec((err, comment) => {
        if(!comment){
            return res.status(404).json({
                message: "Comment not found"
            });
        } else if (err) {
            return res.status(404).json(err);
        }
        res.status(200).json(comment);
    });
};

module.exports = {
    commentCreateOne,
    commentDeleteOne,
    commentReadOne
};