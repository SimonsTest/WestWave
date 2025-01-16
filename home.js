// Wait for DOM to load before executing
document.addEventListener("DOMContentLoaded", () => {
    loadPosts(); // Load existing posts from local storage
});

/* =============== SIDEBAR MENU INTERACTIONS ============== */
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(menu => menu.classList.remove("active"));
        item.classList.add("active");
    });
});

/* =============== POST CREATION (WITH LOCAL STORAGE) ============== */
const postForm = document.querySelector("#create-post-form");
const postInput = document.querySelector("#create-post-input");
const feedContainer = document.querySelector(".feeds");

postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const postText = postInput.value.trim();
    if (postText === "") return;

    addPostToFeed(postText);
    savePostToLocal(postText);
    postInput.value = ""; // Clear input
});

// Function to add post to feed
function addPostToFeed(text) {
    const postElement = document.createElement("div");
    postElement.classList.add("feed");
    postElement.innerHTML = `
        <div class="head">
            <div class="user">
                <div class="profile-photo">
                    <img src="./images/profile.png" alt="User">
                </div>
                <div class="info">
                    <h3>Username</h3>
                    <small>Just Now</small>
                </div>
            </div>
            <span class="edit"><i class="uil uil-ellipsis-h"></i></span>
        </div>
        <div class="post-content">
            <p>${text}</p>
        </div>
        <div class="action-buttons">
            <span class="like"><i class="uil uil-heart"></i></span>
            <span class="comment"><i class="uil uil-comment-dots"></i></span>
            <span class="share"><i class="uil uil-share-alt"></i></span>
        </div>
    `;
    feedContainer.prepend(postElement);
}

// Function to save post in local storage
function savePostToLocal(text) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(text);
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to load posts from local storage
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => addPostToFeed(post));
}

/* =============== THEME SWITCHER ============== */
const themeButton = document.querySelector("#theme-toggle");
const body = document.body;

// Check local storage for theme preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
}

themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.removeItem("darkMode");
    }
});

/* =============== SEARCH FUNCTION ============== */
const searchInput = document.querySelector("#search-bar");

searchInput.addEventListener("keyup", function () {
    let searchValue = searchInput.value.toLowerCase();
    let posts = document.querySelectorAll(".feed .post-content p");

    posts.forEach(post => {
        if (post.textContent.toLowerCase().includes(searchValue)) {
            post.closest(".feed").style.display = "block";
        } else {
            post.closest(".feed").style.display = "none";
        }
    });
});

/* =============== NOTIFICATIONS ============== */
const notificationBell = document.querySelector("#notifications");
const notificationPopup = document.querySelector(".notifications-popup");

notificationBell.addEventListener("click", () => {
    notificationPopup.classList.toggle("active");
    notificationBell.querySelector(".notification-count").style.display = "none";
});

/* =============== MESSAGES INTERACTION ============== */
const messageNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");

messageNotification.addEventListener("click", () => {
    messages.classList.toggle("highlight");
    messageNotification.querySelector(".notification-count").style.display = "none";
});

/* =============== SMOOTH SCROLL ============== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* =============== JOIN POOLS PAGE REDIRECT ============== */
const joinPoolButton = document.querySelector("#join-pool");
if (joinPoolButton) {
    joinPoolButton.addEventListener("click", () => {
        window.location.href = "pool.html";
    });
}
