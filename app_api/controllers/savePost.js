const User = require('../../models/user');

const save = (req, res) => {
    User.findByIdAndUpdate(
        req.body.userId, 
        {$push: {savedPosts: req.body.postId}},
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

const unsave = (req, res) => {
    User.findByIdAndUpdate(
        req.body.userId, 
        {$pull: {savedPosts: req.body.postId}},
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
    save,
    unsave
};