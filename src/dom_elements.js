import { parse, format } from "date-fns";
import { clickHandler } from "../src/event_handler";
import { validateForm, autocomplete } from "./forms_helpers";
import flixbus from "./flixbus.png"
import megabus from "./megabus.png"

// build static elements

let staticElements = () => {
    let main = document.createElement('div');
    main.id = "main"
    document.body.appendChild(main)
}

let searchSection = () => {
    let newForm = document.createElement('FORM');
    newForm.action = "#"

// both origin and destination should be select elements that feed from the object array in the connector

// create form elements
    let originDiv = document.createElement('div')
    originDiv.className = "origin-div"
    let origInput = document.createElement('input');
    origInput.name = "origin"
    origInput.id = "origin"
    origInput.type = "text"
    origInput.autocomplete = "off"
    origInput.placeholder = "travelling from"
    origInput.required = true;
    origInput.className = "autocomplete"
    let destDiv = document.createElement('div')
    destDiv.className = "destination-div"
    let destInput = document.createElement('input');
    destInput.name = "destination"
    destInput.id = "destination"
    destInput.type = "text"
    destInput.autocomplete = "off"
    destInput.placeholder = "travelling to"
    destInput.required = true;
    destInput.className = "autocomplete"
    let travelDate = document.createElement('input');
    travelDate.name = "date"
    travelDate.id = "date"
    travelDate.type = "date"
    travelDate.placeholder = "yyyy-mm-dd"
    travelDate.required = true;
    let searchButton = document.createElement('button');
    searchButton.textContent = "Search"
    searchButton.type = "submit"

// append objects in DOM

    let main = document.getElementById("main")
    originDiv.appendChild(origInput);
    destDiv.appendChild(destInput);
    newForm.appendChild(originDiv);
    newForm.appendChild(destDiv);
    newForm.appendChild(travelDate);
    newForm.appendChild(searchButton);
    main.appendChild(newForm);

// create event listener for search button click and pass to click handler helper

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!validateForm()) {
        return
    } else {
    loadingMainScreen();
    clickHandler("search", origInput.value, destInput.value, travelDate.value);
    }
})

// call the autocomplete functionality for both city input fields
autocomplete(origInput)
autocomplete(destInput)
}

// create the main section for results 
let resultSection = () => {
    let main = document.getElementById("main")
    let results = document.createElement('div');
    results.id = "results"
    main.appendChild(results)
}

// results builder helper called by the click handler

let addResultDom = (obj) => {
    let resultContainer = document.createElement('div')
    resultContainer.id = obj.id
    resultContainer.className = "result-container"
    let detailsDiv = document.createElement('div')
    detailsDiv.className = "details-div"
    let detailsTopDiv = document.createElement('div')
    detailsTopDiv.className = "details-top-div"
    let detailsMidDiv = document.createElement('div')
    detailsMidDiv.className = "details-mid-div"
    let detailsBottomDiv = document.createElement('div')
    detailsBottomDiv.className = "details-bottom-div"
    let departureTime = document.createElement('div')
    departureTime.className = "departure-time"
    departureTime.textContent = format(obj.departureTime, "H:mm");
    let arrivalTime = document.createElement('div')
    arrivalTime.className = "arrival-time"
    arrivalTime.textContent = format(obj.arrivalTime, "H:mm");
    let duration = document.createElement('div')
    duration.className = "duration"
    duration.textContent = Math.trunc((obj.duration / 60)) + "h " + (obj.duration  % 60) + "m" 
    let originCity = document.createElement('div')
    originCity.className = "origin-city"
    originCity.textContent = obj.originCity
    let destinationCity = document.createElement('div')
    destinationCity.className = "destination-city"
    destinationCity.textContent = obj.destinationCity
    let destination = document.createElement('div')
    destination.className = "destination"
    destination.textContent = obj.destination
    let origin = document.createElement('div')
    origin.className = "origin"
    origin.textContent = obj.origin
    let price = document.createElement('div')
    price.className = "price"
    price.textContent = "£" + obj.price
    let carrier = document.createElement('img')
    carrier.className = "carrier-label"
    if (obj.carrier == "megabus") {
        carrier.src = megabus
    }
    else {
    carrier.src = flixbus
    }

    let results = document.getElementById("results")

    detailsTopDiv.appendChild(departureTime)
    detailsTopDiv.appendChild(duration)
    detailsTopDiv.appendChild(arrivalTime)
    detailsMidDiv.appendChild(originCity)
    detailsMidDiv.appendChild(destinationCity)
    detailsBottomDiv.appendChild(origin)
    detailsBottomDiv.appendChild(destination)
    detailsDiv.appendChild(detailsTopDiv)
    detailsDiv.appendChild(detailsMidDiv)
    detailsDiv.appendChild(detailsBottomDiv)
    resultContainer.appendChild(detailsDiv)
    resultContainer.appendChild(price)
    resultContainer.appendChild(carrier)
    results.appendChild(resultContainer)
}

let loadingMainScreen = () => {
    let results = document.getElementById("results")
    results.innerHTML = ""
    results.className = "loader"
}

let clearMainScreen = () => {
    let results = document.getElementById("results")
    results.className = ""
}


export {
    staticElements,
    searchSection,
    resultSection,
    addResultDom,
    clearMainScreen
}