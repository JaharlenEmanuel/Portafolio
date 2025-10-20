function inicializarMenuMovil() {
    let menuToggle = document.getElementById('menu-toggle');
    let menuClose = document.getElementById('menu-close');
    let mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}
export { inicializarMenuMovil }