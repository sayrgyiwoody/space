ScrollReveal({
    // reset:true,
    distance : '100px',
    opacity: 0,
    duration: 1500,
    delay:400,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset : true,

});

// learn now session scroll

ScrollReveal().reveal('',{delay:500 , origin : 'top',interval : 100,distance:'50px'}); 
ScrollReveal().reveal('.left-box , .recommend-title, .latest-title',{ delay : 500 , origin : 'left',interval : 200});
ScrollReveal().reveal('.right-box',{delay : 600 , origin : 'bottom',distance : '50px'});
ScrollReveal().reveal('',{delay : 500 , origin : 'bottom',distance : '70px',interval:200});
ScrollReveal().reveal('',{delay : 600 , origin : 'right',mobile:false});
ScrollReveal().reveal('.navbar-brand,.swiper-wrapper',{delay : 700 , origin : 'left'});
ScrollReveal().reveal('',{delay : 500 , origin : 'top'});
ScrollReveal().reveal('',{delay : 800 , origin : 'top'});
ScrollReveal().reveal('',{delay : 500 ,distance:'40px', origin : 'bottom',interval:200});

ScrollReveal().reveal('',{delay : 800 , origin : 'bottom',distance:'50px'});
ScrollReveal().reveal('',{delay : 600 , origin:'bottom',interval:100,});
ScrollReveal().reveal('',{delay : 700 , origin:'right',interval:100,mobile:false});
ScrollReveal().reveal('',{delay:500 , distance:'20px', opacity: 0,interval : 100}); 

ScrollReveal().reveal('',{delay : 600 , origin : 'bottom',distance:'50px',desktop:false});
ScrollReveal().reveal('',{delay : 700 , origin:'bottom',distance:'50px',interval:100,desktop:false});

; 

