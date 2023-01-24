import { megabusCityIds } from "./city_ids";

function transform(str) {
    let data = str.split('\n').map(i=>i.split(','));
    let headers = data.shift();
    let output = data.map(d=>{obj = {};headers.map((h,i)=>obj[headers[i]] = d[i]);return obj;});
    console.log(output);
  }

let megabusQuery = async (originCity, destCity, date) => {
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
            console.log(text)
            // console.log('{name: "' + text.journeys[0].destination.cityName + '", id: ' + text.journeys[0].destination.cityId + '},')
        
        })
   }
   catch (err) {
    console.log(err)
   }
}

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

