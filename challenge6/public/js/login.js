/*
 * This file should contain code for the following tasks:
 * 1. Create a new account.
 * 2. Sign in an existing account.
 * 3. Redirect a user to chat.html once they are logged in/signed up.
 */

 var formLogin = document.getElementById('login-form');
 var emailLogin = document.getElementById('login-inputEmail');
 var passwordLogin = document.getElementById('login-inputPassword');
 var loginError = document.getElementById('login-error');

 var auth = firebase.auth();

 function setLoginError(message) {
     loginError.textContent = message;
     loginError.classList.add('active');
 }

 formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = emailLogin.value;
    var password = passwordLogin.value;

    if (!email || !password) {
        setLoginError('Email and password are required');
    } else {

    auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {
            
        })

        .catch(function (error) {
            setLoginError(error.message);
        });
    }
 });

// Signup Stuff
var signupForm = document.getElementById('signup-form');
var displayNameInput = document.getElementById('signup-displayname');
var signupEmailInput = document.getElementById('signup-InputEmail');
var signupPasswordInput = document.getElementById('signup-InputPassword');
var signupConfirmPasswordInput = document.getElementById('signup-InputPasswordConfirm');
var signUpError = document.getElementById('signup-error');

var isSigningUp = false;

function setSignUpError(message) {
    signUpError.textContent = message;
    signUpError.classList.add('active');
}

function clearSignUpError() {
    signUpError.textContent = "";
    signUpError.classList.remove('active');
}

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    clearSignUpError();

    isSigningUp = true;

    var email = signupEmailInput.value;
    var password = signupPasswordInput.value;
    var passwordConfirm = signupConfirmPasswordInput.value;
    var displaynameValue = displayNameInput.value;

    if(!displaynameValue) {
        setSignUpError('Name is required');
    }else if(!email) {
        setSignUpError('Email is required');
    }else if (password != passwordConfirm) {
        setSignUpError('Passwords do not match');
    } else {
        auth.createUserWithEmailAndPassword(email, password)
        .then(function (user) {

            user.updateProfile({
                displayName: displaynameValue
            })
            .then(function () {
                return user.sendEmailVerification()
                .catch(function (verificationEmailError) {
                    // Display error messages
                })
                
            })
            .then(function () {
                window.location.href = 'chat.html';
            });

        })
        .catch(function (e) {
            // Display error messages
            setSignUpError(error.message);
        });
    }
});

auth.onAuthStateChanged(function(user) {
    if (user && !isSigningUp) {
        //User is logged in
        window.location.href = 'chat.html';
    } else {
        //User is not logged in
    }
});