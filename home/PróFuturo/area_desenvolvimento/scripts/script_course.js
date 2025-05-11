$(document).ready(function() {

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80 
            }, 600);
        }
    });

    ScrollReveal().reveal('.itens', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.included-item', {
        origin: 'bottom',
        duration: 2000,
        distance: '15%'
    });

});