const User = require('../../models/user');
const Post = require('../../models/post');

//********** Delete a User account, including User model document 
//********** user's posts (comments not deleted showing the user 'not exist') then logout 
const deleteUser = (req, res) =>{
    const {userId} = req.body;
    User.findOneAndRemove(
        {_id: userId}
    ).exec((err, result)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        } else{
            Post.findOneAndRemove({user: userId}).exec((err, result)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    })
                } else{
                    res.json({message: "User has been removed"});
                }
            })
        }
    });
}

//Change username of user model instance
const changeUserName = (req, res) => {
    User.findByIdAndUpdate(
        req.body.userId, 
        {username: req.body.newUserName},
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
    changeUserName,
    deleteUser
}