;(
    function(){
        var btn = document.getElementsByClassName("prod-menu__item-title");
        var i;
        var sectionTitle = document.querySelector('.prod-menu__title');
        for (i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", function() {
                var panel = this.nextElementSibling;
                
                if (panel.style.width){
                    panel.style.width = null;
                    panel.classList.remove('prod-menu__item-text--active');
                    sectionTitle.classList.remove('prod-menu__title--content-active');
                } else {
                    panel.classList.add('prod-menu__item-text--active');
                    sectionTitle.classList.add('prod-menu__title--content-active');
                    var itemContent = document.getElementsByClassName('prod-menu__item-text');
                    for (var i = 0; i < itemContent.length; i++) {
                        panel.classList.remove('prod-menu__item-text--active');
                        itemContent[i].style.width = null;
                    }
                    
                    const isMobile = window.matchMedia("(max-width: 768px)").matches;
                    const winWidth = window.innerWidth;
                    const titleWidth = this.clientWidth;
                    var textBlockWidth = winWidth - titleWidth * 3;
                    
                    if (isMobile) {
                        panel.style.width = textBlockWidth + "px";
                    } else {
                        panel.style.width = "524px";
                    }
                }
            });

        }
    }
)()
