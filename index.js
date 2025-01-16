<script>
    // Handle form submission with server interaction
    async function handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;

        try {
            // Send data to the server
            const response = await fetch('/api/auth', { // Replace '/api/auth' with your actual endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // If login/signup succeeds, redirect to the loader
                window.location.href = "Loader.html";
            } else {
                // Handle errors (e.g., invalid credentials)
                const errorData = await response.json();
                alert(errorData.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please check your connection and try again.");
        }
    }

    // Attach the new handler to forms
    document.addEventListener("DOMContentLoaded", () => {
        const forms = document.querySelectorAll(".flip-card__form");

        // Add the server interaction function to each form's submit event
        forms.forEach((form) => {
            form.addEventListener("submit", handleFormSubmit);
        });
    });
</script>
