import { megabusCityIds } from "./city_ids";
import { differenceInMinutes, parseISO } from 'date-fns'


let megabusQuery = async (originCity, destCity, date) => {
    let megabusResult = [];
   try {
    // map city names to Megabus codes from array
    originCity = megabusCityIds.find(item => item.name === originCity).id
    destCity = megabusCityIds.find(item => item.name === destCity).id
    // build main API connection string
    let result = await fetch("https://proxy.cors.sh/https://uk.megabus.com/journey-planner/api/journeys?days=1&concessionCount=0&departureDate="+ date +"&destinationId="+destCity+"&inboundOtherDisabilityCount=0&inboundPcaCount=0&inboundWheelchairSeated=0&nusCount=0&originId="+originCity+"&otherDisabilityCount=0&pcaCount=0&totalPassengers=1", {
        headers: {
          'x-cors-api-key': 'temp_cf1616c81b1fb0a232d4a95971a6aec7',
        }
        })
        .then(async response => {
            let text = await response.json();
            for (let i=1; i<text.journeys.length; i++) {
                let obj = text.journeys[i]
                let resultEntry = {
                    "id": obj.journeyId,
                    "departureTime": parseISO(obj.departureDateTime),
                    "arrivalTime": parseISO(obj.arrivalDateTime),
                    "originCity": obj.origin.cityName,
                    "origin": obj.origin.stopName,
                    "destinationCity": obj.destination.cityName,
                    "destination": obj.destination.stopName,
                    "duration": differenceInMinutes(parseISO(obj.arrivalDateTime), parseISO(obj.departureDateTime)),
                    "price": obj.price,
                    "carrier": "megabus"
                }
                megabusResult.push(resultEntry)
            }
            console.log(megabusResult)
            return megabusResult;
        })
   }
   catch (err) {
    console.log(err)
   }
}


// one off script to populate the cities with codes. Future feature maybe automatic at start of the session? 

// let getAllCodes = async () => {
//     let i = 0;
//     for (i=449; i<600; i++) {
//         await megabusQuery(56, i, "2023-01-25")
//         setTimeout(10000)
//     }
// }

let validateMegabusInput = (originCity, destCity, date) => {
    //add calidation steps, date cannot be in the past, format date with datefns yyyy-mm-dd

}


export {
    megabusQuery,
    // getAllCodes
}

