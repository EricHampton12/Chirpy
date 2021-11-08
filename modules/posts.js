import { deletePost, getUser, updatePost } from "./ajax.js";
import { currentUser, displayUserOnPost } from "./users.js";

export function displayPosts(posts) {
    const feedsPage = document.querySelector("feeds-page");
    feedsPage.innerHTML = "";
    posts.forEach(post => feedsPage.innerHTML += `
    <div class="post border">
            <div class="user-avatar">
              <img src="images/user2.jpg" />
            </div>
            <div class="post-content">
              <div class="post-user-info light-text">
                <h4 class="full-name" id="fullname"${post.id}>${getUser(post.userId, displayUserOnPost, post.id)}</h4>
                <i class="fas fa-check-circle"></i>
                <span class="username" id="username"${post.id}>@${getUser(post.userId, displayUserOnPost, post.id)}</span>
              </div>
              <p class="post-text light-text">
               ${post.body}
              </p>
              <p>${post.date}
              <!-- <div class="post-img">
                <img src="images/post-img-1.jpg" />
              </div> -->
              <div class="post-icons">
                <i class="far fa-comment">${post.comments}</i>
                <i class="fas fa-retweet"></i>
                <i class="far fa-heart">${post.likes}</i>
                <i class="fas fa-share-alt"></i>
              </div>
            </div> `);
    displayPosts();
}