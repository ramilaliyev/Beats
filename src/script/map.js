;(function(){

    ymaps.ready(init);


    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            // 55.648174, 37.515560
            zoom: 10,
            controls: []
        });
    
    
        const coords = [
            [55.648174, 37.515560],
            [55.780588, 37.602391],
            [55.884499, 37.442994],
            [55.796673, 37.933492],
            [55.809535, 37.740911]
        ];
    
        const myCollection = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: './decor-icons/MapMark.svg',
            iconImageSize: [23, 29],
            iconImageOffset: [-35, -52]
          });
    
        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        })
        
        myMap.geoObjects.add(myCollection);
    
        myMap.behaviours.disable('scrollZoom');
    }
    
})()
