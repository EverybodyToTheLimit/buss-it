import { flixbusCityIds } from "./city_ids";


let flixbusQuery = async (originCity, destCity, date) => {

        originCity = flixbusCityIds.find(item => item.name === originCity).id
        destCity = flixbusCityIds.find(item => item.name === destCity).id
        const axios = require("axios");

        const options = {
        method: 'GET',
        url: 'https://flixbus.p.rapidapi.com/v1/search-trips',
        params: {
            to_id: destCity,
            from_id: originCity,
            currency: 'GBP',
            departure_date: date,
            number_adult: '1',
            search_by: 'cities'
        },
        headers: {
            'X-RapidAPI-Key': 'ec8a7d85e9mshb5b0c38b432f808p1681d0jsndbbffac7fb50',
            'X-RapidAPI-Host': 'flixbus.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            

            // for (let i=1; i<response.data.length; i++) {
            //     let obj = response.data[i]
            //     let resultEntry = {
            //         "id": obj.departure.timestamp,
            //         "departureTime": obj.departureDateTime,
            //         "arrivalTime": obj.arrivalDateTime,
            //         "originCity": obj.origin.cityName,
            //         "origin": obj.origin.stopName,
            //         "destinationCity": obj.destination.cityName,
            //         "destination": obj.destination.stopName,
            //         "duration": obj.duration,
            //         "price": obj.price
            //     }}

        }).catch(function (error) {
            console.error(error);
        })

};

// one off script to populate the cities with codes. Future feature maybe automatic at start of the session? 

// let getFlixCities = async () => {
//     const axios = require("axios");

//     const options = {
//     method: 'GET',
//     url: 'https://flixbus.p.rapidapi.com/v1/cities',
//     headers: {
//         'X-RapidAPI-Key': 'ec8a7d85e9mshb5b0c38b432f808p1681d0jsndbbffac7fb50',
//         'X-RapidAPI-Host': 'flixbus.p.rapidapi.com'
//     }
//     };

//     axios.request(options).then(function (response) {
//         console.log(response.data);
//         for (let i=1; i<response.data.length; i++) {
//             if (response.data[i].country.name === "United Kingdom") {
//                 console.log('{name: "' + response.data[i].name + '", id: ' + response.data[i].id +'},')
//             }
//         }

//     }).catch(function (error) {
//         console.error(error);
//     });
// }

export {
    flixbusQuery
}