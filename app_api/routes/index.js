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

//Post
router
    .route("/posts")
    .get(ctrlPosts.postsRead)

router
    .route("/posts/new")
    .post(requireLogin, ctrlPosts.postCreateOne)

router
    .route("/posts/:postid")
    .get(ctrlPosts.postReadOne)

router
    .route("/posts/:postid")
    .delete(requireLogin, ctrlPosts.postDeleteOne)

//Comment
router
    .route("/posts/:postid/comments/new")
    .post(requireLogin, ctrlComments.commentCreateOne)

router
    .route("/posts/:postid/comments/:commentid")
    .get(requireLogin, ctrlComments.commentReadOne)
    .delete(requireLogin, ctrlComments.commentDeleteOne)

//Like
router
    .route("/posts/:postid/:like")
    .get(requireLogin, ctrlLike.likePost)

//savePosts
router
    .route("/posts/:postid/save")
    .get(requireLogin, ctrlSave.savePost)

module.exports = router;