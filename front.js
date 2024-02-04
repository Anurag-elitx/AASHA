const scrollBtns = document.querySelectorAll('.scroll-btn');

scrollBtns.forEach(btn => {
    btn.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('data-target');
    const targetSection = document.querySelector(targetId);

    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });
}
