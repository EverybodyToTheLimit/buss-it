import css from "../src/styles.css"
import { resultSection, searchSection, staticElements } from "./dom_elements";
import { getFlixCities } from "./flixbus_connector";



staticElements();
searchSection();
resultSection();
getFlixCities();
