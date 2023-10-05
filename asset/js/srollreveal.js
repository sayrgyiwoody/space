ScrollReveal({
    // reset:true,
    distance : '100px',
    opacity: 0,
    duration: 1500,
    delay:400,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset : true,

});

// scroll animation for landing page
ScrollReveal().reveal('.left-box , .recommend-title, .latest-title',{ delay : 500 , origin : 'left',interval : 200});
ScrollReveal().reveal('.right-box',{delay : 600 , origin : 'bottom',distance : '50px'});
ScrollReveal().reveal('.navbar-brand,.swiper-wrapper',{delay : 700 , origin : 'left'});
; 

