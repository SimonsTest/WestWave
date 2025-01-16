// 🌊 Load Posts on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
    updateOnlineFriends();
});

// 📌 Load Posts from Local Storage
function loadPosts() {
    const postsContainer = document.getElementById("posts-container");
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    postsContainer.innerHTML = ""; // Clear container before reloading posts

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <p>${post.text}</p>
            ${post.image ? `<img src="${post.image}" class="post-image">` : ""}
            <small>Posted at ${post.time}</small>
            <div class="post-actions">
                <button onclick="likePost(${index})">❤️ ${post.likes} Likes</button>
                <button onclick="commentPost(${index})">💬 ${post.comments.length} Comments</button>
                <button onclick="sharePost(${index})">🔗 Share</button>
            </div>
            <div class="comments-section" id="comments-${index}">
                ${post.comments.map(comment => `<p><strong>@user:</strong> ${comment}</p>`).join("")}
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}

// 📌 Submit New Post
function submitPost() {
    const postInput = document.getElementById("postInput");
    const imageInput = document.getElementById("imageUpload");

    let postText = postInput.value.trim();
    if (postText === "") return;

    let imageFile = imageInput.files[0];
    let imageURL = imageFile ? URL.createObjectURL(imageFile) : null;

    let newPost = {
        text: postText,
        image: imageURL,
        time: new Date().toLocaleTimeString(),
        likes: 0,
        comments: []
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    postInput.value = "";
    imageInput.value = "";
    loadPosts();
}

// 📌 Like a Post
function likePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts[index].likes += 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// 📌 Comment on a Post
function commentPost(index) {
    let commentText = prompt("Enter your comment:");
    if (!commentText) return;

    let posts = JSON.parse(localStorage.getItem("posts"));
    posts[index].comments.push(commentText);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// 📌 Share a Post
function sharePost(index) {
    alert("Post link copied to clipboard!");
}

// 📌 Update Online Friends
function updateOnlineFriends() {
    let friendsList = document.querySelector(".friends-section ul");
    let friends = ["@friend1", "@friend2", "@friend3", "@friend4"];

    friendsList.innerHTML = "";
    friends.forEach(friend => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<span class="online-dot"></span> ${friend}`;
        friendsList.appendChild(listItem);
    });
}

// 📌 Auto-Update Every 30 Seconds
setInterval(() => {
    updateOnlineFriends();
    loadPosts();
}, 30000);