import { useState, useEffect } from "react";

function Header() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({
    temp: null,
    description: "",
    icon: "",
    city: ""
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          setError("Your location could not be obtained.");
        }
      );
    } else {
      setError("Your browser does not support geolocation.");
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=b441e5cb95bf4ee190466407345e5210&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather({
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            city: data.name
          });
        })
        .catch(() => setError("Failed to fetch weather data."));
    }
  }, [location.lat, location.lon]);

  return (
    <div className="weatherHeader">
      {weather.temp ? (
        <>
          <div className="weatherInfo">
            <p><strong>{weather.city}</strong></p>
            <p>{weather.description}</p>
            <p>{weather.temp}°F</p>
          </div>
          {weather.icon && (
            <div className="weatherIcon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          )}
        </>
      ) : (
        <p>{error || "Obtaining location..."}</p>
      )}
    </div>
  );
}

export default Header;
