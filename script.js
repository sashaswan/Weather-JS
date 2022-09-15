// API https://openweathermap.org/api

let key = ['Your Api Key'];

let fourData = {
    country: '.country-4',
    city: '.city-4',
    temp: '.temp-4',
    humidity: '.humidity-4',
    pressure: '.pressure-4',
    date: '.date',
    weather: '.weather-i',
    description: '.weather-4',
}

function time(unixTimestamp) {
    let a = new Date(unixTimestamp * 1000);
    let hours = a.getHours();
    let minutes = "0" + a.getMinutes();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let formattedTime = date + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes.substr(-2);
    return formattedTime;
}

let id = document.getElementById('s1');
id.addEventListener('change', () => {
    new Promise((resolve, reject) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id.value}&appid=${key}&units=metric`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                    document.querySelector('.package-name').innerHTML = data.name;
                    document.querySelector('.price').innerHTML = Math.round(data.main.temp) + '&deg;';
                    document.querySelector('.disclaimer').textContent = data.weather[0]['description'];
                    document.querySelector('.features li').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
                    document.querySelector('.country').textContent = data.sys.country;
                    document.querySelector('.feel').innerHTML = Math.round(data.main.feels_like) + '&deg;';
                    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
                    document.querySelector('.pressure').innerHTML = data.main.pressure + ' atm';
                    document.querySelector('.sunrise').innerHTML = time(data.sys.sunrise);
                    document.querySelector('.sunset').innerHTML = time(data.sys.sunset);
            })
            .catch(err => console.error(err))
    })
    new Promise((resolve, reject) => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id.value}&appid=${key}&units=metric`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                document.querySelector('.range').oninput = () => {
                    arr = [];
                    let newVal = +document.querySelector('.range').value;
                    arr[0] = newVal;
                    let multi = new Multi(
                        `${fourData.temp}`,
                        `${fourData.humidity}`,
                        `${fourData.pressure}`,
                        `${fourData.date}`,
                        `${fourData.weather}`,
                        `${fourData.description}`,
                        `${data.list[arr[0]].main.temp}`,
                        `${data.list[arr[0]].main.humidity}`,
                        `${data.list[arr[0]].main.pressure}`,
                        `${data.list[arr[0]].dt}`,
                        `${data.list[arr[0]].weather[0]['icon']}`,
                        `${data.list[arr[0]].weather[0]['description']}`
                    );
                    multi.draw();
                    return arr;
                }
            })
            .catch(err => console.error(err))
    })
})