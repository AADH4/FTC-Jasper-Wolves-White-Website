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
