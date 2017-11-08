var leftButton = document.getElementById('left');
var rightButton = document.getElementById('right');
var dot1 = document.getElementById('dot1');
var dot2 = document.getElementById('dot2');
var dot3 = document.getElementById('dot3');
var dot4 = document.getElementById('dot4');
var slides = document.querySelector('.slides');

var index = 0;
var max = 3

leftButton.addEventListener('click', function (e) {
    console.log(e);

    if (index > 0) {
        index--;
    } else {
        index = 3;
    }

    updateSlidesPosition();
});

rightButton.addEventListener('click', function (e) {
    console.log(e);

    if (index < max) {
        index++;
    } else {
        index = 0;
    }
    
    updateSlidesPosition();
});

dot1.addEventListener('click', function (e) {
    console.log(e);

    index = 0;
    
    updateSlidesPosition();
});

dot2.addEventListener('click', function (e) {
    console.log(e);

    index = 1;
    
    updateSlidesPosition();
});

dot3.addEventListener('click', function (e) {
    console.log(e);

    index = 2;
    
    updateSlidesPosition();
});

dot4.addEventListener('click', function (e) {
    console.log(e);

    index = 3;
    
    updateSlidesPosition();
});

function updateSlidesPosition() {
    slides.style.left = -1 * index * 100 + '%';
}

// For keyboard navigation
$(document).keydown( function(eventObject) {
    if(eventObject.which==37) {//left arrow
        if (index > 0) {
            index--;
        } else {
            index = 3;
        }
    
        updateSlidesPosition();//emulates click on prev button 
    } else if(eventObject.which==39) {//right arrow
        if (index < max) {
            index++;
        } else {
            index = 0;
        }
        
        updateSlidesPosition();//emulates click on next button
    }
} );

$('#carousel-example-generic').on('slid.bs.carousel', function (event) {
    var nextactiveslide = $(event.relatedTarget).index();
    var $btns = $('.dots');
    var $active = $btns.find("[data-slide-to='" + nextactiveslide + "']");
    $btns.find('.dot').removeClass('active');
    $active.find('.dot').addClass('active');
});