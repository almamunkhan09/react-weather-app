import axios from 'axios';
import { useEffect, useState } from 'react';
//import Autocomplete from 'react-google-autocomplete';
import { useForm } from 'react-hook-form';

console.log(process.env.REACT_APP_APIKEY);
const url = 'https://api.api-ninjas.com/v1/weather';
const apiKey = process.env.REACT_APP_APIKEY;
// const mapApi = process.env.REACT_GOOGLE_API_KEY;

export default function WeatherApp() {
  const { register, handleSubmit } = useForm();
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // setLatitude(position.coords.latitude);
      // setLongitude(position.coords.longitude);
      axios
        .get(url, {
          headers: { 'X-Api-Key': apiKey },
          params: location
            ? { city: location }
            : {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
        })
        .then((data) => setWeatherData(data))
        .catch((err) => console.log(err));
    });
  }, [location]);

  const onSubmit = (data) => setLocation(data.location);
  return (
    <>
      <h2>Forcast the weather before you move out</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="input"> Location </label>
        <input id="input" {...register('location')} />
        <button type="submit">Submit</button>
      </form>

      {console.log(weatherData)}
      {weatherData ? (
        <>
          <h2>{weatherData.data.temp} &deg;C</h2>
          <h3>Feels like {weatherData.data.feels_like} &deg;C</h3>
          <h4>Maximum: {weatherData.data.max_temp}</h4>
          <h4>Minimum: {weatherData.data.min_temp}</h4>
        </>
      ) : (
        ''
      )}
    </>
  );
}
