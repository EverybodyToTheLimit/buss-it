import { megabusQuery } from "./megabus_connector"

let clickHandler = async (clickOrigin, origin, destination, date) => {
    if (clickOrigin == "search") {
    let result = await megabusQuery (origin, destination, date)
    return result
    }
}

export {
    clickHandler
}