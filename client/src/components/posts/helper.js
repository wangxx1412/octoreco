// Post model, likes: [user.id]
export const checkLike = (likes, state) => {
  const userId = state.auth._id;
  let match = likes.indexOf(userId) !== -1;
  return match;
};

// User model, savedPosts:[post.id]
export const checkSave = (post, state) => {
  const postId = post._id;
  let match = state.auth.savedPosts.indexOf(postId) !== -1;
  return match;
};
