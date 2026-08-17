// MOBILE MENU

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuButton.textContent = "×";
        } else {
            menuButton.textContent = "☰";
        }
    });

    const navItems = navMenu.querySelectorAll("a");

    navItems.forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
            menuButton.textContent = "☰";
        });
    });
}


// CURRENT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// CURSOR GLOW

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    document.addEventListener("mousemove", function (event) {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}


// SCROLL REVEAL

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


// COUNTERS

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;

    counters.forEach(function (counter) {

        const target = Number(counter.getAttribute("data-count"));
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.floor(target * easedProgress);

            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}


const statsSection = document.querySelector(".stats");

if (statsSection) {

    const statsObserver = new IntersectionObserver(
        function (entries) {

            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }

        },
        {
            threshold: 0.3
        }
    );

    statsObserver.observe(statsSection);
}


// PORTFOLIO FILTERS

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        filters.forEach(function (item) {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selectedCategory =
            filter.getAttribute("data-filter");

        projects.forEach(function (project) {

            const projectCategory =
                project.getAttribute("data-category");

            if (
                selectedCategory === "all" ||
                projectCategory === selectedCategory
            ) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        });
    });
});


// PROJECT MODAL

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.querySelector(".modal-backdrop");

projects.forEach(function (project) {

    project.addEventListener("click", function () {

        const title =
            project.getAttribute("data-title");

        const description =
            project.getAttribute("data-description");

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        if (modalDescription) {
            modalDescription.textContent = description;
        }

        if (modal) {
            modal.classList.add("active");
        }

        document.body.classList.add("modal-open");
    });
});


function closeModal() {

    if (modal) {
        modal.classList.remove("active");
    }

    document.body.classList.remove("modal-open");
}


if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
}


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


// ACTIVE NAVIGATION

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const navigationObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentSection =
                    entry.target.getAttribute("id");

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                    const linkTarget =
                        link.getAttribute("href");

                    if (
                        linkTarget === "#" + currentSection
                    ) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.3
    }
);


sections.forEach(function (section) {
    navigationObserver.observe(section);
});
