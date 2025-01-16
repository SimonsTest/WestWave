// ============== SIDEBAR FUNCTIONALITY ============== 
const menuItems = document.querySelectorAll('.menu-item');

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

// ============== CREATE POST FUNCTIONALITY ============== 
const postInput = document.querySelector('.create-post input');
const postButton = document.querySelector('.create-post .btn-primary');
const feedContainer = document.querySelector('.feed-container');

postButton.addEventListener('click', () => {
    const postText = postInput.value.trim();

    if (postText !== "") {
        const post = document.createElement('div');
        post.classList.add('feed');
        post.innerHTML = `
            <div class="head">
                <div class="user-info">
                    <img src="profile-pic.png" alt="User">
                    <div class="details">
                        <h4>Simon Drastil</h4>
                        <small>Just now</small>
                    </div>
                </div>
            </div>
            <div class="post-content">${postText}</div>
            <div class="actions">
                <button>👍 Like</button>
                <button>💬 Comment</button>
                <button>🔄 Share</button>
            </div>
        `;
        feedContainer.prepend(post);
        postInput.value = ""; // Clear input after posting
    }
});

// ============== SEARCH FUNCTIONALITY ============== 
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll('.feed');

    posts.forEach(post => {
        const text = post.querySelector('.post-content').textContent.toLowerCase();
        post.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// ============== JOINED POOLS FUNCTIONALITY ============== 
const joinedPoolContainer = document.querySelector('.joined-pool-list');
const savedPools = JSON.parse(localStorage.getItem('joinedPools')) || [];

const renderPools = () => {
    joinedPoolContainer.innerHTML = "";
    savedPools.forEach(pool => {
        const poolItem = document.createElement('div');
        poolItem.classList.add('pool-item');
        poolItem.textContent = pool;
        joinedPoolContainer.appendChild(poolItem);
    });
};

renderPools();

// ============== SAVE POOLS FROM `pool.html` ============== 
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('joinPool')) {
        const newPool = params.get('joinPool');
        if (!savedPools.includes(newPool)) {
            savedPools.push(newPool);
            localStorage.setItem('joinedPools', JSON.stringify(savedPools));
            renderPools();
        }
    }
});

// ============== THEME SWITCH FUNCTIONALITY ============== 
const themeButton = document.querySelector('.menu-item:nth-child(6)'); // Theme button in sidebar

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
