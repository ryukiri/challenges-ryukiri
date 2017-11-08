/*
 * This file should contain code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to edit and delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */

var logoutButton = document.getElementById('logout');
var auth = firebase.auth();
var database = firebase.database();
var profileButton = document.getElementById('show-dialog');

profileButton.addEventListener('click', function (e) {
    var profileName = document.getElementById('profile-name');
    profileName.textContent = auth.currentUser.displayName;

    var saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function(e) {
        var user = firebase.auth().currentUser;
        var changeNameInput = document.getElementById('change-displayname').value;
        var changeEmailInput = document.getElementById('change-InputEmail').value;

        if (!changeNameInput || changeNameInput == auth.currentUser.displayName) {
            changeNameInput = auth.currentUser.displayName;
        }

        if (!changeEmailInput || changeEmailInput == auth.currentUser.email) {
            changeEmailInput = auth.currentUser.email;
        } else {
            user.updateEmail(changeEmailInput).then(function() {
                // Update successful.
                console.log(changeEmailInput);
            }).catch(function(error) {
                // An error happened.
                console.log(error);
            });
        }
        
        user.updateProfile({
            displayName: changeNameInput,
                            
        }).then(function() {
            // Profile updated successfully!
            var displayName = user.displayName;
            profileName.textContent = auth.currentUser.displayName;
            console.log(displayName);
        }, function(error) {
            // An error happened.
        });
        
    })

})

 logoutButton.addEventListener('click', function (e) {
    console.log(e);

    auth.signOut();
 });

var messagesList = document.getElementById("messages");
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

auth.onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        // Logged in
        var messages = database.ref('messages');
        
        // This event listener will be called for each item
        // that has been added to the list.
        // Use this to generate each chat message,
        // both on initial page load and whenver someone creates a new message.
        messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();

            var messageText = message.text;
            var timestamp = message.timestamp;
            var displayName = message.displayName;

            // Create ul element
            var messageUl = document.createElement('ul');
            messageUl.id = id;
            messageUl.classList.add('messageList');

            // Create message li
            var messageLi = document.createElement('li');
            messageLi.classList.add('message-controls');
            messageLi.classList.add('mdl-list__item');
            messageLi.classList.add('mdl-list__item--two-line');
            messageLi.classList.add('mdl-shadow--4dp');

            // Create primary list
            var messagePrime = document.createElement('span');
            messagePrime.classList.add('mdl-list__item-primary-content');

            // Create controls
            var controlsDiv = document.createElement('div');
            controlsDiv.classList.add('message-controls');

            // Create time stamp
            var messagesTime = document.createElement('span');
            messagesTime.classList.add('message-time');
            messagesTime.textContent = timeConverter(timestamp);

            // Create user name
            var messagesName = document.createElement('span');
            messagesName.classList.add('message-author');
            messagesName.textContent = '\t' + auth.currentUser.displayName;

             // Create message text
             var messageParagraph = document.createElement('p');
             messageParagraph.classList.add('message-text');
             messageParagraph.textContent = messageText;

             // Create user icon
             var messageIcon = document.createElement('i');
             messageIcon.classList.add('material-icons');
             messageIcon.classList.add('mdl-list__item-avatar');
             messageIcon.textContent = "person";
            /*var photoURL = "https://www.gravatar.com/avatar/" + md5(auth.currentUser.email);
            var messageIcon = document.createElement('img');
            messageIcon.src = photoURL;*/

            // Append controls to message div
            messagePrime.appendChild(controlsDiv);

            // Append messagesTime to message control
            controlsDiv.appendChild(messagesTime);

            // Append messagesName to message control
            controlsDiv.appendChild(messagesName);

            // Append user icon to message prime
            messagePrime.appendChild(messageIcon);

            // Append message text to message prime
            messagePrime.appendChild(messageParagraph);

            // Append message prime to message li
            messageLi.appendChild(messagePrime);

            // Append message li to message ul
            messageUl.appendChild(messageLi);
            messagesList.appendChild(messageUl);
        });

        // This event listener will be called whenever an item in the list is edited.
        // Use this to update the HTML of the message that was edited.
        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val();

        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;

        });
        
    } else {
        // Logged out
        window.location.href = 'index.html';
    }
});

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var user = auth.currentUser;
    var userId = user.uid;
    console.log(userId);

    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('messages');

    // Get the message the user entered
    var message = messageInput.value;

    // Create a new message and add it to the list.
    messages.push({
        displayName: user.displayName,
        userId: userId,
        text: message,
        timestamp: new Date().getTime() // unix timestamp in milliseconds
    })
    .then(function () {
        // message created succesfully
    })
    .catch(function(error) {
        // message not created succesfully
    });
});

var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
});