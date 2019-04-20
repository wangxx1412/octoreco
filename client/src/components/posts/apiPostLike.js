export const like = async (userId, postId) => {
    return await fetch(`http://localhost:3000/api/posts/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unlike = async (userId, postId) => {
    return await fetch(`http://localhost:3000/api/posts/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};