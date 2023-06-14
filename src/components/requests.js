let requestCache = new Map();

async function fetchWeather(query) {
  const url = 'https://api.weatherapi.com/v1/current.json';
  let result;

  try {
    const request = await fetch(`${url}?key=${process.env.WEATHER_API_KEY}&q=${query}`);
    result = await request.json();
  } catch (error) {
    console.error(error);
  }

  return result;
}

async function fetchWeatherCached (query) {
  if (requestCache.has(query)) {
    return requestCache.get(query);
  } else {
    const weatherData = await fetchWeather(query);
    requestCache.set(query, weatherData);
    return weatherData;
  }
}


export {fetchWeatherCached};