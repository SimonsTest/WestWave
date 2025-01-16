// Function to handle the redirection after the loader animation
function redirectToHome() {
    // Redirect to home.html after 3 seconds
    setTimeout(() => {
        window.location.href = "home.html";
    }, 3000); // Adjust the timing if needed
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    redirectToHome();
});
