export let currentUser = {};

export class CreateUser {
    constructor(firstName, lastName, username) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
};

export function displayUserOnPost(user, postId) {
    $(`#name${postId}`).html(user.name);
    $(`#username${postId}`).html(`@${user.username}`);
}

export function saveUser(user) {
    currentUser = user;
}