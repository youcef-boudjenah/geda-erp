/**
 * GEDA ERP Enterprise — Precision Client Script
 * Lenis Smooth Scroll Engine + Live 16-Module Search + Video Controls
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // 1. Lenis Smooth Scroll Engine
    // ------------------------------------------------------------------------
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.5,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Intercept anchor clicks for buttery smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        lenis.scrollTo(targetEl, { offset: -24 });
                    }
                }
            });
        });
    }

    // ------------------------------------------------------------------------
    // 2. Real-time Search Filter on 16 Modules Catalog
    // ------------------------------------------------------------------------
    const searchInput = document.getElementById('moduleSearchInput');
    const table = document.getElementById('modulesTable');
    const countDisplay = document.getElementById('catalogCount');

    if (searchInput && table) {
        const rows = table.querySelectorAll('tbody tr');
        const totalRows = rows.length;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            rows.forEach((row) => {
                const text = row.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            if (countDisplay) {
                if (query) {
                    countDisplay.textContent = `${visibleCount} module(s) sur ${totalRows}`;
                } else {
                    countDisplay.textContent = `${totalRows} modules d'exploitation`;
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    // 3. Hero Video Player Interaction
    // ------------------------------------------------------------------------
    const video = document.getElementById('heroVideo');
    if (video) {
        video.addEventListener('play', () => {
            video.classList.add('is-playing');
        });
    }
});
