import { useEffect, useState, useCallback } from "react";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const getWeather = useCallback(() => {
    if (!city || !country) {
      setError("Please enter both country and city names.");
      return;
    }

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "47bcd4b456msh46ea22985323197p1f7088jsneb864d6e650a",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log(data);

        setError(null);
      })
      .catch((error) => {
        setWeather(null);
        setError(error.message);
      });
  }, [city, country]);

  return (
    <div>
      <h1 style={{ marginLeft: "600px" }}>Weather Forecast</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
        }}
      >
        <div style={{ marginTop: "30px", marginLeft: "600px" }}>
          <label htmlFor="country">Country (Code): </label>
          <input
            style={{ height: "20px", width: "200px" }}
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())}
            placeholder="Enter country code (e.g. AZ)"
          />
        </div>

        <div style={{ marginTop: "30px", marginLeft: "600px" }}>
          <label htmlFor="city">City: </label>
          <input
            style={{ height: "20px", width: "200px" }}
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g. BAKU)"
          />
        </div>

        <button
          style={{
            marginLeft: "600px",
            marginTop: "30px",
            height: "30px",
            width: "130px",
            borderRadius: "12px",
            border: "1px solid #000",
            backgroundColor: "transparent",
          }}
          type="submit"
        >
          Get Weather
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginLeft: "600px" }}>Error: {error}</p>
      )}

      {weather && (
        <div style={{ marginLeft: "600px" }}>
          <h2>{weather.city}</h2>
          <p>Condition: {weather.weather}</p>
          <p>Temperature: {weather.temp_c}°C</p>
        </div>
      )}
    </div>
  );
}
