angular.module('weather')

.constant('OpenWeatherConfig', {
   searchUrl: 'http://api.openweathermap.org/data/2.5/forecast?q=',
   units: '&units=metric',
   appid: '&appid=79f6fc6a804f526e2a5681a8ef65825c',
   imgUrl: 'http://openweathermap.org/img/w/' ,
   language: '&lang=fr'
})


/*Call 5 day / 3 hour forecast data*/
//api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml