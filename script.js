document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.querySelector(".nav-container");
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeToggle = document.querySelector(".theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");
    const progressBar = document.querySelector(".progress-bar");
    const THEME_KEY = "theme";

    const closeNavMenu = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", (event) => {
            if (!navMenu.classList.contains("active")) return;
            if (!navContainer?.contains(event.target)) {
                closeNavMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 860) {
                closeNavMenu();
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) {
                closeNavMenu();
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                closeNavMenu();
                return;
            }

            event.preventDefault();
            const headerHeight = document.querySelector(".header")?.offsetHeight ?? 0;
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
            closeNavMenu();
        });
    });

    if (themeToggle) {
        const applyTheme = (theme) => {
            const isDark = theme === "dark";
            document.body.classList.toggle("dark-mode", isDark);
            themeToggle.setAttribute("aria-pressed", String(isDark));
            themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
            themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";

            if (themeIcon) {
                themeIcon.classList.toggle("fa-moon", !isDark);
                themeIcon.classList.toggle("fa-sun", isDark);
            }
        };

        const savedTheme = localStorage.getItem(THEME_KEY);
        const initialTheme = savedTheme === "dark" || savedTheme === "light"
            ? savedTheme
            : "dark";

        applyTheme(initialTheme);

        themeToggle.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem(THEME_KEY, nextTheme);
        });
    }

    const updateScrollProgress = () => {
        if (!progressBar) return;

        const scrollTop = window.scrollY;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const sections = Array.from(document.querySelectorAll("main section")).filter(
            (section) => !section.classList.contains("hero")
        );

        sections.forEach((section) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(20px)";
            section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        sections.forEach((section) => observer.observe(section));
    }
});
