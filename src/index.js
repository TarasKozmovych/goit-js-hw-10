import './css/styles.css';
import fetchCountry from "./fetchCountries";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchCountry from './fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector("#search-box"),
    listCountry: document.querySelector(".country-list"),
    infoCountry: document.querySelector(".country-info")
};

refs.input.addEventListener("input", debounce(inputChange, DEBOUNCE_DELAY));

function markupItemsCountries(data) {
    return data.reduce((acc, element) => {
        return (acc += `
    <li class='country-item'>
      <img class="country-flag" src="${element.flags.svg}" alt="${element.name.official}" width="25">
      <span class="country-name">${element.name.official}</span>
    </li>`);
    }, '');
}

function dataCountry(data) {
    const [
        {
            name: { official: name },
            capital,
            population,
            flags: { svg },
            languages,
        },
    ] = data;
    return `
      <div class="wrap-container">
        <img class="country-flag" src="${svg}" alt="${name}" width="9%"/>
        <h2>${name}</h2>
      </div>
      <ul class="data-list">
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>languages: <span>${Object.values(languages).join(', ')}</span></li>
      </ul>`;
};

const inputChange = (element) => {

}