import * as main from './main.js'

main.fnAllAreas() //GETTING ALL THE AREAS FROM THE API
main.fnAllCategories() //GETTING ALL THE CATEGORIES FROM THE API
main.fnAutocomplete(document.getElementById('myInput'))


//ADDING EVENT LISTENERS
const randomRecipe = document.getElementById('randomRecipe').addEventListener("click", main.fnGetRandomRecipe)
const allAreas = document.getElementById('allAreas').addEventListener("click", main.fnPrintAllAreas)
const searchButton = document.getElementById('searchButton').addEventListener("click", main.fnSearch)