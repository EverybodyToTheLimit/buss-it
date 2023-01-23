let megabusQuery = async (originCity, destCity, date) => {
   try {
    // map city names to Megabus codes from array
    originCity = megabusCityIds.find(item => item.name === originCity).id
    destCity = megabusCityIds.find(item => item.name === destCity).id
    // build main API connection string
    let result = await fetch("https://uk.megabus.com/journey-planner/journeys?days=1&concessionCount=0&departureDate="+ date +"&destinationId="+destCity+"&inboundOtherDisabilityCount=0&inboundPcaCount=0&inboundWheelchairSeated=0&nusCount=0&originId="+originCity+"&otherDisabilityCount=0&pcaCount=0&totalPassengers=1", {mode: 'cors'})
        .then(function(response) {
        console.log(response);
      })
   }
   catch (err) {
    console.log(err)
   }
}

let validateMEgabusInput = (originCity, destCity, date) => {
    //add calidation steps, date cannot be in the past, format date with datefns yyyy-mm-dd

}

let megabusCityIds = [
    {name: "bristol", id: 13},
    {name: "plymouth", id: 77}
];

export {
    megabusQuery
}

