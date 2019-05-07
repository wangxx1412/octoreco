const Post = require('../../models/post');

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
    like,
    unlike
};

