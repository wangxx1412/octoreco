const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    content: String,
    imageUrl: [String],
    likes:[{
      type:Schema.Types.ObjectId,
      ref:'user'
    }],
    comments: [{
      type: Schema.Types.ObjectId, 
      ref: 'comment'
    }],
    user: [{ 
      type: Schema.Types.ObjectId, 
      ref:'user'
    }],
    createdAt: { type: Date, default: Date.now }
});

PostSchema.virtual('likeCount').get(function(){
  return this.likes.length;
});


const Post = mongoose.model('post', PostSchema);

module.exports = Post;
