
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const strengthFill = document.getElementById("strengthFill");
const strengthMessage = document.getElementById("strengthMessage");
const matchMessage = document.getElementById("matchMessage");
const resetButton = document.getElementById("resetButton");

// Password requirements
const rules = [
    {
        id: "length",
        test: value => value.length >= 8,
        text: "At least 8 characters"
    },
    {
        id: "uppercase",
        test: value => /[A-Z]/.test(value),
        text: "One uppercase letter"
    },
    {
        id: "lowercase",
        test: value => /[a-z]/.test(value),
        text: "One lowercase letter"
    },
    {
        id: "number",
        test: value => /[0-9]/.test(value),
        text: "One number"
    },
    {
        id: "special",
        test: value => /[^A-Za-z0-9]/.test(value),
        text: "One special character"
    }
];

// Check password strength while typing
function checkStrength() {
    const value = password.value;

    if (value === "") {
        strengthFill.style.width = "0%";
        strengthFill.style.background = "#9ca3af";
        strengthMessage.textContent =
            "Enter a password to check its strength";

        rules.forEach(rule => updateRule(rule, false));
        checkMatch();
        return;
    }

    let score = 0;

    rules.forEach(rule => {
        const passed = rule.test(value);

        if (passed) {
            score++;
        }

        updateRule(rule, passed);
    });

    if (score <= 2) {
        strengthMessage.textContent = "Weak Password";
        strengthFill.style.width = "33%";
        strengthFill.style.background = "#ef4444";
    } else if (score <= 4) {
        strengthMessage.textContent = "Medium Password";
        strengthFill.style.width = "66%";
        strengthFill.style.background = "#f59e0b";
    } else {
        strengthMessage.textContent = "Strong Password";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
    }

    checkMatch();
}

// Update requirement checklist
function updateRule(rule, passed) {
    const item = document.getElementById(rule.id);

    item.textContent = `${passed ? "✓" : "○"} ${rule.text}`;
    item.classList.toggle("valid", passed);
}

// Check if passwords match
function checkMatch() {
    const pass = password.value;
    const confirm = confirmPassword.value;

    matchMessage.className = "";

    if (confirm === "") {
        matchMessage.textContent = "";
    } else if (pass === confirm) {
        matchMessage.textContent = "✓ Passwords Match";
        matchMessage.classList.add("match");
    } else {
        matchMessage.textContent = "✗ Passwords Do Not Match";
        matchMessage.classList.add("no-match");
    }
}

// Show or hide password
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// Listen for input changes
password.addEventListener("input", checkStrength);
confirmPassword.addEventListener("input", checkMatch);

// Reset everything
resetButton.addEventListener("click", function () {
    password.value = "";
    confirmPassword.value = "";

    password.type = "password";
    togglePassword.textContent = "Show";

    checkStrength();
    checkMatch();
});

// Initialize the page
checkStrength();
