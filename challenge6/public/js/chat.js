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

 logoutButton.addEventListener('click', function (e) {
    console.log(e);

    auth.signOut();
 });

var messagesList = document.getElementById("messages");
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

auth.onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        // Logged in

        // Code to get and set values in the database

        // var testRef = database.ref('test2/test3');
        // testRef.set({
        //     property: 'Value'
        // })

        // var testRef = database.ref('test2/test3');
        // testRef.on('value', function(snapshot) {
        //     var val = snapshot.val();

        //     console.log(val);
        // });

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

            // Create li element
            var messageLi = document.createElement('li');
            messageLi.id = id;

            // Create controls
            var controlsDiv = document.createElement('div');
            controlsDiv.classList.add('message-controls');

            // Create message div
            var messageDiv = document.createElement('div');
            messageDiv.classList.add('message');

            // Create message text
            var messageParagraph = document.createElement('p');
            messageParagraph.classList.add('message-text');
            messageParagraph.textContent = messageText;

            // Append controls to message div
            messageDiv.appendChild(controlsDiv);

            // Append message text to message div
            messageDiv.appendChild(messageParagraph);

            // Append message div to message li
            messageLi.appendChild(messageDiv);

            //Append message li to message ul
            messagesList.appendChild(messageLi);
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
    console.log(user);

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