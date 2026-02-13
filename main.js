const CONFIG = {
    mobileBreakpoint: 860,
    themeStorageKey: "theme",
    articlesDataPath: "data/articles.json"
};

document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        header: document.querySelector(".header"),
        navContainer: document.querySelector(".nav-container"),
        navToggle: document.querySelector(".nav-toggle"),
        navMenu: document.querySelector(".nav-menu"),
        themeToggle: document.querySelector(".theme-toggle"),
        progressBar: document.querySelector(".progress-bar"),
        articlesPanel: document.querySelector("#articles-panel")
    };

    initNavigation(elements);
    initThemeToggle(elements.themeToggle);
    initScrollProgress(elements.progressBar);
    initSectionReveal();
    void initArticlesPanel(elements.articlesPanel, CONFIG.articlesDataPath);
});

function initNavigation({ header, navContainer, navToggle, navMenu }) {
    if (!navToggle || !navMenu) return;

    const closeNavMenu = () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.addEventListener("click", (event) => {
        const eventTarget = event.target instanceof Element ? event.target : null;
        const link = eventTarget?.closest(".nav-link");
        if (!link) return;

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
        const headerHeight = header?.offsetHeight ?? 0;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        closeNavMenu();
    });

    document.addEventListener("click", (event) => {
        const eventTarget = event.target instanceof Node ? event.target : null;
        if (!navMenu.classList.contains("active")) return;
        if (!eventTarget || !navContainer?.contains(eventTarget)) {
            closeNavMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > CONFIG.mobileBreakpoint) {
            closeNavMenu();
        }
    });
}

function initThemeToggle(themeToggle) {
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector("i");

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

    const savedTheme = localStorage.getItem(CONFIG.themeStorageKey);
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : (prefersDarkTheme ? "dark" : "light");

    applyTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(CONFIG.themeStorageKey, nextTheme);
    });
}

function initScrollProgress(progressBar) {
    if (!progressBar) return;

    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    };

    let rafId = null;
    const queueProgressUpdate = () => {
        if (rafId !== null) return;

        rafId = window.requestAnimationFrame(() => {
            updateScrollProgress();
            rafId = null;
        });
    };

    window.addEventListener("scroll", queueProgressUpdate, { passive: true });
    window.addEventListener("resize", queueProgressUpdate);
    queueProgressUpdate();
}

function initSectionReveal() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

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

async function initArticlesPanel(panel, dataPath) {
    if (!panel) return;

    setPanelStatus(panel, "Loading posts...");

    try {
        const response = await fetch(dataPath, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const articles = Array.isArray(payload?.articles) ? payload.articles : [];
        renderArticles(panel, articles);
    } catch (error) {
        console.error("Failed to load articles.json", error);
        setPanelStatus(panel, "Unable to load blog posts right now.", true);
    }
}

function renderArticles(panel, articles) {
    const validArticles = articles.filter(
        (article) => typeof article?.title === "string" && typeof article?.url === "string"
    );

    if (!validArticles.length) {
        setPanelStatus(panel, "No blog posts available yet.");
        return;
    }

    const fragment = document.createDocumentFragment();

    validArticles.forEach((article) => {
        const link = document.createElement("a");
        link.href = article.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = article.title;
        fragment.append(link);
    });

    panel.replaceChildren(fragment);
}

function setPanelStatus(panel, message, isError = false) {
    const status = document.createElement("p");
    status.className = isError ? "floating-x-status floating-x-status-error" : "floating-x-status";
    status.textContent = message;
    panel.replaceChildren(status);
}
