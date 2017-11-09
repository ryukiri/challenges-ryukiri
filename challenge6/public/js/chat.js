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
var changeInfoError = document.getElementById('change-error');

var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page);

function changeError(message) {
    changeInfoError.textContent = message;
    changeInfoError.classList.add('active');
}

function clearChangeError() {
    changeInfoError.textContent = "";
    changeInfoError.classList.remove('active');
}

profileButton.addEventListener('click', function (e) {
    var profileName = document.getElementById('profile-name');
    profileName.textContent = auth.currentUser.displayName;

    var saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function(e) {
        var user = firebase.auth().currentUser;
        var changeNameInput = document.getElementById('change-displayname').value;
        var changeEmailInput = document.getElementById('change-InputEmail').value;
        var changePasswordInput = document.getElementById('change-InputPassword').value;
        var changePasswordInputConfirm = document.getElementById('change-InputPasswordConfirm').value;
        
        if(changePasswordInput != changePasswordInputConfirm) {
            changeError('Passwords do not match.');
        } else {
            user.updatePassword(changePasswordInput).then(function() {
            // Update successful.
            console.log(changePasswordInput);
            clearChangeError();
            }).catch(function(error) {
            // An error happened.
            changeError(error);
            });
        }

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
                changeError(error);
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
        var messages = database.ref('messages').limitToLast(100);
        if (page == "music.html") {
            messages = database.ref('music').limitToLast(100);
        } else if(page == "random.html") {
            messages = database.ref('random').limitToLast(100);
        }

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
            messageLi.id = "messageList";
            messageLi.classList.add('mdl-shadow--4dp');

            // Create primary list
            var messagePrime = document.createElement('span');
            messagePrime.classList.add('mdl-list__item-primary-content');
            messagePrime.id = "controsl";

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

            // Create delete button 
            var messageDeleteButton = document.createElement('button');
            messageDeleteButton.classList.add('deleteMessage');
            messageDeleteButton.classList.add('mdl-button');
            messageDeleteButton.id = "show-dialog-delete";
            messageDeleteButton.type="button";
            messageDeleteButton.textContent = "Delete";

            messageDeleteButton.addEventListener('click', function (e) {
                var dialog = document.getElementById('delete-dialog');
                var showDialogButton = document.querySelector('#show-dialog-delete');
                if (! dialog.showModal) {
                  dialogPolyfill.registerDialog(dialog);
                }
                showDialogButton.addEventListener('click', function() {
                  dialog.showModal();
                });
                dialog.querySelector('.close').addEventListener('click', function() {
                  dialog.close();
                });
            })
             // Create message text
             var messageParagraph = document.createElement('p');
             messageParagraph.classList.add('message-text');
             messageParagraph.textContent = messageText;

             // Create user icon
             var md5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
             var photoURL = "https://www.gravatar.com/avatar/" + md5(auth.currentUser.email.trim().toLowerCase());

             var messageIcon = document.createElement('i');
             messageIcon.classList.add('mdl-list__item-avatar');
             var messageIconInside = document.createElement('img');
             messageIconInside.src = photoURL;
             messageIconInside.id = "pic";
             console.log(photoURL);

            // Append controls to message div
            messagePrime.appendChild(controlsDiv);

            // Append messagesTime to message control
            controlsDiv.appendChild(messagesTime);

            // Append messagesName to message control
            controlsDiv.appendChild(messagesName);

            // Append delete button to message control
            controlsDiv.appendChild(messageDeleteButton);

            // Append user icon to message prime
            messagePrime.appendChild(messageIcon);
            messageIcon.appendChild(messageIconInside);

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
    if (page == "music.html") {
        messages = database.ref('music');
    } else if(page == "random.html") {
        messages = database.ref('random');
    }
    
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
        messageInput.value = '';
    })
    .catch(function(error) {
        // message not created succesfully
        console.log(error);
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