/**
 * GEDA ERP Enterprise — Landing Page Client Script
 * Handles real-time module search, mobile menu, video playback, and UX interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('open');
        });

        // Close menu on link click
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                navToggle.classList.remove('open');
            });
        });
    }

    // 2. Real-time Module Search in Pricing Table
    const searchInput = document.getElementById('moduleSearchInput');
    const table = document.getElementById('modulesTable');
    const countDisplay = document.getElementById('catalogCount');

    if (searchInput && table) {
        const rows = table.querySelectorAll('tbody tr');
        const totalRows = rows.length;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            rows.forEach(row => {
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
                    countDisplay.textContent = `${visibleCount} module(s) trouvé(s) pour "${query}"`;
                } else {
                    countDisplay.textContent = `Affichage de ${totalRows} modules sur ${totalRows}`;
                }
            }
        });
    }

    // 3. Video Player Enhancement
    const video = document.getElementById('gedaVideo');
    if (video) {
        video.addEventListener('play', () => {
            video.setAttribute('data-playing', 'true');
        });
        video.addEventListener('pause', () => {
            video.removeAttribute('data-playing');
        });
    }

    // 4. Download Notification Helper
    const downloadButtons = document.querySelectorAll('a[download]');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = btn.getAttribute('href').split('/').pop();
            console.log(`[GEDA ERP] Téléchargement démarré : ${fileName}`);
        });
    });

    // 5. Header Background on Scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.style.borderBottomColor = 'rgba(255, 255, 255, 0.16)';
            } else {
                header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            }
        }, { passive: true });
    }
});
