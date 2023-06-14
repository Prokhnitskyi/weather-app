import './styles/styles.scss';
import { getWeather } from './components/requests';

function weatherApp () {
  const loader = document.querySelector('.loader');
  const addressField = document.querySelector('.weather-display__address');
  const temperatureValueField = document.querySelector('#temp');
  const temperatureTypeField = document.querySelector('#temp-type');
  const conditionIcon = document.querySelector('#condition-icon');
  const conditionText = document.querySelector('#condition-text');
  const measurementsSwitches = document.querySelectorAll(
    '[name="temperature-type"]');
  const display = document.querySelector('.weather-display__container');
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');

  const init = () => {
    showWeatherInfo('auto:ip');
    searchForm.addEventListener('submit', searchFormHandler);
    measurementsSwitches.forEach(radio => {
      radio.addEventListener('change', switchMeasurement);
    });

  }

  const showWeatherInfo = (query) => {
    const weather = getWeather(query);
    weather.then(data => {
      populate(data);
      loader.classList.add('hidden');
      display.classList.remove('hidden');
    }).
      catch(err => alert('Something gone wrong'));
  }

  const populate = (data) => {
    addressField.textContent = `${data.country}, ${data.place}`;
    temperatureValueField.dataset.celsius = data.temperature.celsius;
    temperatureValueField.dataset.fahrenheit = data.temperature.fahrenheit;
    const selectedMeasurement = Array.from(measurementsSwitches).find(radio => radio.checked).value;
    temperatureValueField.textContent = data.temperature[selectedMeasurement];
    temperatureTypeField.textContent = selectedMeasurement[0].toUpperCase();
    conditionIcon.src = data.condition.icon;
    conditionText.textContent = data.condition.text;
  }

  const searchFormHandler =  (event) => {
    event.preventDefault();
    if (!searchInput.value) return;
    loader.classList.remove('hidden');
    display.classList.add('hidden');
    showWeatherInfo(searchInput.value);
  }

  const switchMeasurement = () => {
    const selectedMeasurement = Array.from(measurementsSwitches).find(radio => radio.checked).value;
    temperatureValueField.textContent = temperatureValueField.dataset[selectedMeasurement];
    temperatureTypeField.textContent = selectedMeasurement[0].toUpperCase();
  }

  return {
    init
  };
}

const app = weatherApp();
app.init();
