document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Logic
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });

    // Active navigation link styling
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Handle root path for index.html
        if ((currentPath === '' || currentPath === 'index.html') && (linkPath === 'index.html')) {
            link.classList.add('active');
        } else if (linkPath === currentPath && currentPath !== 'index.html') {
            link.classList.add('active');
        }
    });

    console.log("Traumbad Köln Webseite geladen. Animationen und aktive Navigation initialisiert.");
});
