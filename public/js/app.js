var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition'); //fetch weather condition and save it in const

const tempElement = document.querySelector('.temperature span'); //fetch temp and save it

const locationElement = document.querySelector('.place'); //fetch location and save it

const dateElement = document.querySelector('.date'); //date can be shown by inbuilt js function no need to fetch

//for displaying month name
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//for displaying date and month
dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);

//on pressing submit button
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";   //to clear the existing result until new result is loaded
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error; 
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description    //for chnaging icon
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"          //for changing icon
                }
                locationElement.textContent = data.cityName;
                //change temperatur to degree
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
})