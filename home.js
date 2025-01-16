// Add interactivity for the like button
document.querySelectorAll('.post-actions .action-btn').forEach((actionButton) => {
    actionButton.addEventListener('click', (e) => {
        // Toggle between Like, Comment, Share button actions (can be customized further)
        if (e.target.innerText === "Like") {
            e.target.classList.toggle('liked');
            if (e.target.classList.contains('liked')) {
                e.target.style.backgroundColor = '#3e8e41'; // Green when liked
                e.target.innerText = 'Liked';
            } else {
                e.target.style.backgroundColor = ''; // Default color
                e.target.innerText = 'Like';
            }
        }

        // Handle other actions like Comment, Share similarly
        if (e.target.innerText === "Comment") {
            // Open a comment box or display a dummy comment for now
            const postDetails = e.target.closest('.post').querySelector('.post-details');
            const newComment = document.createElement('p');
            newComment.innerHTML = '<strong>You:</strong> This is a new comment!';
            postDetails.appendChild(newComment);
        }

        if (e.target.innerText === "Share") {
            alert('Post shared! (simulated)');
        }
    });
});

// Add interactivity for stories (e.g., open full screen or show an alert)
document.querySelectorAll('.story').forEach((story) => {
    story.addEventListener('click', () => {
        alert(`You clicked on ${story.querySelector('p').innerText}'s story!`);
    });
});

// For the bottom navigation (optional: enable some basic transitions)
document.querySelectorAll('.bottom-nav img').forEach((navIcon) => {
    navIcon.addEventListener('click', () => {
        alert(`Navigating to ${navIcon.alt}...`);
    });
});
