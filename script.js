/* =========================================================
   TUTUMEDIASTUDIO
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const navbar = document.querySelector("header");
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");
    const revealElements = document.querySelectorAll(".reveal");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {
        body.classList.add("page-loaded");
    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.startsWith("#!")
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar
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


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top;

            const sectionHeight =
                section.offsetHeight;

            if (
                sectionTop <= 180 &&
                sectionTop + sectionHeight > 180
            ) {
                currentSection = section.id;
            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.remove("active");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       STAGGER ANIMATIONS
    ===================================================== */

    const animatedGroups = [
        ".gear-item-new",
        ".gear-card",
        ".project-card",
        ".service-card"
    ];

    animatedGroups.forEach(selector => {

        const elements =
            document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * 70}ms`;

        });

    });


    /* =====================================================
       GEAR HOVER
    ===================================================== */

    const gearItems =
        document.querySelectorAll(".gear-item-new");

    gearItems.forEach(item => {

        item.addEventListener("mouseenter", () => {
            item.classList.add("gear-hover");
        });

        item.addEventListener("mouseleave", () => {
            item.classList.remove("gear-hover");
        });

    });


    /* =====================================================
       PORTFOLIO
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        /*
         * External project
         * Example: YouTube trailer
         */

        if (card.dataset.external === "true") {
            return;
        }


        /*
         * If the project is not external,
         * allow normal site behaviour.
         */

        card.addEventListener("click", event => {

            const link =
                card.getAttribute("href");

            if (!link || link === "#") {
                event.preventDefault();
            }

        });

    });


    /* =====================================================
       YOUTUBE PROJECTS
    ===================================================== */

    const youtubeProjects =
        document.querySelectorAll(
            '[data-external="true"]'
        );


    youtubeProjects.forEach(project => {

        project.addEventListener("click", event => {

            const url =
                project.getAttribute("href");

            if (!url) {
                return;
            }

            event.preventDefault();

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute(
                "loading",
                "lazy"
            );
        }

        image.addEventListener(
            "load",
            () => {
                image.classList.add("image-loaded");
            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            "#contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    contactForm.querySelector(
                        '[name="name"]'
                    )?.value.trim() || "";


                const email =
                    contactForm.querySelector(
                        '[name="email"]'
                    )?.value.trim() || "";


                const phone =
                    contactForm.querySelector(
                        '[name="phone"]'
                    )?.value.trim() || "";


                const description =
                    contactForm.querySelector(
                        '[name="description"]'
                    )?.value.trim() || "";


                if (!name || !email || !description) {

                    showFormMessage(
                        "Completează câmpurile obligatorii.",
                        "error"
                    );

                    return;

                }


                const subject =
                    encodeURIComponent(
                        `Proiect nou - ${name}`
                    );


                const message =
                    encodeURIComponent(
`Salut Ionuț,

Nume: ${name}
Email: ${email}
Telefon: ${phone}

Descriere proiect:
${description}`
                    );


                const mailto =
                    `mailto:tutumediastudio@gmail.com?subject=${subject}&body=${message}`;


                showFormMessage(
                    "Se deschide aplicația de email...",
                    "success"
                );


                setTimeout(() => {

                    window.location.href =
                        mailto;

                }, 500);

            }
        );

    }


    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    function showFormMessage(message, type) {

        let messageElement =
            document.querySelector(
                ".form-message"
            );


        if (!messageElement) {

            messageElement =
                document.createElement("div");

            messageElement.className =
                "form-message";


            if (contactForm) {

                contactForm.appendChild(
                    messageElement
                );

            }

        }


        messageElement.textContent =
            message;


        messageElement.className =
            `form-message ${type}`;


        setTimeout(() => {

            messageElement.classList.add(
                "show"
            );

        }, 10);

    }


    /* =====================================================
       INPUT FOCUS EFFECT
    ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".cinematic-field input, .cinematic-field textarea"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input
                    .closest(".cinematic-field")
                    ?.classList.add("focused");

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input
                    .closest(".cinematic-field")
                    ?.classList.remove("focused");

            }
        );

    });


    /* =====================================================
       MOUSE PARALLAX
       Desktop only
    ===================================================== */

    const gearBackground =
        document.querySelector(
            ".gear-bg-text"
        );


    if (
        gearBackground &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 12;


                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 12;


                gearBackground.style.transform =
                    `translate(${x}px, ${y}px)`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".cinematic-submit, .gear-mark, .arrow"
        );


    magneticElements.forEach(element => {

        if (
            !window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {
            return;
        }


        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(
                        ".modal.active"
                    )
                    .forEach(modal => {

                        modal.classList.remove(
                            "active"
                        );

                    });

            }

        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c TUTUMEDIASTUDIO ",
        "background:#FFD400;color:#000;font-weight:900;padding:6px 10px;"
    );

    console.log(
        "Website initialized successfully."
    );

});
