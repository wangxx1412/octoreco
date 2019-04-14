const assert = require('assert');
const User = require('../models/user');
const Post = require('../models/post');

describe('Virtual types', ()=>{
    it('postCount returns number of posts', (done)=>{
        const joe = new User({
            username:'Joe'
        });
        const post = new Post({
            content:'New Post'
        });
        joe.posts.push(post);

        Promise.all([joe.save(), post.save()]) 
        .then(()=>User.findOne({username:'Joe'}))
        .then((user)=>{
            assert(user.postCount === 1);
            done();
        });
    });
})