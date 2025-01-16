// ==========================
// Home.js - Final Version
// Features: Posts, Pools, UI interactions, LocalStorage
// ==========================

// =============== SIDEBAR FUNCTIONALITY ===============
const menuItems = document.querySelectorAll('.sidebar-menu li');

// Remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
};

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
    });
});

// =============== POST FUNCTIONALITY ===============
const postInput = document.getElementById("post-input");
const postButton = document.getElementById("create-post-btn");
const feedContainer = document.querySelector(".feed-container");

// Load posts from LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});

// Add new post
postButton.addEventListener("click", () => {
    let postText = postInput.value.trim();
    if (postText === "") return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = {
        id: Date.now(),
        username: localStorage.getItem("username") || "Guest",
        content: postText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    postInput.value = "";
    renderPost(newPost);
});

// Function to render a post
const renderPost = (post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("feed-post");
    postElement.innerHTML = `
        <div class="post-header">
            <strong>${post.username}</strong> <span>${post.time}</span>
        </div>
        <p>${post.content}</p>
    `;
    feedContainer.appendChild(postElement);
};

// Function to load posts from LocalStorage
const loadPosts = () => {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    feedContainer.innerHTML = ""; // Clear feed before rendering
    posts.forEach(post => renderPost(post));
};

// =============== JOINED POOLS FUNCTIONALITY ===============
const joinedPoolsContainer = document.querySelector(".joined-pool-list");

// Load joined pools from LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    loadJoinedPools();
});

// Function to load pools
const loadJoinedPools = () => {
    let joinedPools = JSON.parse(localStorage.getItem("joinedPools")) || [];
    joinedPoolsContainer.innerHTML = ""; // Clear before rendering

    joinedPools.forEach(pool => {
        const poolItem = document.createElement("div");
        poolItem.classList.add("pool-item");
        poolItem.textContent = pool;
        joinedPoolsContainer.appendChild(poolItem);
    });
};

// =============== MESSAGE SEARCH FUNCTIONALITY ===============
const messageSearch = document.querySelector("#message-search");
const messages = document.querySelector(".messages");
const messageItems = messages.querySelectorAll(".message");

messageSearch.addEventListener("keyup", () => {
    const searchValue = messageSearch.value.toLowerCase();
    messageItems.forEach(user => {
        let name = user.querySelector("h5").textContent.toLowerCase();
        if (name.includes(searchValue)) {
            user.style.display = "flex";
        } else {
            user.style.display = "none";
        }
    });
});

// =============== THEME / DISPLAY CUSTOMIZATION ===============
const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize-theme");

// Open Theme Modal
theme.addEventListener("click", () => {
    themeModal.style.display = "grid";
});

// Close Theme Modal
themeModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("customize-theme")) {
        themeModal.style.display = "none";
    }
});

// =============== FONT SIZE CUSTOMIZATION ===============
const fontSizeOptions = document.querySelectorAll(".choose-size span");
const root = document.querySelector(":root");

fontSizeOptions.forEach(size => {
    size.addEventListener("click", () => {
        let fontSize;
        fontSizeOptions.forEach(s => s.classList.remove("active"));
        size.classList.add("active");

        if (size.classList.contains("font-size-1")) fontSize = "10px";
        else if (size.classList.contains("font-size-2")) fontSize = "13px";
        else if (size.classList.contains("font-size-3")) fontSize = "16px";
        else if (size.classList.contains("font-size-4")) fontSize = "19px";
        else if (size.classList.contains("font-size-5")) fontSize = "22px";

        document.documentElement.style.fontSize = fontSize;
    });
});

// =============== COLOR THEME CUSTOMIZATION ===============
const colorOptions = document.querySelectorAll(".choose-color span");

colorOptions.forEach(color => {
    color.addEventListener("click", () => {
        let primaryHue;
        colorOptions.forEach(c => c.classList.remove("active"));
        color.classList.add("active");

        if (color.classList.contains("color-1")) primaryHue = 252;
        else if (color.classList.contains("color-2")) primaryHue = 52;
        else if (color.classList.contains("color-3")) primaryHue = 352;
        else if (color.classList.contains("color-4")) primaryHue = 152;
        else if (color.classList.contains("color-5")) primaryHue = 202;

        root.style.setProperty("--primary-color-hue", primaryHue);
    });
});

// =============== BACKGROUND CUSTOMIZATION ===============
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

Bg1.addEventListener("click", () => {
    document.body.classList.remove("bg-2", "bg-3");
    document.body.classList.add("bg-1");
});

Bg2.addEventListener("click", () => {
    document.body.classList.remove("bg-1", "bg-3");
    document.body.classList.add("bg-2");
});

Bg3.addEventListener("click", () => {
    document.body.classList.remove("bg-1", "bg-2");
    document.body.classList.add("bg-3");
});

// =============== MOBILE NAVIGATION FUNCTIONALITY ===============
const bottomNavItems = document.querySelectorAll(".bottom-nav ul li");

bottomNavItems.forEach(item => {
    item.addEventListener("click", () => {
        bottomNavItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});
