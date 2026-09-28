document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECT TARGET MODULE ENTITIES
    const targetSections = document.querySelectorAll(`
        .hero,
        .about-section,
        .achievements-section,
        .team-section,
        .tiers-section,
        .outreach-section,
        .contact-section,
        .robot-reveal-section
    `);

    // 2. CONFIGURE INTERSECTION WATCHER
    const revealOptions = {
        root: null, // Relative to browser viewport bounds
        threshold: 0.1, // Trigger as soon as 10% of the section is visible
        rootMargin: "0px 0px -40px 0px" // Triggers slightly before entry for responsiveness
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the animation wrapper class
                entry.target.classList.add("section-revealed");
                // Stop observing once revealed to optimize browser runtime performance
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // 3. ATTACH THE WATCHER TO ALL FOUND PANELS
    targetSections.forEach(section => {
        revealObserver.observe(section);
    });
});

// A quiet exit animation for links between pages in this site.
document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || destination.pathname === location.pathname || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(() => { location.href = destination.href; }, 160);
});
window.addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));

// Keep the theme choice across all six pages.
document.querySelectorAll('.theme-toggle').forEach((button) => {
    const render = () => {
        const dark = document.documentElement.dataset.theme === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        button.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
        button.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    };
    render();
    button.addEventListener('click', () => {
        const dark = document.documentElement.dataset.theme !== 'dark';
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
        try { localStorage.setItem('jw-theme', dark ? 'dark' : 'light'); } catch (e) {}
        render();
    });
});
