;(function(){
    const reviewDisplay = e => {
        const reviews = document.getElementsByClassName('reviews__item');
        for (var i = 0; i <reviews.length; i++) {
            const dataLinked = reviews[i].getAttribute('data-linked');
            if (dataLinked === e) {
                reviews[i].classList.add('reviews__item--active');
            } else {
                reviews[i].classList.remove('reviews__item--active');
            }
        }
    }    

    

    const reviewsBtn = document.getElementsByClassName('reviews__switcher-item');
    for (var i = 0; i < reviewsBtn.length; i++) {
        reviewsBtn[i].addEventListener('click', e => {
            const dataLink = e.target.parentNode.getAttribute('data-link');
            reviewDisplay(dataLink);
        });
    }

    var swContainer = document.querySelector(".reviews__switcher");
    var swItems = swContainer.getElementsByClassName("reviews__switcher-item");

    for (var i = 0; i < swItems.length; i++) {
        swItems[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("reviews__switcher-item--active");
            current[0].className = current[0].className.replace(" reviews__switcher-item--active", "");
            this.className += " reviews__switcher-item--active";
        });
    }
})()