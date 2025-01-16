// List of available pools
const pools = [
    { name: "Terra", description: "An exclusive group for deep discussions and research." },
    { name: "Tor", description: "A place for tech enthusiasts and coding experts." },
    { name: "Titus", description: "Leadership and mentorship community." },
    { name: "Triton", description: "A dynamic hub for competitive debate and public speaking." },
    { name: "Executive", description: "For student leaders managing key decisions." },
    { name: "Grades", description: "Study groups and academic resources." },
    { name: "Committees", description: "Organizational discussions and event planning." },
    { name: "All US", description: "General forum for all US students." },
    { name: "Announcement", description: "Stay updated with important school news." },
    { name: "Common Wealth", description: "A collaborative space for international students." },
    { name: "Baking", description: "Share recipes and baking tips with fellow food lovers." },
    { name: "Book", description: "Book club for literature lovers and authors." },
    { name: "Model UN", description: "Engage in international diplomacy and Model UN events." },
    { name: "Climbing", description: "A group for rock climbers and adventure seekers." },
    { name: "Yearbook", description: "Contribute to the school yearbook and capture memories." },
    { name: "Mandarin", description: "Learn and practice Mandarin together." },
    { name: "Quizbol", description: "For trivia and quiz bowl enthusiasts." },
    { name: "Community Service", description: "Organize and participate in charity events." },
    { name: "Debate", description: "Engage in structured debates and argumentation." },
    { name: "Cheer", description: "Cheerleading squad discussions and coordination." },
    { name: "Basketball", description: "Basketball news, training, and team discussions." },
    { name: "Cross Country", description: "Long-distance running and endurance training." },
    { name: "Track", description: "Sprint training and track & field competitions." },
    { name: "Volleyball", description: "For volleyball players and enthusiasts." },
    { name: "Middle School Basketball", description: "Basketball team for younger students." },
    { name: "MS Track", description: "Middle school track team coordination." }
];

// Elements
const cardContainer = document.querySelector(".card-container");
const joinedList = document.querySelector(".joined-list");
const leftBtn = document.querySelector(".nav-btn.left");
const rightBtn = document.querySelector(".nav-btn.right");

// Load joined pools from localStorage
let joinedPools = JSON.parse(localStorage.getItem("joinedPools")) || [];

// Function to update the joined pools section
function updateJoinedPools() {
    joinedList.innerHTML = "";
    if (joinedPools.length === 0) {
        joinedList.innerHTML = "<p>No pools joined yet.</p>";
    } else {
        joinedPools.forEach(pool => {
            const poolItem = document.createElement("div");
            poolItem.classList.add("pool-item");
            poolItem.textContent = pool;
            joinedList.appendChild(poolItem);
        });
    }
}

// Function to create pool cards
function createPoolCards() {
    cardContainer.innerHTML = "";
    pools.forEach((pool, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="content">
                <div class="front">
                    <div class="img">
                        <div class="circle"></div>
                        <div class="circle" id="right"></div>
                        <div class="circle" id="bottom"></div>
                    </div>
                    <div class="front-content">
                        <small class="badge">${index + 1} / ${pools.length}</small>
                        <div class="description">
                            <div class="title">
                                <p class="title"><strong>${pool.name}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back">
                    <div class="back-content">
                        <p>${pool.description}</p>
                        <button class="join-btn" data-pool="${pool.name}">
                            ${joinedPools.includes(pool.name) ? "Joined ✅" : "Join Pool"}
                        </button>
                    </div>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);
    });

    // Attach event listeners for join buttons
    document.querySelectorAll(".join-btn").forEach(button => {
        button.addEventListener("click", function () {
            const poolName = this.getAttribute("data-pool");

            if (!joinedPools.includes(poolName)) {
                joinedPools.push(poolName);
                this.textContent = "Joined ✅";
            }

            localStorage.setItem("joinedPools", JSON.stringify(joinedPools));
            updateJoinedPools();
        });
    });
}

// Carousel Navigation
let currentIndex = 0;

function showCurrentCard() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.display = index === currentIndex ? "block" : "none";
    });
}

// Left Button Click
leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = pools.length - 1; // Loop to last card
    }
    showCurrentCard();
});

// Right Button Click
rightBtn.addEventListener("click", () => {
    if (currentIndex < pools.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop to first card
    }
    showCurrentCard();
});

// Initialize
createPoolCards();
showCurrentCard();
updateJoinedPools();
