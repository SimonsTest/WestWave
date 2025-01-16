// Sidebar Navigation
const menuItems = document.querySelectorAll('.menu-item');

// Messages
const messageNotification = document.querySelector('#messages');
const messages = document.querySelector('.messages');
const messageSearch = document.querySelector('#message-search');

// Theme Customization
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');

// Notifications
const notificationPopup = document.querySelector('.notifications-popup');
const notificationBtn = document.querySelector('#notifications');

// Post Functionality
const postForm = document.querySelector('.create-post');
const postInput = document.querySelector('#create-post');
const postFeed = document.querySelector('.feeds');

// Join Pools Button
const joinPoolBtn = document.querySelector('#join-pool');
const joinedPoolsContainer = document.querySelector('.joined-pool-list');

// Local Storage Data
const posts = JSON.parse(localStorage.getItem('posts')) || [];
const joinedPools = JSON.parse(localStorage.getItem('joinedPools')) || [];

// ============== SIDEBAR NAVIGATION ============== 

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(menu => menu.classList.remove('active'));
        item.classList.add('active');

        if (item.id !== 'notifications') {
            notificationPopup.style.display = 'none';
        } else {
            notificationPopup.style.display = 'block';
            notificationBtn.querySelector('.notification-count').style.display = 'none';
        }
    });
});

// ============== JOIN POOLS SYSTEM ============== 

joinPoolBtn.addEventListener('click', () => {
    window.location.href = 'pool.html'; // Redirect to the pools joining page
});

const loadJoinedPools = () => {
    joinedPoolsContainer.innerHTML = '';
    joinedPools.forEach(pool => {
        const poolItem = document.createElement('div');
        poolItem.classList.add('pool-item');
        poolItem.textContent = pool;
        joinedPoolsContainer.appendChild(poolItem);
    });
};

// ============== MESSAGE SEARCH ============== 

const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    messages.querySelectorAll('.message').forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        user.style.display = name.includes(val) ? 'flex' : 'none';
    });
};

messageSearch.addEventListener('keyup', searchMessage);

// Highlight messages card when messages menu item is clicked
messageNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--primary-color)';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
});

// ============== THEME CUSTOMIZATION ============== 

const openThemeModal = () => {
    themeModal.style.display = 'grid';
};

const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
};

themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);

// ============== FONT SIZE ============== 

const removeSizeSelectors = () => {
    fontSize.forEach(size => size.classList.remove('active'));
};

fontSize.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelectors();
        size.classList.add('active');
        let fontSize;
        switch (true) {
            case size.classList.contains('font-size-1'):
                fontSize = '10px';
                break;
            case size.classList.contains('font-size-2'):
                fontSize = '13px';
                break;
            case size.classList.contains('font-size-3'):
                fontSize = '16px';
                break;
            case size.classList.contains('font-size-4'):
                fontSize = '19px';
                break;
            case size.classList.contains('font-size-5'):
                fontSize = '22px';
                break;
        }
        document.querySelector('html').style.fontSize = fontSize;
    });
});

// ============== PRIMARY COLOR CUSTOMIZATION ============== 

const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => colorPicker.classList.remove('active'));
};

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        changeActiveColorClass();
        color.classList.add('active');
        const primaryHues = {
            'color-1': 220,
            'color-2': 52,
            'color-3': 352,
            'color-4': 152,
            'color-5': 202
        };
        root.style.setProperty('--primary-color-hue', primaryHues[color.classList[0]]);
    });
});

// ============== POST SYSTEM (Create, Store & Load) ============== 

const loadPosts = () => {
    postFeed.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('feed');
        postElement.innerHTML = `
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img src="./images/user-profile.jpg">
                    </div>
                    <div class="info">
                        <h3>${post.username}</h3>
                        <small>${post.timestamp}</small>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-h"></i>
                </span>
            </div>
            <p>${post.text}</p>
            <div class="action-buttons">
                <span class="like-btn" onclick="likePost(${index})">
                    <i class="uil uil-heart"></i> ${post.likes}
                </span>
                <span class="comment-btn" onclick="toggleComments(${index})">
                    <i class="uil uil-comment-dots"></i> ${post.comments.length}
                </span>
            </div>
            <div class="comments" id="comments-${index}" style="display: none;">
                ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                <input type="text" placeholder="Add a comment..." id="comment-input-${index}">
                <button onclick="addComment(${index})">Post</button>
            </div>
        `;
        postFeed.appendChild(postElement);
    });
};

const addPost = (e) => {
    e.preventDefault();
    const text = postInput.value.trim();
    if (!text) return;
    const newPost = {
        username: 'Simon Drastil',
        text,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    postInput.value = '';
    loadPosts();
};

postForm.addEventListener('submit', addPost);

// ============== LIKE SYSTEM ============== 

const likePost = (index) => {
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
};

// ============== COMMENT SYSTEM ============== 

const toggleComments = (index) => {
    const commentSection = document.getElementById(`comments-${index}`);
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
};

const addComment = (index) => {
    const commentInput = document.getElementById(`comment-input-${index}`);
    const commentText = commentInput.value.trim();
    if (!commentText) return;
    posts[index].comments.push(commentText);
    localStorage.setItem('posts', JSON.stringify(posts));
    commentInput.value = '';
    loadPosts();
};

// Initial Load
loadPosts();
loadJoinedPools();
