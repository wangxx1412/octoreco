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

export const save = async (userId, postId) => {
    return await fetch(`http://localhost:3000/api/posts/save`, {
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

export const unsave = async (userId, postId) => {
    return await fetch(`http://localhost:3000/api/posts/unsave`, {
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

export const remove = (userId, postId) => {
    return fetch(`http://localhost:3000/api/posts/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const comment = (userId, postId, comment) => {
    return fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, postId, comment) => {
    return fetch(`http://localhost:3000/api/posts/${postId}/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const changeUserName = (userId, newUserName) => {
    return fetch(`http://localhost:3000/api/${userId}/changeusername`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, newUserName })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteUser = (userId) => {
    return fetch(`http://localhost:3000/api/${userId}/deleteuser`, {
        method: "Delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};