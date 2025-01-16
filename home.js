document.addEventListener("DOMContentLoaded", () => {
    // ===================== Global Variables =====================
    const postInput = document.getElementById("post-input");
    const postBtn = document.getElementById("post-btn");
    const feedContent = document.getElementById("feed-content");
    const sidebarItems = document.querySelectorAll(".sidebar-menu li");
    const bottomNavItems = document.querySelectorAll(".bottom-nav ul li");
    const themeToggle = document.getElementById("theme-toggle");
    const notificationIcon = document.getElementById("notification-icon");
    const notificationPanel = document.getElementById("notification-panel");
    const searchBar = document.getElementById("search-bar");

    // ===================== Load Previous Data =====================
    loadPosts();
    loadTheme();
    updateSidebarState();

    // ===================== Event Listeners =====================
    
    // Posting functionality
    postBtn.addEventListener("click", () => {
        const postText = postInput.value.trim();
        if (postText === "") return;

        const newPost = {
            id: Date.now(),
            username: "User",
            content: postText,
            timestamp: new Date().toLocaleString(),
        };

        savePost(newPost);
        addPostToFeed(newPost);
        postInput.value = ""; // Clear input field
    });

    // Sidebar navigation active state
    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            sidebarItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            saveSidebarState(item.dataset.section);
        });
    });

    // Bottom navigation active state
    bottomNavItems.forEach(item => {
        item.addEventListener("click", () => {
            bottomNavItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // Theme toggle functionality
    themeToggle.addEventListener("click", toggleTheme);

    // Notifications toggle
    notificationIcon.addEventListener("click", () => {
        notificationPanel.classList.toggle("visible");
    });

    // Search bar functionality (filtering posts)
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        filterPosts(query);
    });

    // ===================== Functions =====================

    // Save posts to local storage
    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.unshift(post); // Add at the beginning
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    // Load posts from local storage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.forEach(post => addPostToFeed(post));
    }

    // Add post to the feed
    function addPostToFeed(post) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="post-header">
                <h3>${post.username}</h3>
                <small>${post.timestamp}</small>
            </div>
            <p>${post.content}</p>
            <div class="post-actions">
                <button class="like-btn" onclick="likePost(${post.id})">❤️ Like</button>
                <button class="delete-btn" onclick="deletePost(${post.id})">🗑️ Delete</button>
            </div>
        `;
        feedContent.appendChild(postElement);
    }

    // Like post function
    window.likePost = (postId) => {
        alert(`You liked post ID: ${postId}`);
    };

    // Delete post function
    window.deletePost = (postId) => {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts = posts.filter(post => post.id !== postId);
        localStorage.setItem("posts", JSON.stringify(posts));
        reloadFeed();
    };

    // Reload feed after deletion
    function reloadFeed() {
        feedContent.innerHTML = "";
        loadPosts();
    }

    // Save sidebar state
    function saveSidebarState(section) {
        localStorage.setItem("activeSidebar", section);
    }

    // Load sidebar state
    function updateSidebarState() {
        const activeSection = localStorage.getItem("activeSidebar");
        if (activeSection) {
            sidebarItems.forEach(item => {
                item.classList.remove("active");
                if (item.dataset.section === activeSection) {
                    item.classList.add("active");
                }
            });
        }
    }

    // Save and load theme preference
    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        localStorage.setItem("darkTheme", isDark ? "enabled" : "disabled");
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("darkTheme");
        if (savedTheme === "enabled") {
            document.body.classList.add("dark-theme");
        }
    }

    // Search filter for posts
    function filterPosts(query) {
        const posts = document.querySelectorAll(".post");
        posts.forEach(post => {
            const content = post.textContent.toLowerCase();
            post.style.display = content.includes(query) ? "block" : "none";
        });
    }
});
