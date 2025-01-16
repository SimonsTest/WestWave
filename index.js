<script>
    // Redirect to Loader.html after form submission
    function redirectToLoader(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        window.location.href = "Loader.html"; // Redirect to the loader page
    }

    // Optional: Add form validation
    function validateForm(event) {
        const form = event.target;
        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="password"]');

        // Check if fields are empty
        if (!emailInput.value || !passwordInput.value) {
            alert("All fields are required!");
            event.preventDefault(); // Stop submission
            return false;
        }

        // Validate email format
        if (!emailInput.value.includes("@")) {
            alert("Please enter a valid email address.");
            event.preventDefault(); // Stop submission
            return false;
        }

        // If all checks pass, proceed to loader
        redirectToLoader(event);
    }

    // Attach validation to the forms
    document.addEventListener("DOMContentLoaded", () => {
        // Select all forms on the page
        const forms = document.querySelectorAll(".flip-card__form");

        // Add the validateForm function to each form's submit event
        forms.forEach((form) => {
            form.addEventListener("submit", validateForm);
        });
    });
</script>
