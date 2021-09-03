let weather = {
  apiKey: "3265874a2c77ae4a04bb96236a642d2f",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, feels_like, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp.toFixed() + "°C";
    document.querySelector(".feels_like").innerHTML = "<p>Feels like</p><p>" + feels_like + "°C</p>";
    document.querySelector(".temp_min").innerHTML = "<p>Temp min</p><p>" + temp_min + "°C</p>";
    document.querySelector(".temp_max").innerHTML = "<p>Temp max</p><p>" + temp_max + "°C</p>";
    document.querySelector(".humidity").innerHTML = "<p>Humidity</p><p>" + humidity + "%</p>";
    document.querySelector(".wind").innerHTML = "<p>Wind speed</p><p>" + speed + "km/h</p>";
    document.querySelector(".weather").classList.remove("loading");
    // test if image exists
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Paris");
