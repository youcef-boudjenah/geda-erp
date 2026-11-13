/**
 * GEDA ERP Enterprise — Client Script
 * Handles real-time module search filter and video playback.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Real-time Search Filter on 16 Modules
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
                    countDisplay.textContent = `${visibleCount} module(s) sur ${totalRows}`;
                } else {
                    countDisplay.textContent = `${totalRows} modules d'exploitation`;
                }
            }
        });
    }

    // 2. Video Player
    const video = document.getElementById('heroVideo');
    if (video) {
        video.addEventListener('play', () => {
            video.classList.add('is-playing');
        });
    }
});
