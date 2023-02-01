import { emptyResults, clearMainScreen, addResultDom } from "./dom_elements";
import { flixbusQuery } from "./flixbus_connector"
import { megabusQuery } from "./megabus_connector"


let clickHandler = async (clickOrigin, origin, destination, date) => {
    try {
        //trigger on search query
    if (clickOrigin == "search") {
        //get connection details in arrays
    let resultMegabus = await megabusQuery(origin, destination, date);
    let resultFlixbus = await flixbusQuery(origin, destination, date);
        //check for empties
    if (resultFlixbus == false && resultMegabus == false) {
        clearMainScreen();
        emptyResults();
    }
    else {
        if (resultFlixbus == false) {resultFlixbus = []}
        else if (resultMegabus == false) {resultMegabus = []}

        //merge arrays
    let resultMerged = [...resultMegabus, ...resultFlixbus]
        //sort results by price ascending
    resultMerged.sort((a,b) => a.price - b.price);
        //call dom helper to draw each object
    console.log(resultMerged)
    resultMerged.forEach(addResultDom)
    clearMainScreen();
    
    }
    }
    }
    catch (error) {
        console.log(error)
    }
}

export {
    clickHandler
}