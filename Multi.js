class Multi {
    constructor(temp, humidity, pressure, date, weather, description,
        mainTemp, mainHumidity, mainPressure, dt, icon, descrpt, newVal) {

        this.temp = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        this.date = date;
        this.weather = weather;
        this.description = description;
        this.mainTemp = mainTemp;
        this.mainHumidity = mainHumidity;
        this.mainPressure = mainPressure;
        this.dt = dt;
        this.icon = icon;
        this.descrpt = descrpt;
        this.newVal = newVal;
    }
    draw() {
        document.querySelector(this.temp).innerHTML = Math.round(this.mainTemp) + '&deg;';
        document.querySelector(this.humidity).textContent = this.mainHumidity + '%';
        document.querySelector(this.pressure).textContent = this.mainPressure + ' atm';
        document.querySelector(this.date).innerHTML = time(this.dt);
        document.querySelector(this.weather).innerHTML = `<img src="https://openweathermap.org/img/wn/${this.icon}@2x.png">`;
        document.querySelector(this.description).innerHTML = this.descrpt;
    }
}