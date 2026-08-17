```javascript
/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuButton.textContent =
            navMenu.classList.contains("active")
                ? "×"
                : "☰";

    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });

}


/* =========================
   CURRENT YEAR
========================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

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


/* =========================
   COUNTERS
========================= */

const counters =
    document.querySelectorAll("[data-count]");

let countersStarted = false;

function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.count);

        let current = 0;

        const duration = 1300;

        const startTime = performance.now();

        function update(time) {

            const progress =
                Math.min(
                    (time - startTime) / duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.floor(target * eased);

            counter.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(update);

    });

}


const statsSection =
    document.querySelector(".stats");

if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            (entries) => {

                if (entries[0].isIntersecting) {

                    animateCounters();

                    statsObserver.disconnect();

                }

            },
            {
                threshold: 0.4
            }
        );

    statsObserver.observe(statsSection);

}


/* =========================
   PORTFOLIO FILTER
========================= */

const filters =
    document.querySelectorAll(".filter");

const projects =
    document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;

        projects.forEach(project => {

            const category =
                project.dataset.category;

            if (
                selected === "all" ||
                category === selected
            ) {

                project.classList.remove("hidden");

                setTimeout(() => {

                    project.style.opacity = "1";
                    project.style.transform =
                        "translateY(0)";

                }, 20);

            } else {

                project.classList.add("hidden");

            }

        });

    });

});


/* =========================
   PROJECT MODAL
========================= */

const modal =
    document.getElementById("projectModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalClose =
    document.getElementById("modalClose");

const modalBackdrop =
    document.querySelector(".modal-backdrop");

const modalLink =
    document.getElementById("modalLink");


projects.forEach(project => {

    project.addEventListener("click", () => {

        const title =
            project.dataset.title;

        const description =
            project.dataset.description;

        modalTitle.textContent = title;

        modalDescription.textContent =
            description;

        modalLink.href =
            project.querySelector("img")
                ?.src || "#";

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


function closeModal() {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}

if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeModal
    );

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const current =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute("href")
                            === `#${current}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(section => {

    navObserver.observe(section);

});


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

const magneticButtons =
    document.querySelectorAll(
        ".button.primary, .logo"
    );

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        const rect =
            button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});
```
