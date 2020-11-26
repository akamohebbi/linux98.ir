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