
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.classList.toggle("active", isOpen);
        });

        // Close the menu after clicking a navigation link.
        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        // Close the menu when the user clicks outside it.
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = mainNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }


    // =====================================
    // 2. AUTOMATIC FOOTER YEAR
    // =====================================

    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });


    // =====================================
    // 3. DYNAMIC CHANGING WORD
    // =====================================

    const changingWord =
        document.querySelector("#changing-word") ||
        document.querySelector("#dynamic-word") ||
        document.querySelector(".changing-word");

    if (changingWord) {

        const words = [
            "Community",
            "Opportunities",
            "Connections",
            "Possibilities",
            "Experiences",
            "Innovation"
        ];

        let wordIndex = 0;

        changingWord.style.transition = "opacity 0.35s ease";

        setInterval(() => {

            changingWord.style.opacity = "0";

            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;

                changingWord.textContent = words[wordIndex];
                changingWord.style.opacity = "1";

            }, 350);

        }, 2500);
    }


    // =====================================
    // 4. SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".feature-card, .product-card, .event-card, .opportunity-card, .split-content, .split-image, .showcase-content, .showcase-image"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // =====================================
    // 5. CONTACT FORM VALIDATION
    // =====================================

    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm && formFeedback) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            formFeedback.className = "form-feedback";
            formFeedback.textContent = "";

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                formFeedback.textContent =
                    "Please complete the required fields correctly.";

                formFeedback.classList.add("error");

                return;
            }

            const name = document
                .getElementById("contact-name")
                .value.trim();

            formFeedback.textContent =
                `Thank you, ${name}! Your message has passed the demo form validation. Actual message delivery will be available after backend integration.`;

            formFeedback.classList.add("success");

            contactForm.reset();

        });
    }

});
