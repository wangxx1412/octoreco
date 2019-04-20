import {FETCH_POST, FETCH_POSTS} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
      case FETCH_POST:
        return { ...state, post: action.payload};
      case FETCH_POSTS:
        return {...state, posts: action.payload}
      default:
        return state;
    }
  }