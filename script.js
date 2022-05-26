const timeE1 = document.getElementById('time')
const dateE1 = document.getElementById('date')
const currentWeatherItemsE1 = document.getElementById('current-weather-items')
const timezone = document.getElementById('time-zone')
const countryE1 = document.getElementById('country')
const weatherForecastE1 = document.getElementById('weather-forecast')
const currentTempE1 = document.getElementById('current-temp')
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let loc = document.getElementById('location');
let tempicon = document.getElementById('temp-icon');
let tempicon1 = document.getElementById('temp-icon');
let tempvalue = document.getElementById('tempvalue');
let climate = document.getElementById('climate');
let icon;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const API_KEY = 'c5696c20bf81c606dcc42f652217b064';
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();

  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM'

  timeE1.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm"> ${ampm} </span>`
  dateE1.innerHTML = days[day] + ',' + date + ' ' + months[month]

}, 1000);
searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = '';
});
const getWeather = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    if (id < 300 && id >= 200) {
      tempicon.src = "./icons/strom.png"
    }
    else if (id < 500 && id >= 300) {
      tempicon.src = "./icons/drizzle.png"
    }

    else if (id < 600 && id >= 500) {
      tempicon.src = "./icons/rain.png"
    }
    else if (id < 700 && id >= 600) {
      tempicon.src = "./icons/snowy.png"
    }
    else if (id < 800 && id >= 700) {
      tempicon.src = "./icons/haze.png"
    }
    else if (id < 900 && id > 800) {
      tempicon.src = "./icons/cloudy.png"
    }

    else if (id == 800) {
      tempicon.src = "/icons/suny.png"
    }
  }
  catch (error) {
    alert('city not found');
  }
};
window.addEventListener("load", () => {
  let longitude;
  let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((Position) => {

      longitude = Position.coords.longitude;
      latitude = Position.coords.latitude;


      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then((response) => {
        return response.json();
      })



        .then(data1 => {
          const { name } = data1;
          const { feels_like } = data1.main;
          const { id, main } = data1.weather[0];
          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);
          if (id < 300 && id >= 200) {
            tempicon.src = "./icons/strom.png"
          }
          else if (id < 500 && id >= 300) {
            tempicon.src = "./icons/drizzle.png"
          }

          else if (id < 600 && id >= 500) {
            tempicon.src = "./icons/rain.png"
          }
          else if (id < 700 && id >= 600) {
            tempicon.src = "./icons/snowy.png"
          }
          else if (id < 800 && id >= 700) {
            tempicon.src = "./icons/haze.png"
          }
          else if (id < 900 && id > 800) {
            tempicon.src = "./icons/cloudy.png"
          }

          else if (id == 800) {
            tempicon.src = "./icons/suny.png"
          }

          console.log(data1);


        })
    })
  }
})



getWeatherData()

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {


    let { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      
      showWeatherData(data);
      const { name } = data;
      // const { feels_like } = data.main;
      // const { id, main } = data.daily.weather[0];
      // data.daily.weather[0];
       const { id, main } = data.current.weather[0];
// const {id, main} = data.daily.weather[0];
 
      if (id < 300 && id >= 200) {
        tempicon.src = "./icons/strom.png"
      }
      else if (id < 400 && id >= 300) {
        tempicon.src = "./icons/drizzle.png"
      }

      else if (id < 600 && id >= 500) {
        tempicon.src = "./icons/rain.png"
      }
      else if (id < 700 && id >= 600) {
        tempicon.src = "./icons/snowy.png"
      }
      else if (id < 800 && id >= 700) {
        tempicon.src = "./icons/haze.png"
      }
      else if (id < 900 && id > 800) {
        tempicon.src = "./icons/cloudy.png"
      }

      else if (id == 800) {
        tempicon.src = "/icons/suny.png"
      }
   console.log(data)
   
    })
  })
    
  }


  function showWeatherData(data) {
    let { humidity, pressure, clouds, temp, sunrise, sunset, wind_speed } = data.current;
    // timezone.innerHTML = data.timezone;
    // countryE1.innerHTML = data.lat + 'N' + data.lon + 'E'
    // loc.innerHTML = data.location
    currentWeatherItemsE1.innerHTML =
      `

    <div class="weather-item">
    <div>Temperature</div>
    <div>${temp} &#176;C</div>
    </div> 
    <div class="weather-item">
    <div>Clouds</div>
    <div>${clouds}% </div>
    </div>
    <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity} %</div>
    </div>
    <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure} hPa</div>
    </div>
    <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
   
    </div>
    <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    
    </div>
    `;
    let otherDayForecast = ` `
    data.daily.forEach((day, idx) => {
      if (idx == 0) {
        
        currentTempE1.innerHTML = `
        <img src="${tempicon.src}" alt="temp-icon" class="temp-icon">
            <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
           
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
            
        `
      }
     
      
      else {
        otherDayForecast += `
        
        <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="${tempicon.src}" alt="temp-icon" class="temp-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
        `
      }

    })
    weatherForecastE1.innerHTML = otherDayForecast;

{/* <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather icon" class="w-icon"></img> */}
  }
  //   window.addEventListener("load", () => {
  //     let longitude;
  //     let latitude;

  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((Position) => {

  //         longitude = Position.coords.longitude;
  //         latitude = Position.coords.latitude;


  //         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then((response) => {
  //           return response.json();
  //         })



  //           .then(data1 => {
  //             const { name } = data1;
  //             const { feels_like } = data1.main;
  //             const { id, main } = data1.weather[0];
  //             loc.textContent = name;
  //             climate.textContent = main;
  //             tempvalue.textContent = Math.round(feels_like - 273);
  //             if(id<300 &&id>=200){
  //               tempicon.src="./icons/strom.png"
  //             }
  //             else if(id<500 &&id>=300){
  //               tempicon.src="./icons/drizzle.png"
  //             }

  //             else if(id<600 &&id>=500){
  //               tempicon.src="./icons/rain.png"
  //             }
  //             else if(id<700 &&id>=600){
  //               tempicon.src="./icons/snowy.png"
  //             }
  //            else if(id<800 &&id>=700){
  //               tempicon.src="./icons/cloudy.png"
  //             }

  //            else if(id==800){
  //               tempicon.src="./icons/suny.png"
  //             }
  //     })
  //   })
  // }
  // window.addEventListener("load" ,()=>{
  // let longitude;
  // let latitude;
  // if(navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition((Position) => {

  //     longitude=Position.coords.longitude;
  //     latitude=Position.coords.latitude;
  //             // let { latitude, longitude } = success.coords;

  //           fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

  //                 console.log(data)
  //                 showWeatherData(data);
  //                 loc.textContent=timezone;
  //             })
  //         })
  // }

  // })