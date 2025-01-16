// Pool names and descriptions
const pools = [
    { name: "Terra", desc: "Environmental and sustainability discussions." },
    { name: "Tor", desc: "A place for tech enthusiasts and security experts." },
    { name: "Titus", desc: "Leadership and debate community." },
    { name: "Triton", desc: "Oceanography and marine studies." },
    { name: "Executive", desc: "Exclusive community for student executives." },
    { name: "Grades", desc: "Homework help and academic discussions." },
    { name: "Committees", desc: "Organizing events and school committees." },
    { name: "All US", desc: "All United States student discussions." },
    { name: "Announcement", desc: "Important school-wide announcements." },
    { name: "Common Wealth", desc: "A hub for financial and economics talks." },
    { name: "Baking", desc: "For aspiring and professional bakers." },
    { name: "Book", desc: "Book club and literary discussions." },
    { name: "Model UN", desc: "Model United Nations strategy and preparation." },
    { name: "Climbing", desc: "Rock climbing and outdoor adventures." },
    { name: "Yearbook", desc: "Photography and yearbook contributions." },
    { name: "Mandarin", desc: "Learning Mandarin and Chinese culture." },
    { name: "Quizbowl", desc: "Competitive trivia and knowledge games." },
    { name: "Community Service", desc: "Volunteering and social impact projects." },
    { name: "Debate", desc: "Formal debating and argumentation practice." },
    { name: "Cheer", desc: "Cheerleading squad discussions and practices." },
    { name: "Basketball", desc: "For basketball players and fans." },
    { name: "Cross Country", desc: "Long-distance running and training." },
    { name: "Track", desc: "Track and field training and events." },
    { name: "Volleyball", desc: "Volleyball team and competitive matches." },
    { name: "Middle School Basketball", desc: "MS basketball team discussions." },
    { name: "MS Track", desc: "Middle school track and field group." }
];

// Load previously joined pools
const joinedPools = JSON.parse(localStorage.getItem('joinedPools')) || [];

// Populate the pool list
const poolList = document.getElementById('pool-list');

pools.forEach(pool => {
    // Create card elements
    const card = document.createElement('div');
    card.classList.add('card');

    const content = document.createElement('div');
    content.classList.add('content');

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = pool.name;

    const back = document.createElement('div');
    back.classList.add('back');

    const description = document.createElement('p');
    description.textContent = pool.desc;

    const joinBtn = document.createElement('button');
    joinBtn.classList.add('join-btn');
    joinBtn.textContent = joinedPools.includes(pool.name) ? "Joined" : "Join";
    if (joinedPools.includes(pool.name)) joinBtn.classList.add("joined");

    // Flip card on click
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    // Handle join/unjoin functionality
    joinBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent flipping when clicking the button

        if (joinedPools.includes(pool.name)) {
            // Remove from joined pools
            const index = joinedPools.indexOf(pool.name);
            joinedPools.splice(index, 1);
            joinBtn.textContent = "Join";
            joinBtn.classList.remove("joined");
        } else {
            // Add to joined pools
            joinedPools.push(pool.name);
            joinBtn.textContent = "Joined";
            joinBtn.classList.add("joined");
        }

        // Save to localStorage
        localStorage.setItem('joinedPools', JSON.stringify(joinedPools));
    });

    // Append elements
    back.appendChild(description);
    back.appendChild(joinBtn);
    content.appendChild(front);
    content.appendChild(back);
    card.appendChild(content);
    poolList.appendChild(card);
});

// Go to Home Button
document.getElementById('go-home').addEventListener('click', () => {
    window.location.href = "home.html"; // Redirects to Home
});
