import { flixbusCityIds, megabusCityIds } from "./city_ids";

let checkAutocomplete = (value) => {
  let mergedArray = [...megabusCityIds, ...flixbusCityIds]
  let result = false
  for (let i=0; i<mergedArray.length; i++) {
    if (value == mergedArray[i].name) {
      result = true
      return true
    }
    else {
      result = false
    }
  }
  return result
}

let validateForm = () => {
  let formOrigin = document.getElementById("origin")
  let formDestination = document.getElementById("destination")
  let dueDate = document.getElementById("date")
  let hint = document.querySelector(".hint")

  if (hint !== null) {hint.remove()}


      if (formOrigin.value == "" || !checkAutocomplete(formOrigin.value)) {
      formOrigin.classList.add("invalid")
      let hintDev = document.createElement('div');
      hintDev.textContent = "Please select a station from the list"
      hintDev.classList.add("hint")
      formOrigin.parentNode.insertBefore(hintDev, formOrigin.nextSibling)
      return false
      }

      else if (formDestination.value == "" || !checkAutocomplete(formDestination.value)) {
        formDestination.classList.add("invalid")
        let hintDev2 = document.createElement('div');
        hintDev2.textContent = "Please select a station from the list"
        hintDev2.classList.add("hint")
        formDestination.parentNode.insertBefore(hintDev2, formDestination.nextSibling)
        return false
        }

      else if (dueDate !== null && dueDate.value == "") {
      dueDate.classList.add("invalid")
      let hintDev1 = document.createElement('div');
      hintDev1.textContent = "Please enter a valid date"
      hintDev1.classList.add("hint")
      dueDate.parentNode.insertBefore(hintDev1, dueDate.nextSibling)
      return false
      }
      
      else {
          return true
      }
}

function autocomplete(inp) {

    let arr = []

        // Get values from flixbus array
       flixbusCityIds.forEach((el) => {
        arr.push(el.name)
       }) 
       // Get values from megabus array
       megabusCityIds.forEach((el) => {
        arr.push(el.name)
       }) 
       // Dedupe array
       arr = [...new Set(arr)]
    


    var currentFocus;
    inp.addEventListener("input", () => {
        var a, b, i, val = inp.value;
        // close any already open lists of autocompleted value
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        // create a DIV element that will contain the items (values)
        a = document.createElement("DIV");
        a.setAttribute("id", inp.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        // append the DIV element as a child of the autocomplete container
        inp.parentNode.appendChild(a);
        // for each item in the array..
        for (i = 0; i < arr.length; i++) {
          // check if the item starts with the same letters as the text field value
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            // create a DIV element for each matching element
            b = document.createElement("DIV");
            // make the matching letters bold
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            // insert a input field that will hold the current array item's value
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            // execute a function when someone clicks on the item value (DIV element)
                b.addEventListener("click", (e) => {
                // insert the value for the autocomplete text field
                inp.value = e.currentTarget.innerText;
                // close the list of autocompleted values, (or any other open lists of autocompleted values
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    // execute a function presses a key on the keyboard
    inp.addEventListener("keydown", (e) => {
        var x = document.getElementById(inp.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          // If the arrow DOWN key is pressed, increase the currentFocus variable
          currentFocus++;
          // and and make the current item more visible
          addActive(x);
        } else if (e.keyCode == 38) { //up
          // If the arrow UP key is pressed, decrease the currentFocus variable
          currentFocus--;
          // and and make the current item more visible
          addActive(x);
        } else if (e.keyCode == 13) {
          // If the ENTER key is pressed, prevent the form from being submitted
          e.preventDefault();
          if (currentFocus > -1) {
            // and simulate a click on the "active" item
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      // a function to classify an item as "active":*/
      if (!x) return false;
      // start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      // add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      // a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      // close all autocomplete lists in the document, except the one passed as an argument
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  // execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  export {autocomplete,
          validateForm
        }