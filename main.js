import { displayPosts } from './modules/posts.js';
import { getPosts, createPost, loginUser } from './modules/ajax.js';
import { saveUser } from './modules/users.js';

(function(){
    $("#login-form-btn").click(() => loginUser(saveUser));
    $("#postBtn").click(() => createPost(displayPosts));
    getPosts();
})();