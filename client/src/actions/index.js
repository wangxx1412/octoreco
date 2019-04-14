import axios from 'axios';
import { SUBMIT_POST, FETCH_USER, FETCH_POST, FETCH_POSTS, LIKE_POST } from './types';
import { toast } from 'react-toastify';

  // ****** submit multi files into s3 
export const submitPost = (values, files) => async dispatch =>{
  const imageUrls =  await Promise.all( files.map(async file => {
    const uploadConfig = await axios.get('/api/upload');

    await axios.put(uploadConfig.data.url, file, {
      headers:{
        'Content-Type':file.type
      }
    });
    return uploadConfig.data.key;
  }));

  await axios.post('/api/posts/new', {
    ...values, imageUrl: imageUrls
  }).then(res => { 
    toast.success('Upload successfully');
    dispatch({ type: SUBMIT_POST, payload: res.data});
  }).catch(err => { 
      toast.error('Upload fail');
  });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPosts = () => async dispatch => {
  const res = await axios.get('/api/posts');

  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const fetchPost = id => async dispatch => {
  const res = await axios.get(`/api/posts/${id}`);

  dispatch({ type: FETCH_POST, payload: res.data });
};

export const likePost = (postid, like)=>async dispatch=>{
  const res = await axios.get(`/api/posts/${postid}/${like}`);

  dispatch({ type: LIKE_POST, payload: res.data });
}