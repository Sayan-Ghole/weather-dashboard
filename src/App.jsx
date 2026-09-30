import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [city, setCity] = useState("Kolkata");

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY;


  const fetchWeather = async (cityName) => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );


      if (!response.ok) {

        if (response.status === 404) {
          throw new Error("City not found.");
        }

        if (response.status === 401) {
          throw new Error(
            "Invalid API key. Check your OpenWeather API key."
          );
        }

        throw new Error(
          "Something went wrong. Please try again."
        );
      }


      const data = await response.json();

      setWeather(data);

    } catch (error) {

      setError(error.message);

      setWeather(null);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchWeather("Kolkata");

  }, []);


  const handleSearch = (event) => {

    event.preventDefault();

    if (!city.trim()) {

      setError("Please enter a city name.");

      return;
    }

    fetchWeather(city.trim());
  };


  return (
    <div>

      <Header />

      <main>

        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
        />


        {loading && <Loading />}


        {error && !loading && (
          <ErrorMessage message={error} />
        )}


        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}

      </main>

      <Footer />

    </div>
  );
}

export default App;