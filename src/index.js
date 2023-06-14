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

  const init = () => {
    const weather = getWeather('auto:ip');
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

  return {
    init
  };
}

const app = weatherApp();
app.init();
