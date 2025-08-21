import { initScrollAnimations } from './animations.js';
import { initActiveNav } from './navigation.js';
import { initCalculator } from './calculator.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollAnimations();
    initActiveNav();

    // Page-specific initializations
    if (document.getElementById('badsanierung-rechner')) {
        initCalculator();
    }

    if (document.querySelector('.gallery-grid')) {
        initGallery();
    }

    console.log("Traumbad Köln Webseite modular geladen.");
});
