import { flixbusQuery } from "./flixbus_connector"
import { megabusQuery } from "./megabus_connector"

let clickHandler = async (clickOrigin, origin, destination, date) => {
    if (clickOrigin == "search") {
    let resultMegabus = await megabusQuery(origin, destination, date);
    let resultFlixbus = await flixbusQuery(origin, destination, date);
    let resultMerged = [...resultMegabus, ...resultFlixbus]
    console.log(resultMerged)
    }
}

export {
    clickHandler
}