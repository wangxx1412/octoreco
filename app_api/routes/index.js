const express = require('express');
const router = express.Router();
const ctrlPosts = require('../controllers/post');
const ctrlComments = require('../controllers/comment');
const ctrlLike = require('../controllers/like');
const ctrlSave = require('../controllers/savePost');

const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../../config/keys');
const requireLogin = require('../../middlewares/requireLogin');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

router.get('/upload', requireLogin, (req, res)=>{
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject',{
        Bucket: 'octoreco-bucket-1',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url)=> res.send({key, url})
    );
});

router.get('/', (req, res)=>{
    res.send('HEllooo API')
});

router.get("/current_user", (req, res) => {
    res.send(req.user);
});
//Like & Unlike
router
    .route("/posts/like")
    .put(requireLogin, ctrlLike.like)

router
    .route("/posts/unlike")
    .put(requireLogin, ctrlLike.unlike)

//savePosts
router
    .route("/posts/save")
    .put(requireLogin, ctrlSave.save)

router
    .route("/posts/unsave")
    .put(requireLogin, ctrlSave.unsave)

//Post
router
    .route("/posts")
    .get(ctrlPosts.getPosts)

router
    .route("/posts/new")
    .post(requireLogin, ctrlPosts.postCreateOne)

router
    .route("/posts/:postid")
    .get(ctrlPosts.postReadOne)

router
    .route("/posts/user/:userid")
    .get(ctrlPosts.postsByUser)

router
    .route("/posts/post/:postid")
    .delete(requireLogin, ctrlPosts.postDeleteOne)

//Comment
router
    .route("/posts/:postid/comment")
    .put(requireLogin, ctrlComments.comment)

router
    .route("/posts/:postid/uncomment")
    .put(requireLogin, ctrlComments.uncomment)



module.exports = router;