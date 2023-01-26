import { clickHandler } from "../src/event_handler";
import { autocomplete } from "./forms_helpers";


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
    origInput.type = "text"
    origInput.placeholder = "travelling from"
    origInput.required = true;
    origInput.className = "autocomplete"
    let destDiv = document.createElement('div')
    destDiv.className = "destination-div"
    let destInput = document.createElement('input');
    destInput.name = "destination"
    destInput.type = "text"
    destInput.placeholder = "travelling to"
    destInput.required = true;
    destInput.className = "autocomplete"
    let travelDate = document.createElement('input');
    travelDate.name = "date"
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
    clickHandler("search", origInput.value, destInput.value, travelDate.value);
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
    let departureTime = document.createElement('div')
    departureTime.className = "departure-time"
    departureTime.textContent = obj.departureTime
    let arrivalTime = document.createElement('div')
    arrivalTime.className = "arrival-time"
    arrivalTime.textContent = obj.arrivalTime
    let duration = document.createElement('div')
    duration.className = "duration"
    duration.textContent = obj.duration
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
    price.textContent = obj.price

    let results = document.getElementById("results")
    resultContainer.appendChild(departureTime)
    resultContainer.appendChild(arrivalTime)
    resultContainer.appendChild(duration)
    resultContainer.appendChild(originCity)
    resultContainer.appendChild(origin)
    resultContainer.appendChild(destinationCity)
    resultContainer.appendChild(destination)
    resultContainer.appendChild(price)
    results.appendChild(resultContainer)
}


export {
    staticElements,
    searchSection,
    resultSection,
    addResultDom
}