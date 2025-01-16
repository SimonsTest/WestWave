document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
    loadPools();
});

// Load Posts from Local Storage
function loadPosts() {
    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = ""; // Clear before reloading

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <img src="user_avatar.png" alt="User">
                    <h3>WestWave User</h3>
                </div>
                <span class="dot">⋮</span>
            </div>
            <p>${post.text}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
            <div class="post-actions">
                <button onclick="toggleComments(${index})">💬 Comments</button>
                <button onclick="likePost(${index})">❤️ Like (<span id="like-count-${index}">${post.likes}</span>)</button>
            </div>
            <div class="comments hidden" id="comments-${index}">
                <input type="text" id="commentInput-${index}" placeholder="Write a comment">
                <button onclick="addComment(${index})">Post</button>
                <ul id="commentList-${index}">
                    ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
            </div>
        `;

        feedContainer.appendChild(postElement);
    });
}

// Add a New Post
function addPost() {
    let postText = document.getElementById("postText").value.trim();
    let postImage = document.getElementById("postImageURL").value.trim();

    if (!postText) return; // Prevent empty posts

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift({ text: postText, image: postImage, comments: [], likes: 0 });

    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("postText").value = "";
    document.getElementById("postImageURL").value = "";

    loadPosts();
}

// Add a Comment to a Post
function addComment(index) {
    let commentInput = document.getElementById(`commentInput-${index}`);
    let commentText = commentInput.value.trim();

    if (!commentText) return; // Prevent empty comments

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index].comments.push(commentText);

    localStorage.setItem("posts", JSON.stringify(posts));
    commentInput.value = "";

    loadPosts();
}

// Like a Post
function likePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index].likes += 1;

    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById(`like-count-${index}`).innerText = posts[index].likes;
}

// Toggle Comment Section
function toggleComments(index) {
    let commentSection = document.getElementById(`comments-${index}`);
    commentSection.classList.toggle("hidden");
}

// Load Pools (Replace Stories with Interactive Groups)
function loadPools() {
    const poolsContainer = document.querySelector(".pools");
    let pools = JSON.parse(localStorage.getItem("pools")) || [
        { name: "Basketball Fans", image: "pool1.png" },
        { name: "School Events", image: "pool2.png" },
        { name: "Music Club", image: "pool3.png" },
        { name: "Gaming Zone", image: "pool4.png" }
    ];

    poolsContainer.innerHTML = "";
    pools.forEach((pool, index) => {
        const poolElement = document.createElement("div");
        poolElement.classList.add("pool");
        poolElement.innerHTML = `
            <div class="image">
                <img src="${pool.image}" alt="${pool.name}">
            </div>
            <p>${pool.name}</p>
        `;
        poolsContainer.appendChild(poolElement);
    });

    localStorage.setItem("pools", JSON.stringify(pools));
}

// Add Event Listeners for Post Form Toggle
document.getElementById("addPostBtn").addEventListener("click", () => {
    document.getElementById("postFormContainer").classList.toggle("hidden");
});
