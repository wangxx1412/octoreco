export const checkLike = (likes, state) => {
  const userId = state.auth._id; //this.state.auth && this.state.auth._id;
  let match = likes.indexOf(userId) !== -1;
  return match;
};

export const checkSave = (post, state) => {
  const postId = post._id;
  let match = state.auth.savedPosts.indexOf(postId) !== -1;
  return match;
};
