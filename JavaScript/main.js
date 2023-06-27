async function getApi (locaton='london')
{
    let respons = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=54fedd1776464a6f9be230731232206&q=${locaton}&days=3`);
    let responsJson = await respons.json();
    // console.log(responsJson.current.last_updated);
    await displayCurrentDay(responsJson);
    await displayNextDay(responsJson);
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function displayCurrentDay(responsJson)
{
    // curent Day
    const d = new Date(responsJson.current.last_updated);
    $('.day-one').text(days[d.getDay()]);
    $('.day-one-number').text(responsJson.current.last_updated);
    $(".city-one").text(responsJson.location.name);
    $('.high-degree-one').html(`${responsJson.current.temp_c}<sup>°</sup>C`);
    $('.icon img').attr('src',responsJson.current.condition.icon)
    $('.status-one').text(responsJson.current.condition.text);
    $('.humidity-icon p').text(`${responsJson.current.humidity}%`);
    $('.wind-icon p').text(`${responsJson.current.wind_kph}km/h`);
    $('.direction-icon p').text(responsJson.current.wind_dir);

}



function displayNextDay(responsJson)
{
    for (let i = 0; i < 2; i++) 
    {
        
        const d = new Date(responsJson.forecast.forecastday[i+1].date);
        $('.day-future').eq(i).text(days[d.getDay()]);
        $('.day-future-number').eq(i).text(responsJson.forecast.forecastday[i+1].date);
        $('.high-degree-future').eq(i).html(`${responsJson.forecast.forecastday[i+1].day.maxtemp_c}<sup>°</sup>C`);
        $('.low-degree-future').eq(i).html(`${responsJson.forecast.forecastday[i+1].day.mintemp_c}<sup>°</sup>C`);
        $('.icon-future img').eq(i).attr('src',responsJson.forecast.forecastday[i+1].day.condition.icon);
        $('.status-future').eq(i).text(responsJson.forecast.forecastday[i+1].day.condition.text);
        $('.humidity-icon-future p').eq(i).text(`${responsJson.forecast.forecastday[i+1].day.avghumidity}%`);
        $('.wind-icon-future p').eq(i).text(`${responsJson.forecast.forecastday[i+1].day.maxwind_kph}km/h`);
        $('.direction-icon-future p').eq(i).text(responsJson.forecast.forecastday[i+1].hour.wind_dir);
    }
    
}

$('#btn-search').click(function (e) { 
    let val= $('.search').val();
    if(val =='')
    {
        $('.error').removeClass('d-none')

    }
    else
    {
        getApi(val);
        $('.error').addClass('d-none')
    }
    
});

$('.search').keyup(function (e) { 
    let val= $('.search').val();
    getApi(val);
});


$('.search').keypress( function (e) {
    let val= $('.search').val();

    if (e.key == "Enter" && val =='')
    {
        $('.error').removeClass('d-none')
    }
    else
    {
        $('.error').addClass('d-none')
    }
    if (e.key == "Enter") {
        getApi(val);
    }

});
getApi();


$('.items').animate({height:'100%'},2000);


