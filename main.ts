

/*========= SHOW MENU ========*/
const showMenu = (toggleId:string, navId:string) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')


/*======= REMOVE MENU MOBILE =======*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu?.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');

function scrollActive(): void {
    const scrollY: number = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight: number = current.offsetHeight;
        const sectionTop: number = current.offsetTop - 50;
        const sectionId: string | null = current.getAttribute('id');

        if (sectionId) {
            const link = document.querySelector<HTMLAnchorElement>(
                `.nav__menu a[href*="${sectionId}"]`
            );

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);


/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(): void {
    const scrollTop: HTMLElement | null = document.getElementById('scroll-top');

    if (scrollTop) {
        // When the scroll is higher than 560 viewport height, add the show-scroll class
        if (window.scrollY >= 200) {
            scrollTop.classList.add('show-scroll');
        } else {
            scrollTop.classList.remove('show-scroll');
        }
    }
}

window.addEventListener('scroll', scrollTop);

/*==============DARK LIGHT THEME========*/

const themeButton = document.getElementById('theme-button') as HTMLElement | null;
const darkTheme: string = 'dark-theme';
const iconTheme: string = 'bx-sun';

// Previously selected topic (if user selected)
const selectedTheme: string | null = localStorage.getItem('selected-theme');
const selectedIcon: string | null = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = (): string => 
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = (): string => 
  themeButton?.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton?.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton?.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton?.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});


/*============REDUCE THE SIZE AND PRINT ON AN A4 SHEET==========*/
function scaleCv(){
    document.body.classList.add('scale-cv')
}

/*=============REMOVE THE SIZE WHEN THE CV IS DOWNLOAD =========== */
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/*=============GENERATE PDF=============*/
// PDF Generate area
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById("resume-button")

// Html2pdf options
let opt = {
    margin:       0,
    filename:     'myResume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
  };

// Function to call areaCv and Html2Pdf options
declare const html2pdf: any;

function generateResume(){    
    html2pdf(areaCv, opt)
}

// When the button is clicked, it executes the three function
resumeButton?.addEventListener('click', () => {

    // 1. The class .scale-cv is added to the body, where it releases the size of the body
    scaleCv()

    // 2. The PDF is generated
    generateResume()

     // 3. The scale cv class removed from the body after 5 seconds to return to normal size

     setTimeout(removeScale, 5000)

})
    


    


   