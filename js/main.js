'use strict';

(function showDate() {
    const now = new Date();
    const dateArea = document.querySelector('.date');
    dateArea.textContent = now.toLocaleDateString('en');
})();
