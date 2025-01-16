// Add interactivity for the like button
document.querySelectorAll('.post-actions img[alt="Like"]').forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('liked')) {
            likeButton.src = 'icons/like.svg'; // Regular like icon
            likeButton.classList.remove('liked');
        } else {
            likeButton.src = 'icons/liked.svg'; // Liked icon
            likeButton.classList.add('liked');
        }
    });
});

// Add new comment dynamically
document.querySelectorAll('.post').forEach((post) => {
    const commentLink = post.querySelector('.post-details a');
    const postDetails = post.querySelector('.post-details');

    commentLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Simulate a new comment (for demo purposes)
        const newComment = document.createElement('p');
        newComment.innerHTML = '<strong>You:</strong> This is a new comment!';
        postDetails.appendChild(newComment);
    });
});

// Story scroll interaction
const storyContainer = document.querySelector('.story-container');
let isDown = false;
let startX;
let scrollLeft;

storyContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - storyContainer.offsetLeft;
    scrollLeft = storyContainer.scrollLeft;
});

storyContainer.addEventListener('mouseleave', () => {
    isDown = false;
});

storyContainer.addEventListener('mouseup', () => {
    isDown = false;
});

storyContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storyContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    storyContainer.scrollLeft = scrollLeft - walk;
});

// Add interactivity for story elements (example)
document.querySelectorAll('.story').forEach((story) => {
    story.addEventListener('click', () => {
        alert(`You clicked on ${story.querySelector('p').innerText}'s story!`);
    });
});
