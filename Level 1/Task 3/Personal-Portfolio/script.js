/* =========================
   TYPING ANIMATION
========================= */

const typingElement = document.getElementById("typing");

const roles = [
    "Web Developer",
    "Programmer",
    "CSE Student",
    "Tech Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 100);

}


typeEffect();



/* =========================
   MOUSE GLOW
========================= */

const cursorGlow = document.querySelector(".cursor-glow");


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = event.clientX + "px";

    cursorGlow.style.top = event.clientY + "px";

});



/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


reveals.forEach((element) => {

    revealObserver.observe(element);

});



/* =========================
   SKILL BAR ANIMATION
========================= */

const skills = document.querySelectorAll(".skill");


const skillObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const progress =
                    entry.target.querySelector(".skill-progress");

                progress.style.width =
                    progress.getAttribute("data-width");

            }

        });

    },

    {
        threshold: 0.5
    }

);


skills.forEach((skill) => {

    skillObserver.observe(skill);

});



/* =========================
   COUNTER ANIMATION
========================= */

const counters =
    document.querySelectorAll("[data-target]");


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(counter.getAttribute("data-target"));

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 50));


        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target + (target === 100 ? "%" : "+");

                return;

            }

            counter.textContent =
                current + "+";

            setTimeout(updateCounter, 30);

        };


        updateCounter();

    });

}


const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(

        (entries) => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },

        {
            threshold: 0.4
        }

    );


statsObserver.observe(statsSection);



/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");


menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


document.querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

        });

    });



/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================
   BACK TO TOP
========================= */

const topButton =
    document.getElementById("top-btn");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =========================
   DARK / LIGHT MODE
========================= */

const themeButton =
    document.getElementById("theme-toggle");


let lightMode = false;


themeButton.addEventListener("click", () => {

    lightMode = !lightMode;


    if (lightMode) {

        document.body.style.background =
            "#f1f5f9";

        document.body.style.color =
            "#0f172a";

        themeButton.textContent = "🌙";

    } else {

        document.body.style.background =
            "#07111f";

        document.body.style.color =
            "#f8fafc";

        themeButton.textContent = "☀️";

    }

});