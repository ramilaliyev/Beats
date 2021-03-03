;(function(){

    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.overlay');
    const body = document.querySelector('body');
    
    const menuLink = document.querySelectorAll('.menu__link');
    
    hamburger.addEventListener('click', e => {
        hamburger.classList.toggle('hamburger--active');
        overlay.classList.toggle('overlay--active');
        body.classList.toggle('body--active-menu');
    });
    
    menuLink.forEach(e => {
        e.addEventListener('click', el => {
            hamburger.classList.toggle('hamburger--active');
            overlay.classList.toggle('overlay--active');
            body.classList.toggle('body--active-menu');
    
        });
        
    });
    
})()
