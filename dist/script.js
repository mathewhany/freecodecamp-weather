$(document).ready(function () {
  loadWeather();
  
  $("#unit").on('change', function () {
    loadWeather();
  });
});

function loadWeather() {
  $.getJSON('https://ipinfo.io', function (data) {
    var q = data.city + ',' + data.country;
    var unit = getUnit();
    var appId = '8c2020911f5499fbe9f764a59ca4f21e';
    var api = 'https://api.openweathermap.org/data/2.5/weather?q=' + q + '&units=' + unit + '&appid=' + appId;

    $.getJSON(api, function (weather) {
      $('#city').text(weather.name + ',');
      $('#country').text(weather.sys.country);
      $('#temperature').html(weather.main.temp + '&deg;');
      changeIcon(weather.weather[0].main);
    });
  });
}

function getUnit() {
  return $('#unit input[name=unit]:checked').val() == 'f' ? 'imperial' : 'metric';
}

function changeIcon(weather) {
  var icon = '';
  var bg = '';
  
  switch (weather) {
    case 'Clear':
      icon = 'wi wi-day-sunny';
      bg = 'https://4.bp.blogspot.com/-Fqx-7w-IzDw/Vkgc47l82YI/AAAAAAAAAnk/N67h0pzMi0U/s1600/%25E0%25B4%25B5%25E0%25B4%25B8%25E0%25B5%2580%25E0%25B4%25B0%25E0%25B5%258D%25E2%2580%258D%25E0%25B4%258F%2B%25E0%25B4%259C%25E0%25B4%25A8%25E0%25B5%258D%25E0%25B4%25A8%25E0%25B4%25A4%25E0%25B5%258D%25E0%25B4%2589%25E0%25B4%25B2%25E0%25B5%258D%25E2%2580%258D%2B%25E0%25B4%25AB%25E0%25B4%25BF%25E0%25B4%25B0%25E0%25B5%258D%25E2%2580%258D%25E0%25B4%25A6%25E0%25B5%258C%25E0%25B4%25B8%25E0%25B5%258D.jpg';
      break;
    case 'Rain':
      icon = 'wi wi-rain';
      bg = 'https://images4.alphacoders.com/831/83196.jpg';
      break;
    case 'Clouds':
      icon = 'wi wi-cloudy';
      bg = 'http://weknowyourdreamz.com/images/cloud/cloud-05.jpg';
      break;
  }
  
  if (icon != '') $('#icon i').removeClass().addClass(icon);
  $('body').css('background-image', 'url(' + bg + ')');
}