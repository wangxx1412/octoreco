const Post = require('../../models/post');
const User = require('../../models/user');

const postCreateOne = async (req, res) =>{
    const { content, imageUrl } = req.body;
    const  userid = req.user._id;
    await Post.create(
        {
            content: content,
            imageUrl: imageUrl
        }, async (err, post) => {
            if(err) {
                res.status(400).json(err);
            } else {
                await User.findById(userid)
                .exec((err, user) => {
                    if(err) {
                        res.status(400).json(err);
                    } else {
                        post.user = userid;
                        user.posts.push(post);
                        user.save((err, user) => {
                            if(err) {
                                res.status(400).json(err);
                            } else {
                                post.save((err, post) =>{
                                    if(err){
                                        res.status(400).json(err);
                                    } else {
                                        res.status(201).json({message: "Post created"});
                                    }
                                })
                            }
                        });
                    }
                });
            }
        }
    );
};

const postDeleteOne = async (req, res) => {
    const { postid } = req.params;
    const userid  = req.user._id;
    if (postid) {
        await Post.findByIdAndRemove(postid).exec(async (err, post) => {
            if (err) {
                return res.status(404).json(err);
            }
            await User.findById(userid)
            .select("posts")
            .exec((err, user) => {
                if(err) {
                    res.status(400).json(err);
                } else {
                    user.posts.pull(post);
                    user.save((err, user) => {
                        if(err) { 
                            res.status(400).json(err);
                        }
                        else{
                            res.status(201).json({message: "Post removed"});
                        }
                    });
                }
            });
        });
    } else {
        res.status(404).json ({
            message: "No post found"
        });
    }
};

const postReadOne = async (req, res) => {
    const { postid } = req.params;
    await Post.findById(postid)
        .populate("user", "_id, username")
        .exec((err, post) => {
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        } else if (err) {
            return res.status(404).json({
                err
            });
        }
        res.status(200).json(post);
    });
};


// const postsRead = async (req, res) => {
//     const results = await Post.find();

//     const posts = await Promise.all(results.map(async result => {
//          const user =  await User.findById(result.user)
//                                 .select("username");
//         return {
//             id: result._id,
//             content: result.content,
//             imageUrl: result.imageUrl,
//             comments: result.comments,
//             likes: result.likes,
//             userid: user.id,
//             username: user.username
//         }
//     }));
//     res.status(200).json(posts);
// };

//Todo: for grabing single post
const getPosts = (req, res) => {
    const posts = Post.find()
        .populate("user", "_id username")
        .select("_id content imageUrl comments likes created")
        .sort({ created: -1 })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => console.log(err));
};

const postsByUser = (req, res) => {
    const {userid} = req.params;
    Post.find({user: userid})
        .populate("user", "_id username")
        .sort({created: -1})
        .exec((err, posts)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            } 
            res.status(200).json(posts);
        });
}

module.exports ={
    postCreateOne,
    postDeleteOne,
    postReadOne,
    getPosts,
    postsByUser
};

