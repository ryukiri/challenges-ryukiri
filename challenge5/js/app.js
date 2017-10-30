// Go to https://api.nasa.gov/index.html#apply-for-an-api-key to get an API Key

var API_KEY = '7FqaprzYvA0Uk5DA7XQdy29LRHVVJJEPBg4M5Ymt';

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

function updatePage() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var data=xhr.responseText;
      var jsonResponse = JSON.parse(data);
      var link = jsonResponse["url"];
      var title = jsonResponse["title"];
      var explanation = jsonResponse["explanation"];

      //Display Title
      document.getElementById("title").innerHTML = title

      // Display daily image
      document.getElementById("image").src=link;

      // Display explanation
      document.getElementById("explanation").innerHTML = explanation
    }
  }
  xhr.open("GET", "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + "&date=" + date);
  xhr.send();
}
updatePage();

// Set max date for date picker
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("datefield").setAttribute("max", today);
document.getElementById("datefield").value = today;

// Respond to date changes
var el = document.getElementById('datefield');

if(el){  
  bar();  
  el.addEventListener('change', swapper, false);
}

function swapper() {
  var x = document.getElementById("datefield").value;
  date = x;  
  updatePage();
}

//Progress bar
function bar() {
  var progress = document.getElementById("bar");
  document.getElementById("image").addEventListener('load', function() {
    progress.style.visibility = "hidden";
    error();
  }, false); 
}

// Error handling
function error() {
  document.getElementById("image").addEventListener('error', notFound);
  document.getElementById("title").addEventListener('error', notFound);
  document.getElementById("explanation").addEventListener('error', notFound);
}

function notFound() {
  alert('Page did not load correctly.');
}