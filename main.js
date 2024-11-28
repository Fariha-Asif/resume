/*========= SHOW MENU ========*/
var showMenu = function (toggleId, navId) {
    var toggle = document.getElementById(toggleId), nav = document.getElementById(navId);
    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');
/*======= REMOVE MENU MOBILE =======*/
var navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    var navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu === null || navMenu === void 0 ? void 0 : navMenu.classList.remove('show-menu');
}
navLink.forEach(function (n) { return n.addEventListener('click', linkAction); });
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
var sections = document.querySelectorAll('section[id]');
function scrollActive() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (current) {
        var sectionHeight = current.offsetHeight;
        var sectionTop = current.offsetTop - 50;
        var sectionId = current.getAttribute('id');
        if (sectionId) {
            var link = document.querySelector(".nav__menu a[href*=\"".concat(sectionId, "\"]"));
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                }
                else {
                    link.classList.remove('active-link');
                }
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);
/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    var scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
        // When the scroll is higher than 560 viewport height, add the show-scroll class
        if (window.scrollY >= 200) {
            scrollTop.classList.add('show-scroll');
        }
        else {
            scrollTop.classList.remove('show-scroll');
        }
    }
}
window.addEventListener('scroll', scrollTop);
/*==============DARK LIGHT THEME========*/
var themeButton = document.getElementById('theme-button');
var darkTheme = 'dark-theme';
var iconTheme = 'bx-sun';
// Previously selected topic (if user selected)
var selectedTheme = localStorage.getItem('selected-theme');
var selectedIcon = localStorage.getItem('selected-icon');
// We obtain the current theme that the interface has by validating the dark-theme class
var getCurrentTheme = function () {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
};
var getCurrentIcon = function () {
    return (themeButton === null || themeButton === void 0 ? void 0 : themeButton.classList.contains(iconTheme)) ? 'bx-moon' : 'bx-sun';
};
// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton === null || themeButton === void 0 ? void 0 : themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}
// Activate / deactivate the theme manually with the button
themeButton === null || themeButton === void 0 ? void 0 : themeButton.addEventListener('click', function () {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton === null || themeButton === void 0 ? void 0 : themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});
/*============REDUCE THE SIZE AND PRINT ON AN A4 SHEET==========*/
function scaleCv() {
    document.body.classList.add('scale-cv');
}
/*=============REMOVE THE SIZE WHEN THE CV IS DOWNLOAD =========== */
function removeScale() {
    document.body.classList.remove('scale-cv');
}
/*=============GENERATE PDF=============*/
// PDF Generate area
var areaCv = document.getElementById('area-cv');
var resumeButton = document.getElementById("resume-button");
// Html2pdf options
var opt = {
    margin: 0,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};
function generateResume() {
    html2pdf(areaCv, opt);
}
// When the button is clicked, it executes the three function
resumeButton === null || resumeButton === void 0 ? void 0 : resumeButton.addEventListener('click', function () {
    // 1. The class .scale-cv is added to the body, where it releases the size of the body
    scaleCv();
    // 2. The PDF is generated
    generateResume();
    // 3. The scale cv class removed from the body after 5 seconds to return to normal size
    setTimeout(removeScale, 5000);
});
