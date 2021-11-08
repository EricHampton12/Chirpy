import { getRandomInt, guidGenerator } from "./helper.js";
import { displayPosts } from "./posts.js";
import { currentUser } from "./users.js";

const baseUrl = "https://chirpy-db-default-rtdb.firebaseio.com/";
const ext = ".json";

export function loginUser(callback) {
    $.get({
        url: `${baseUrl}users${ext}`,
        success: (response) => {
            const $username = $("[name='username']").val();
            const allUsers = response.filter((user) => !!user);
            const user = allUsers.find(user => user.username === $username);

            if(user) {
                callback(user);
                getPosts(displayPosts);
                $(".post-content").css("display", "flex");
                $(".login-page").hide();


            } else {
                alert("User not found");
            }
        }
    })
}

export function getPosts(callback = console.log) {
    $.get({
        url: `${baseUrl}posts${ext}`,
        success: (res) => {
            let keys = Object.keys(res);
            let posts = keys.map(key => {
                return res[key];
            }).sort((a, b) => new Date(b.date) - new Date(a.date));
            callback(posts);
        },
        error: (err) => {
            console.log(err)
        }
    })
};

export function createPost(callback = console.log) {
    const newId = guidGenerator();
    const newPost = {
        [newId]: {
            body: $("#post-text light-text").val(),
            date: new Date(),
            userId: currentUser.id,
            likes: getRandomInt(1, 100),
            comments: getRandomInt(1, 20),
            id: newId
        }
    };

    $.ajax({
        type: "PATCH",
        url: `${baseUrl}posts${ext}`,
        data: JSON.stringify(newPost),
        success: () => {
            getPosts(callback);
            $("#post-text light-text").val();
        },
        error: err => console.log(err)
    })
};

export function deletePost(postId) {
    $.get({
        type: "DELETE",
        url: `${baseUrl}posts/${postId}${ext}`,
        success: () => {
            getPosts(displayPosts)
        },
        error: err => console.log(err)
    })
};

export function updatePost(postId, editedText) {
    const editedPost = {
        body: editedText,
        date: new Date()
    }
    .ajax({
        type: "PATCH",
        url: `${baseUrl}posts/${postId}${ext}`,
        data: JSON.stringify(editedPost),
        success: () => {
            getPosts(displayPosts);
        },
        error: err => console.log(err)

    })
}