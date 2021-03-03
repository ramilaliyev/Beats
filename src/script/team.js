;(function(){
    var btn = document.getElementsByClassName("team__item-title");
    var i;

    for (i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function() {
            var panel = this.nextElementSibling;
            var arrow = this.querySelector('.team__item-member-arrow');
            if (panel.style.height){
                panel.style.height = null;
                arrow.classList.remove('team__item-member-arrow--active');
            } else {
                var itemContent = document.getElementsByClassName('team__item-content');
                var arrowSign = document.getElementsByClassName('team__item-member-arrow');
                for (var i = 0; i < itemContent.length; i++) {
                    itemContent[i].style.height = null;
                    arrowSign[i].classList.remove('team__item-member-arrow--active');
                }
                arrow.classList.add('team__item-member-arrow--active');
                panel.style.height = panel.scrollHeight + "px";
            } 
        });
    }

})()