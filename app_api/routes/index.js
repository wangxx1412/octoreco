const express = require('express');
const router = express.Router();
const ctrlPosts = require('../controllers/post');
const ctrlComments = require('../controllers/comment');
const ctrlLike = require('../controllers/like');
const ctrlSave = require('../controllers/savePost');
const ctrlUser = require('../controllers/user');

const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../../config/keys');
const requireLogin = require('../../middlewares/requireLogin');

router.get('/', (req, res)=>{
    res.send('HEllooo API')
});


const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

//Upload jpeg to s3
router.get('/upload', requireLogin, (req, res)=>{
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject',{
        Bucket: 'octoreco-bucket-1',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url)=> res.send({key, url})
    );
});

//Fetch current auth user
router.get("/current_user", (req, res) => {
    res.send(req.user);
});

//Like & Unlike Post
router
    .route("/posts/like")
    .put(requireLogin, ctrlLike.like)

router
    .route("/posts/unlike")
    .put(requireLogin, ctrlLike.unlike)

//Save & Unsave Post
router
    .route("/posts/save")
    .put(requireLogin, ctrlSave.save)

router
    .route("/posts/unsave")
    .put(requireLogin, ctrlSave.unsave)

//Get all Posts
router
    .route("/posts")
    .get(ctrlPosts.getPosts)

//Create a new Post
router
    .route("/posts/new")
    .post(requireLogin, ctrlPosts.postCreateOne)

//Get one Post by id
router
    .route("/posts/:postid")
    .get(ctrlPosts.postReadOne)

//Get posts from one user
router
    .route("/posts/user/:userid")
    .get(ctrlPosts.postsByUser)

//Delete One post
router
    .route("/posts/post/:postid")
    .delete(requireLogin, ctrlPosts.postDeleteOne)

//Comment & Uncomment 
router
    .route("/posts/:postid/comment")
    .put(requireLogin, ctrlComments.comment)

router
    .route("/posts/:postid/uncomment")
    .put(requireLogin, ctrlComments.uncomment)

//Update UserName
router 
    .route("/:userid/changeusername")
    .put(requireLogin, ctrlUser.changeUserName)

//Delete User
router
    .route("/:userid/deleteuser")
    .delete(requireLogin, ctrlUser.deleteUser)
    
module.exports = router;