import './css/styles.css';
import fetchCountry from "./fetchCountries";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchCountry from './fetchApi';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector("#search-box"),
    listCountry: document.querySelector(".country-list"),
    infoCountry: document.querySelector(".country-info")
};
refs.input.addEventListener("input", debounce(inputChange, DEBOUNCE_DELAY));

