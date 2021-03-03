;(function(){

        const list = document.querySelector('.goods__list');
        const widthContainer = document.querySelector('.goods__display').clientWidth;
        const leftBtn = document.querySelector('.goods__arrow-left');
        const rightBtn = document.querySelector('.goods__arrow-right');
        
        const goodsParamsBlock = document.querySelectorAll('.goods__params-list-block');

        var pos = 0;

        const itemsCount = list.children.length;
        const widthList = itemsCount * widthContainer;
        const transitionVal = widthList * -1 + widthContainer;

        leftBtn.addEventListener('click', e => {
            if (pos != 0) {
                pos += widthContainer;
                list.style.transform = `translateX(${pos}px)`;
                goodsParamsBlock.forEach(e => {
                    e.classList.remove('goods__params-list-block--active');
                });
            }
        });

        rightBtn.addEventListener('click', e => {
            if (pos != transitionVal) {
                pos -= widthContainer;
                list.style.transform = `translateX(${pos}px)`;
                goodsParamsBlock.forEach(e => {
                    e.classList.remove('goods__params-list-block--active');
                });
            }
        });

    
})()


