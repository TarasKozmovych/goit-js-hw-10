import './css/styles.css';

import fetchCountries from "./fetchCountries";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'notiflix/dist/notiflix-3.2.5.min.css';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    listCountry: document.querySelector(".country-list"),
    infoCountry: document.querySelector(".country-info")
};

function createMurkup() {
    return Notify.info("Too many matches found. Please enter a more specific name.");
};



function markupItemsCountries(data) {
    return data.reduce((acc, element) => {
        return (acc += `
    <li class='country-item'>
      <img class="country-flag" src="${element.flags.svg}" alt="${element.name.official}" width="25">
      <span class="country-name">${element.name.official}</span>
    </li>`);
    }, '');
};

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
      <div class="wrap-country">
        <img class="country-flag" src="${svg}" alt="${name}" width="9%"/>
        <h2>${name}</h2>
      </div>
      <ul class="data-list">
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>languages: <span>${Object.values(languages).join(', ')}</span></li>
      </ul>`;
};

const inputChange = element => {
    refs.listCountry.innerHTML = "";
    if (element.target.value.trim() === "") {
        return;
    }
    fetchCountries(element.target.value.trim())
        .then(data => {
            if (data.length >= 10 && data.length != 40) {
                createMurkup();
            } else if (data.length >= 2) {
                refs.listCountry.innerHTML += markupItemsCountries(data);
            } else if (data.length === 1) {
                refs.listCountry.innerHTML = dataCountry(data);
            }
        })
        .catch(error => {
            Notify.failure(error);
        });
};
refs.input.addEventListener('input', debounce(inputChange, DEBOUNCE_DELAY));