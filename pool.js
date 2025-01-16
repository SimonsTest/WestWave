// Pool names
const pools = [
    "Terra", "Tor", "Titus", "Triton", "Executive", "Grades", "Committees", "All US", "Announcement", "Common Wealth",
    "Baking", "Book", "Model UN", "Climbing", "Yearbook", "Mandarin", "Quizbol", "Community Service", "Debate",
    "Cheer", "Basketball", "Cross Country", "Track", "Volleyball", "Middle School Basketball", "MS Track"
];

// Load previously joined pools
const joinedPools = JSON.parse(localStorage.getItem('joinedPools')) || [];

// Populate the pool list
const poolList = document.getElementById('pool-list');

pools.forEach(pool => {
    const poolDiv = document.createElement('div');
    poolDiv.classList.add('pool');
    poolDiv.textContent = pool;
    
    // If already joined, mark it
    if (joinedPools.includes(pool)) {
        poolDiv.classList.add('joined');
        poolDiv.textContent += " (Joined)";
    }

    // Add event listener for joining/unjoining pools
    poolDiv.addEventListener('click', () => {
        if (!joinedPools.includes(pool)) {
            joinedPools.push(pool);
            poolDiv.classList.add('joined');
            poolDiv.textContent = `${pool} (Joined)`;
        } else {
            const index = joinedPools.indexOf(pool);
            joinedPools.splice(index, 1);
            poolDiv.classList.remove('joined');
            poolDiv.textContent = pool;
        }

        // Save to localStorage
        localStorage.setItem('joinedPools', JSON.stringify(joinedPools));
    });

    poolList.appendChild(poolDiv);
});

// Go to Home Button
document.getElementById('go-home').addEventListener('click', () => {
    window.location.href = "home.html"; // Redirects to Home
});
