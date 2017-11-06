/*
 * This file should contain code for the following tasks:
 * 1. Create a new account.
 * 2. Sign in an existing account.
 * 3. Redirect a user to chat.html once they are logged in/signed up.
 */

 var formLogin = document.getElementById('login-form');
 var emailLogin = document.getElementById('login-inputEmail');
 var passwordLogin = document.getElementById('login-inputPassword');

 var auth = firebase.auth();

 formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = emailLogin.value;
    var password = passwordLogin.value;

    console.log(email);
    console.log(password);

    //Display Loading Bar
    //loadingBar.style.display = 'block';

    auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {
            //loadingBar.style.display = "hidden";
            console.log(user);
            console.log("Logged in successfully.");
        })

        .catch(function (error) {
            console.log(error.message);
        });
 });

// Signup Stuff
var signupForm = document.getElementById('signup-form');
var displayNameInput = document.getElementById('signup-displayname');
var signupEmailInput = document.getElementById('signup-InputEmail');
var signupPasswordInput = document.getElementById('signup-InputPassword');
var signupConfirmPasswordInput = document.getElementById('signup-InputPasswordConfirm');

var isSigningUp = false;

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    isSigningUp = true;

    var email = signupEmailInput.value;
    var password = signupPasswordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(function (user) {
        console.log(user);

        // Set display name and photo url

        // Send verificatino email
        console.log('send email');

        // Redirect

        //window.location.href = 'chat.html';        
    })
    .catch(function (e) {
        // Display error messages
        console.log(error.message);
    });
});

auth.onAuthStateChanged(function(user) {
    if (user && !isSigningUp) {
        //User is logged in
        console.log("Logged in.");
        window.location.href = 'chat.html';
    } else {
        //User is not logged in
        console.log("Logged out.");
    }
});