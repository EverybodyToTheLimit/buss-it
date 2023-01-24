import css from "../src/styles.css"
import { resultSection, searchSection, staticElements } from "./dom_elements";
// import { getAllCodes } from "./megabus_connector";


staticElements();
searchSection();
resultSection();

// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://flixbus.p.rapidapi.com/v1/search-trips',
//   params: {
//     to_id: '1374',
//     from_id: '88',
//     currency: 'EUR',
//     departure_date: '2023-01-26',
//     number_adult: '1',
//     search_by: 'cities'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'ec8a7d85e9mshb5b0c38b432f808p1681d0jsndbbffac7fb50',
//     'X-RapidAPI-Host': 'flixbus.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });