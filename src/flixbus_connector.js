import { flixbusCityIds } from "./city_ids";
import { differenceInMinutes, fromUnixTime } from "date-fns";


let flixbusQuery = async (originCity, destCity, date) => {

        let flixbusResult = [];

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

        let result = await axios.request(options).then(async response => {
            

            for (let i=0; i<response.data.length; i++) {
                let obj = response.data[i]
                for (let i=0; i<obj.items.length; i++) {
                    let innerObj = obj.items[i]
                    let resultEntry = {
                        "id": innerObj.id,
                        "departureTime": fromUnixTime(innerObj.departure.timestamp),
                        "arrivalTime": fromUnixTime(innerObj.arrival.timestamp),
                        "originCity": obj.from.name,
                        "origin": obj.from.full_address,
                        "destinationCity": obj.to.name,
                        "destination": obj.to.full_address,
                        "duration": differenceInMinutes(fromUnixTime(innerObj.arrival.timestamp), fromUnixTime(innerObj.departure.timestamp)),
                        "price": innerObj.price_total_sum,
                        "carrier": "flixbus"
                    }
                flixbusResult.push(resultEntry);
                }
            }
            console.log(flixbusResult)

        }).catch(function (error) {
            console.error(error);
        })
        return flixbusResult;
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