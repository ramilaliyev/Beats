;(function(){

    const goodsParamsBtn = document.querySelectorAll('.goods__params-btn');
    const goodsParamsBlock = document.querySelectorAll('.goods__params-list-block');
    
    goodsParamsBtn.forEach(e => {
        e.addEventListener('click', e => {
            goodsParamsBlock.forEach(e => {
                e.classList.toggle('goods__params-list-block--active');
            })
        });
    });

})()

