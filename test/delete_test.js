const assert = require('assert');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

describe('Deleting a user', ()=>{
    let joe;

    beforeEach((done)=>{
        joe = new User({username:'Joe'});
        joe.save().then(()=>{
            done();
        })
    });

    it('model instance delete', (done)=>{
        joe.delete()
            .then(()=>User.findOne({username:'Joe'}))
            .then((user)=>{
                assert(user === null);
                done();
            });
    });

    it('class method delete', (done)=>{
        User.deleteOne({username:'Joe'})
            .then(()=>User.findOne({username:'Joe'}))
            .then((user)=>{
                assert(user === null);
                done();
            });
    });

    it('class method findAndDelete', (done)=>{
        User.findOneAndDelete({username:'Joe'})
            .then(()=>User.findOne({username:'Joe'}))
            .then((user)=>{
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndDelete', (done)=>{
        User.findByIdAndDelete(joe._id)
            .then(()=>User.findOne({username:'Joe'}))
            .then((user)=>{
                assert(user === null);
                done();
        });
    });
});