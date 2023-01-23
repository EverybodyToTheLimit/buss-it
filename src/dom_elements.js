import { clickHandler } from "../src/event_handler";
import { megabusQuery } from "./megabus_connector";

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

    let origInput = document.createElement('input');
    origInput.name = "origin"
    origInput.type = "text"
    origInput.placeholder = "Where are your travelling from?"
    origInput.required = true;
    let destInput = document.createElement('input');
    destInput.name = "destination"
    destInput.type = "text"
    destInput.placeholder = "Where are you going to?"
    destInput.required = true;
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
    newForm.appendChild(origInput);
    newForm.appendChild(destInput);
    newForm.appendChild(travelDate);
    newForm.appendChild(searchButton);
    main.appendChild(newForm);

// create event listeners

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("here")
    let result = megabusQuery(origInput.value, destInput.value, travelDate.value)
    console.log(result)
})
}


let resultSection = () => {
    let main = document.getElementById("main")
    let results = document.createElement('div');
    results.id = "results"
    main.appendChild(results)
}

export {
    staticElements,
    searchSection,
    resultSection
}