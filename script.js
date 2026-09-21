/* =====================================================
   C. PRABHU — UI/UX PORTFOLIO
   FINAL JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const html = document.documentElement;

    const themeToggle =
        document.getElementById("theme-toggle");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const scrollTop =
        document.getElementById("scroll-top");


    /* =================================================
       THEME
    ================================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        html.classList.remove("dark");

    } else {

        html.classList.add("dark");

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            html.classList.toggle("dark");

            const currentTheme =
                html.classList.contains("dark")
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "portfolio-theme",
                currentTheme
            );

        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("show");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        /* CLOSE MENU WHEN LINK IS CLICKED */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =================================================
       CLOSE MOBILE MENU OUTSIDE
    ================================================= */

    document.addEventListener("click", (event) => {

        if (
            !navMenu ||
            !menuToggle ||
            !navMenu.classList.contains("show")
        ) {
            return;
        }

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("show");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        }

    });


    /* =================================================
       SCROLL TO TOP BUTTON
    ================================================= */

    const handleScroll = () => {

        if (!scrollTop) {
            return;
        }

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    if (scrollTop) {

        scrollTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbar =
                    document.querySelector(".navbar");

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =================================================
       PARTICLES
    ================================================= */

    if (
        typeof tsParticles !== "undefined" &&
        document.getElementById("tsparticles")
    ) {

        tsParticles.load("tsparticles", {

            particles: {

                number: {
                    value: 35,
                    density: {
                        enable: true,
                        area: 1000
                    }
                },

                color: {
                    value: [
                        "#b46cff",
                        "#6675ff"
                    ]
                },

                opacity: {
                    value: 0.25
                },

                size: {
                    value: {
                        min: 1,
                        max: 3
                    }
                },

                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                },

                links: {
                    enable: false
                }

            },

            interactivity: {

                detectsOn: "window",

                events: {

                    resize: true

                }

            },

            detectRetina: true

        }).catch(() => {

            /* Particle effect is optional.
               Portfolio continues working normally. */

        });

    }


    /* =================================================
       IMAGE ERROR HANDLING
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener("error", () => {

                image.classList.add("image-error");

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            });

        });


    /* =================================================
       KEYBOARD ACCESSIBILITY
    ================================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                navMenu &&
                navMenu.classList.contains("show")
            ) {

                navMenu.classList.remove("show");

            }

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            }

        }

    });

});