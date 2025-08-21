export function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentImageIndex;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = images[currentImageIndex];
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentImageIndex];
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImg.src = images[currentImageIndex];
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
