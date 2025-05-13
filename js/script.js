document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    const expanded = document.querySelector('.hamburger').getAttribute('aria-expanded') === 'true';
    document.querySelector('.hamburger').setAttribute('aria-expanded', !expanded);
});