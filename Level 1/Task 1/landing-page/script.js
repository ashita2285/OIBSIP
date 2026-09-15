// ==============================
// LOGIN POPUP
// ==============================

function openLogin() {
    document.getElementById("loginOverlay").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginOverlay").style.display = "none";
}


// ==============================
// LOGIN SYSTEM
// ==============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get entered details
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Get registered user
    const savedUser = JSON.parse(localStorage.getItem("lumiereUser"));

    // Check whether user exists
    if (!savedUser) {

        document.getElementById("loginMessage").textContent =
            "No account found. Please create an account first.";

        document.getElementById("loginMessage").style.color = "red";

        return;
    }

    // Check login details
    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        document.getElementById("loginMessage").textContent =
            "Login successful! Welcome to Lumière.";

        document.getElementById("loginMessage").style.color = "green";

        // Close popup after 1 second
        setTimeout(function() {

            closeLogin();

        }, 1000);

    } else {

        document.getElementById("loginMessage").textContent =
            "Incorrect email or password.";

        document.getElementById("loginMessage").style.color = "red";
    }

});
// ==============================
// SIGN UP
// ==============================

function openSignup() {

    // Close login popup
    closeLogin();

    // Open signup popup
    document.getElementById("signupOverlay").style.display = "flex";
}


function closeSignup() {

    document.getElementById("signupOverlay").style.display = "none";
}


const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;


    // Create user object

    const user = {

        name: name,

        email: email,

        password: password

    };


    // Save user

    localStorage.setItem(
        "lumiereUser",
        JSON.stringify(user)
    );


    // Show success message

    document.getElementById("signupMessage").textContent =
        "Account created successfully!";

    document.getElementById("signupMessage").style.color =
        "green";


    // Clear form

    signupForm.reset();


    // Close after 1.5 seconds

    setTimeout(function() {

        closeSignup();

        openLogin();

    }, 1500);

});