const assert = require('assert');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

describe('Creating records', ()=>{
    it('saves a user', (done)=>{
        const joe = new User({ username: 'Joe'});
        joe.save()
            .then(()=>{
                assert(!joe.isNew);
                done();
            });
    });

    it('saves a post', (done)=>{
        const NewPost = new Post({content: 'New post'});
        NewPost.save()
        .then(()=>{
            assert(!NewPost.isNew);
            done();
        });
    });

    it('saves a comment', (done)=>{
        const NewComment = new Comment({content: 'New comment'});
        NewComment.save()
        .then(()=>{
            assert(!NewComment.isNew);
            done();
        });
    });
});