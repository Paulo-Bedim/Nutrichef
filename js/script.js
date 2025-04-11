document.addEventListener('DOMContentLoaded', () => {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if(hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if(dropdownMenu && !e.target.closest('.menu-container')) {
            dropdownMenu.classList.remove('active');
        }
    });
});