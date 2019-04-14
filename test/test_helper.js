const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done)=>{
    mongoose.connect('mongodb://localhost/octoreco_test', { useNewUrlParser: true });
    mongoose.connection
    .once('open', ()=>{done();})
    .on('error', (error)=>{
        console.warn('Warning',error);
    });
});


beforeEach((done)=>{
    const{ users, comments, posts }= mongoose.connection.collections;
    users.drop(()=>{
      comments.drop(()=>{
          posts.drop(()=>{
              done();
          });
      });
    });
});
