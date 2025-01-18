// ============== SIDEBAR TOGGLE ============== 
const menuItems = document.querySelectorAll('.menu li');

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

// ============== SEARCH FUNCTIONALITY ============== 
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keyup', function() {
    let query = searchInput.value.toLowerCase();
    let posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        let content = post.textContent.toLowerCase();
        post.style.display = content.includes(query) ? 'block' : 'none';
    });
});

// ============== CREATE POST FUNCTIONALITY ============== 
const postInput = document.querySelector('.create-post input');
const postButton = document.querySelector('.create-post button');
const feed = document.querySelector('.feed');

// Load posts from local storage
document.addEventListener("DOMContentLoaded", () => {
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.forEach(post => addPostToFeed(post));
});

// Add post event listener
postButton.addEventListener("click", () => {
    let postText = postInput.value.trim();
    if (postText) {
        addPostToFeed(postText);
        savePostToLocal(postText);
        postInput.value = "";
    }
});

// Function to add a post to the feed
function addPostToFeed(postText) {
    let postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="user.png" class="post-profile-pic">
            <span class="post-user">User</span>
        </div>
        <p>${postText}</p>
        <div class="post-actions">
            <button class="like-btn">❤️ Like</button>
            <button class="delete-btn">🗑 Delete</button>
        </div>
    `;
    feed.prepend(postDiv);

    postDiv.querySelector('.like-btn').addEventListener('click', function() {
        this.classList.toggle('liked');
    });

    postDiv.querySelector('.delete-btn').addEventListener('click', function() {
        postDiv.remove();
        removePostFromLocal(postText);
    });
}

// Save posts to local storage
function savePostToLocal(postText) {
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.push(postText);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
}

// Remove post from local storage
function removePostFromLocal(postText) {
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts = savedPosts.filter(post => post !== postText);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
}

// ============== LOAD JOINED POOLS FROM LOCAL STORAGE ============== 
document.addEventListener("DOMContentLoaded", () => {
    let joinedPools = JSON.parse(localStorage.getItem("joinedPools")) || [];
    const joinedPoolsContainer = document.querySelector('.joined-pool-list');

    joinedPools.forEach(pool => {
        let poolDiv = document.createElement('div');
        poolDiv.classList.add('pool-item');
        poolDiv.textContent = pool;
        joinedPoolsContainer.appendChild(poolDiv);
    });
});

// ============== SUGGESTED POOLS & JOIN FUNCTIONALITY ============== 
const suggestedPools = [
    "Terra", "Tor", "Titus", "Triton"
];

const suggestedPoolsContainer = document.querySelector('.suggested-pools ul');

suggestedPools.forEach(pool => {
    let li = document.createElement('li');
    li.textContent = pool;
    li.classList.add('suggested-pool-item');
    li.addEventListener('click', function() {
        joinPool(pool);
    });
    suggestedPoolsContainer.appendChild(li);
});

// Function to join a pool
function joinPool(poolName) {
    let joinedPools = JSON.parse(localStorage.getItem("joinedPools")) || [];
    if (!joinedPools.includes(poolName)) {
        joinedPools.push(poolName);
        localStorage.setItem("joinedPools", JSON.stringify(joinedPools));

        let joinedPoolsContainer = document.querySelector('.joined-pool-list');
        let poolDiv = document.createElement('div');
        poolDiv.classList.add('pool-item');
        poolDiv.textContent = poolName;
        joinedPoolsContainer.appendChild(poolDiv);
    }
}

// ============== BOTTOM NAVIGATION BUTTONS ============== 
document.querySelector('.bottom-nav button[data-page="home"]').addEventListener('click', () => {
    window.location.href = "home.html";
});

document.querySelector('.bottom-nav button[data-page="pools"]').addEventListener('click', () => {
    window.location.href = "pool.html";
});

document.querySelector('.bottom-nav button[data-page="messages"]').addEventListener('click', () => {
    alert("Messages Feature Coming Soon!");
});

document.querySelector('.bottom-nav button[data-page="settings"]').addEventListener('click', () => {
    alert("Settings Feature Coming Soon!");
});

// ============== PROFILE NAME FROM STORAGE ============== 
document.addEventListener("DOMContentLoaded", () => {
    let storedUsername = localStorage.getItem("username") || "User";
    document.querySelector('.profile-name').textContent = storedUsername;
});

// ============== LOGO CLICK GOES TO HOME ============== 
document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = "home.html";
});
