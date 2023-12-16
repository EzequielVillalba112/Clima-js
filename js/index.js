const container = document.querySelector('.container');
const search = document.querySelector('.box-search button');
const wheaterBox = document.querySelector('.wheater-box');
const wheaterDetails = document.querySelector('.weather-details');
const error404= document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const APIkey = 'ef1fdb0dd84921e7d4e1ccbf69bafe0a';
    const city = document.querySelector('.box-search input').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;

    if (city === '')
        return;

    fetch(url).then(response => response.json()).then(json => {
        if (json.cod === '404'){
            container.style.height = '400px';
            wheaterBox.style.display = 'none';
            wheaterDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fade-in');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fade-in');
        
        const image = document.querySelector('.wheater-box .img-weather');
        const temperature = document.querySelector('.wheater-box .temperature');
        const description = document.querySelector('.wheater-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        console.log(json.weather[0].main);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'ezequielvillalba112.github.io/Clima-js/img/clear.png';
                break;

            case 'Rain':
                image.src = 'ezequielvillalba112.github.io/Clima-js/img/rain.png';
                break;

            case 'Snow':
                image.src = 'ezequielvillalba112.github.io/Clima-js/img/snow.png';
                break;

            case 'Clouds':
                image.src = 'ezequielvillalba112.github.io/Clima-js/img/cloud.png';
                break;

            case 'Haze':
                image.src = 'ezequielvillalba112.github.io/Clima-js/img/mist.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}%`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        wheaterBox.style.display = '';
        wheaterDetails.style.display = '';
        wheaterBox.classList.add('fade-in');
        wheaterDetails.classList.add('fade-in');
        container.style.height = '590px';
    });
});
