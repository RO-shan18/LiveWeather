function getdetails(city, weatherdata){
    let condition =  document.querySelector(".condition");
    let cap = document.createElement("div");
    let info = document.createElement("div");

    cap.classList.add("capsules");
    info.classList.add("info")

    //weather conditon
    let images = ["clear.png", "clouds.png", "Haze.png", "rain.png", "snow.png", "smoke.png"]
    for(let i=0; i<images.length; i++){
        if(images[i].split(".")[0].toLowerCase() == weatherdata.weather[0].main.toLowerCase()){
            console.log(weatherdata)
            cap.innerHTML += `<div class="contain2">
            <h3 class="ctyname">${weatherdata.name}, ${weatherdata.sys.country}</h3>
            <img src="images/${images[i]}" alt="" srcset="" class="png" />
          </div>`
        }  
    }

    //temperature
    cap.innerHTML += `<div class="temp">
    <h3 class="temper">Temperature: ${Math.floor(kelvinToCelsius(weatherdata.main.temp))}&deg;C</h3>
    <h3 class="feels">Feels like: ${Math.floor(kelvinToCelsius(weatherdata.main.feels_like))}&deg;C</h3>
    </div>`;
    condition.appendChild(cap);

    //showing condition
    condition.innerHTML += `<h1>${weatherdata.weather[0].main}</h1>`

    //Humidity
    info.innerHTML = `<div class="detailinfo">
    <img src="images/humidity.png" alt="" srcset=""/>
    <h2>${weatherdata.main.humidity}%</h2>
    </div>
    <div class="windspd">
    <img src="images/windspeed.png" alt="" srcset=""/>
    <h2>${Math.floor(milesToKilometers(weatherdata.wind.speed))} km/s</h2>
    </div>`;
    condition.appendChild(info);
}


async function getweather() {
  let searchcity = document.getElementById("search").value;
  let content = document.querySelector(".heading");
  content.innerHTML = "Fetching weather data.........."
  let weatherapi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=d0b9f0c9b0cd07af9f948c127a8d71c9`
  );
  content.innerHTML=" ";

  let weatherdata = await weatherapi.json();
  if (searchcity == " ") {
    content.innerHTML = "Please enter city name first";
  } else if (weatherdata.message == "city not found") {
    content.innerHTML = `${searchcity} city is not exist`
  } else {
        getdetails(searchcity, weatherdata);
   }
}

function events() {
  // To get weather while searching
  let searchbtn = document.querySelector(".img");
  searchbtn.addEventListener("click", (e) => {
    if (searchbtn.src.includes("search.svg")) {
      getweather();
      searchbtn.src = "cross.svg";
    } else if (searchbtn.src.includes("cross.svg")){
      document.getElementById("search").value = " ";
      searchbtn.src = "search.svg";
      document.querySelector(".condition").innerHTML = " ";
      document.querySelector(".heading").innerHTML = " ";
    }
  });
}

events();

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function milesToKilometers(miles) {
    const conversionFactor = 1.60934;
    return miles * conversionFactor;
}