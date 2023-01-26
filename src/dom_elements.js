import { clickHandler } from "../src/event_handler";
import { flixbusQuery } from "./flixbus_connector";
import { autocomplete } from "./forms_helpers";
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

// create event listeners

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    clickHandler("search", origInput.value, destInput.value, travelDate.value);
})
autocomplete(origInput)
autocomplete(destInput)
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