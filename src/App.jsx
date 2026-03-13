import { useCallback, useEffect, useState } from 'react';
import {
  THEME_KEY,
  blogPosts,
  certifications,
  contacts,
  coreConcepts,
  education,
  experience,
  nav,
  projects,
  summaryParagraphs,
  technicalSkills,
} from './data/portfolioData';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
  } catch {
    // no-op: default to dark theme if storage is unavailable
  }

  return 'dark';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [openExperiences, setOpenExperiences] = useState(() =>
    experience.map(() => true)
  );
  const currentYear = new Date().getFullYear();
  const contributionColor = '5a6d45'; // Use same color palette for both themes

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // no-op: allow rendering even when storage is blocked
    }
  }, [theme]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.section, .reveal');
    if (targets.length === 0) {
      return undefined;
    }

    if (typeof window.IntersectionObserver === 'undefined') {
      targets.forEach((target) => target.classList.add('in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleExperience = useCallback((index) => {
    setOpenExperiences((currentState) =>
      currentState.map((currentOpenState, currentIndex) =>
        currentIndex === index ? !currentOpenState : currentOpenState
      )
    );
  }, []);

  const toggleBlog = useCallback(() => {
    setIsBlogOpen((currentState) => !currentState);
  }, []);

  const closeBlog = useCallback(() => {
    setIsBlogOpen(false);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <a href="#home" className="brand">
            Aman Raj
          </a>
          <div className="header-controls">
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((currentState) => !currentState)}
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
          <div className={`nav-wrap ${menuOpen ? 'open' : ''}`}>
            <nav id="primary-nav" aria-label="Primary">
              <ul className="nav-list">
                {nav.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} onClick={closeMenu}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="hero-name-row">
                <div className="portrait-wrap">
                  <img
                    src="/assets/img/me5.png"
                    alt="Aman Raj"
                    className="profile-photo"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="hero-name-text">
                  <h1>Aman Raj</h1>
                </div>
              </div>
              <p className="eyebrow">Software Engineer</p>
              <p className="tagline">
                A full-stack software engineer focused on scalable web apps,
                healthcare interoperability, and AI-powered products.
              </p>
              <div className="hero-social-chips">
                <a
                  className="social-chip"
                  href="https://github.com/amanKIIT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.simpleicons.org/github/c9cec5"
                    alt=""
                    aria-hidden="true"
                    className="social-chip-logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>GitHub</span>
                </a>
                <a
                  className="social-chip"
                  href="https://leetcode.com/amanKIIT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.simpleicons.org/leetcode/c9cec5"
                    alt=""
                    aria-hidden="true"
                    className="social-chip-logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>LeetCode</span>
                </a>
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#experience">
                  View Experience
                </a>
                <a className="button ghost" href="#projects">
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="summary" className="section">
          <div className="container">
            <h2>Professional Summary</h2>
            <div className="summary-grid">
              <article className="panel reveal">
                {summaryParagraphs.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </article>

              <div className="stack">
                <article className="panel reveal delay-1">
                  <h3>Technical Skills</h3>
                  <ul className="meta-list">
                    {technicalSkills.map(([label, value]) => (
                      <li key={label}>
                        <strong>{label}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="panel reveal delay-2">
                  <h3>Core Concepts</h3>
                  <div className="chip-grid">
                    {coreConcepts.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <h2>Professional Experience</h2>
            <div className="timeline">
              {experience.map((job, index) => {
                const isOpen = openExperiences[index] ?? true;

                return (
                  <article
                    className={`timeline-item reveal delay-${index % 3}`}
                    key={`${job.role}-${job.period}`}
                  >
                    <button
                      type="button"
                      className="experience-toggle"
                      onClick={() => toggleExperience(index)}
                      aria-expanded={isOpen}
                      aria-controls={`experience-panel-${index}`}
                      id={`experience-toggle-${index}`}
                    >
                      <div className="timeline-head">
                        <div>
                          <h3>{job.role}</h3>
                          <p className="timeline-org">{job.org}</p>
                        </div>
                        <div className="timeline-meta-wrap">
                          <p className="meta timeline-meta timeline-meta-date">
                            {job.period}
                          </p>
                          {job.location ? (
                            <p className="meta timeline-meta timeline-meta-location">
                              {job.location}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <span
                        className={`experience-chevron ${isOpen ? 'open' : ''}`}
                        aria-hidden="true"
                      >
                        ˅
                      </span>
                    </button>
                    <div
                      className={`experience-panel ${isOpen ? 'open' : ''}`}
                      id={`experience-panel-${index}`}
                      role="region"
                      aria-labelledby={`experience-toggle-${index}`}
                    >
                      <div className="experience-panel-inner">
                        <ul>
                          {job.highlights.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article
                  className={`project-card reveal delay-${index % 3} ${index % 4 === 0 ? 'project-feature' : ''}`}
                  key={project.title}
                >
                  <div className="project-media">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="project-fallback">Project</div>
                    )}
                  </div>
                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        GitHub Link
                      </a>
                    ) : (
                      <span className="muted">GitHub link not listed</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="github" className="section">
          <div className="container">
            <h2>GitHub Contributions</h2>
            <article className="panel github-panel reveal">
              <div>
                <p>
                  <a
                    href="https://github.com/amanKIIT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @amanKIIT
                  </a>
                </p>
              </div>
              <a
                href="https://github.com/amanKIIT"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://ghchart.rshah.org/${contributionColor}/amanKIIT`}
                  alt="GitHub contributions heatmap for amanKIIT"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </article>
          </div>
        </section>

        <section id="education" className="section">
          <div className="container">
            <h2>Education and Credentials</h2>
            <div className="education-grid">
              {education.map((item, index) => (
                <article className={`panel reveal delay-${index % 3}`} key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="meta">{item.meta}</p>
                  <p>{item.info}</p>
                </article>
              ))}
            </div>

            <div className="summary-grid extra-space">
              <article className="panel reveal">
                <h3>Certifications</h3>
                <ul>
                  {certifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="panel reveal delay-1">
                <h3>Additional Achievements</h3>
                <p>
                  Content Creator on YouTube and X (Aug 2021 - Present),
                  publishing educational content on AI, crypto, healthtech, and
                  macro finance.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2>Get In Touch</h2>
            <p className="contact-copy">
              Open to full-time software engineering opportunities, impactful
              product teams, and healthcare + AI projects.
            </p>
            <div className="contact-grid">
              {contacts.map(([type, label, href]) => (
                <a
                  key={type}
                  className="contact-card"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-type">{type}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>&copy; {currentYear} Aman Raj. Made with focus and consistency.</p>
          <button
            className="theme-toggle footer-theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
            <strong>{theme === 'light' ? '◐' : '◑'}</strong>
          </button>
        </div>
      </footer>

      <div className={`floating-blog ${isBlogOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="floating-blog-toggle"
          aria-label="Blog Posts"
          aria-controls="blog-posts-panel"
          aria-expanded={isBlogOpen}
          onClick={toggleBlog}
        >
          <span className="floating-blog-icon" aria-hidden="true">
            {'<'}
          </span>
          <span className="floating-blog-label">Blog Posts</span>
        </button>
        <div
          id="blog-posts-panel"
          className="floating-blog-panel"
          aria-hidden={!isBlogOpen}
        >
          <a
            className="floating-blog-source"
            href="https://x.com/f_sicc"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeBlog}
          >
            @f_sicc on X
          </a>
          <ul className="floating-blog-list">
            {blogPosts.map((article) => (
              <li key={article.url}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeBlog}
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
