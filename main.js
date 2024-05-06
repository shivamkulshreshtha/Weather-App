const apiKey = "50c8c3765312cdfec1ec8bf92cc73edf";
let city = document.querySelector(".search input").innerHTML || "new york"; //document.querySelector('')
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// async function firstLoad(){
//   const data = await checkWeather();
//   console.log('data',data)
//   document.querySelector(".city").innerHTML = data.name
//   Array.from(document.getElementsByClassName("temp"))[0].innerHTML = data.main.temp;
//   document.querySelector(".humidity").innerHTML = data.main.humidity + ' %'
//   document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';
//   document.querySelector(".weather-icon").src = document.querySelector(".weather-icon").src + data.weather[0].main.toString().toLowerCase()+'.png';
// }

async function checkWeather() {
  const response = await fetch(apiUrl);
  var data = await response.json();
  return data;
}

document.querySelector(".search button").addEventListener("click", async () => {
  try {
    city = document.querySelector(".search input").value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const data = await checkWeather();
    document.querySelector(".city").innerHTML = data?.name;
    Array.from(document.getElementsByClassName("temp"))[0].innerHTML =
      data?.main.temp;
    document.querySelector(".humidity").innerHTML = data?.main.humidity + " %";
    document.querySelector(".weather-icon").src =
      document
        .querySelector(".weather-icon")
        .src.slice(
          0,
          document.querySelector(".weather-icon").src.lastIndexOf("/")
        ) +
      "/" +
      data?.weather[0].main.toString().toLowerCase() +
      ".png";
    document.querySelector(".search input").value = "";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (err) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
});
