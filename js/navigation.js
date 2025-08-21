export function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length === 0) return;

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
}
