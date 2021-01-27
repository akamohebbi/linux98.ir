const AUTO_SLIDE_DURATION = 5000;

var current_slide_index = 1;

var slides = document.getElementsByClassName("slide");
var slider_pagination = document.getElementsByClassName("slider-pagination-btn");

function slider(index) {
    slides = document.getElementsByClassName("slide");
    slider_pagination = document.getElementsByClassName("slider-pagination-btn");

    current_slide_index = index;
    if (current_slide_index > slides.length) { current_slide_index = 1; }
    if (current_slide_index < 1) { current_slide_index = slides.length };
    
    console.log("next slide will be: " + current_slide_index);

    for (var i = 0; i < slides.length; i++) {
        slides[current_slide_index - 1].className = "slide";
        slides[i].style.display = "none";
        slider_pagination[i].style.opacity = "0.5";
    }

    slides[current_slide_index - 1].style.display = "block";
    slides[current_slide_index - 1].className = "slide animate__animated animate__fadeIn";
    slider_pagination[current_slide_index - 1].style.opacity = "1";
}


slider(current_slide_index);

var auto_slide_interval = setInterval(() => {
    slider(current_slide_index + 1);
}, AUTO_SLIDE_DURATION);


function next_slide_by_step(step) {
    slider(current_slide_index + step);
    reset_auto_slide_interval();
}


function next_slide_by_index(index) {
    if (index == current_slide_index) {
        slides[current_slide_index - 1].className = "slide animate__animated animate__shakeX";
        reset_auto_slide_interval();
        return;
    }
    slider(index);
    reset_auto_slide_interval();
}


function reset_auto_slide_interval() {
    clearInterval(auto_slide_interval);
    auto_slide_interval = setInterval(() => {
        slider(current_slide_index + 1);
    }, AUTO_SLIDE_DURATION);
}





var tgl_header_nav_mobile = document.getElementById("tgl_header_nav_mobile");
var page_header_nav_mobile = document.getElementById("page_header_nav_mobile");

const tgl_header_nav_mobile_CLASS_LIST = tgl_header_nav_mobile.classList;

var is_showing_mobile_nav = false;
tgl_header_nav_mobile.onclick = function() {
    if (is_showing_mobile_nav) {
        page_header_nav_mobile.style.display = "none";
        is_showing_mobile_nav = false;
    } else {
        page_header_nav_mobile.style.display = "block";
        is_showing_mobile_nav = true;
    }
};