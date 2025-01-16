// List of pools with descriptions
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

// Load previously joined pools from Local Storage
const joinedPools = JSON.parse(localStorage.getItem('joinedPools')) || [];

// Get DOM elements
const poolCard = document.getElementById("pool-card");
const poolName = document.getElementById("pool-name");
const poolDescription = document.getElementById("pool-description");
const joinPoolBtn = document.getElementById("join-pool-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Current pool index
let currentPoolIndex = 0;

// Function to Load Current Pool
const loadPool = () => {
    const pool = pools[currentPoolIndex];
    poolName.textContent = pool.name;
    poolDescription.textContent = pool.desc;

    // Update button text based on join status
    if (joinedPools.includes(pool.name)) {
        joinPoolBtn.textContent = "Joined";
        joinPoolBtn.classList.add("joined");
    } else {
        joinPoolBtn.textContent = "Join";
        joinPoolBtn.classList.remove("joined");
    }
};

// Function to Flip Card
poolCard.addEventListener("click", () => {
    poolCard.classList.toggle("flipped");
});

// Function to Navigate to the Previous Pool
prevBtn.addEventListener("click", () => {
    if (currentPoolIndex > 0) {
        currentPoolIndex--;
        poolCard.classList.remove("flipped"); // Reset flip
        loadPool();
    }
});

// Function to Navigate to the Next Pool
nextBtn.addEventListener("click", () => {
    if (currentPoolIndex < pools.length - 1) {
        currentPoolIndex++;
        poolCard.classList.remove("flipped"); // Reset flip
        loadPool();
    }
});

// Function to Join/Unjoin a Pool
joinPoolBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent flipping when clicking the button

    const pool = pools[currentPoolIndex].name;

    if (joinedPools.includes(pool)) {
        // Remove from joined pools
        const index = joinedPools.indexOf(pool);
        joinedPools.splice(index, 1);
        joinPoolBtn.textContent = "Join";
        joinPoolBtn.classList.remove("joined");
    } else {
        // Add to joined pools
        joinedPools.push(pool);
        joinPoolBtn.textContent = "Joined";
        joinPoolBtn.classList.add("joined");
    }

    // Save the updated joined pools list in Local Storage
    localStorage.setItem('joinedPools', JSON.stringify(joinedPools));
});

// Function to Redirect to Home Page
document.getElementById("go-home").addEventListener("click", () => {
    window.location.href = "home.html";
});

// Initial Load
loadPool();
