import css from "../css/filteredResults.css";
import logo from '../assets/icon.png'
var recipes = []
var path = window.location.pathname;
var page = path.split("/").pop();

function getDataFromApi(urlApi) {
    return fetch(urlApi)
    .then(response => {
        return response.json();
    })
}

function fnFilteredRecipes (){
    let fragment = new DocumentFragment()
    let divResults = document.getElementById('results')
    let h1 = document.createElement('h1')
    h1.textContent = "Recipes by " + window.localStorage.getItem('method') + ": " + window.localStorage.getItem('demo')
    divResults.insertAdjacentElement('beforebegin', h1)
    let url;
    if(window.localStorage.getItem('method') === 'Area Filter'){
        url = "https://www.themealdb.com/api/json/v1/1/filter.php?a="
    }
    if(window.localStorage.getItem('method') === 'Category Filter'){
        url = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
    }
    getDataFromApi(url + window.localStorage.getItem('demo'))
    .then(data => {
        recipes = data['meals']

        recipes.forEach(recipe => {
            let div = document.createElement('div')
            let img = document.createElement('img')
            let h5 = document.createElement('h5')
            h5.textContent = recipe.strMeal
            h5.setAttribute("class", "text-center")
            img.setAttribute("src", recipe.strMealThumb)
            img.setAttribute("alt", recipe.strMeal)
            div.setAttribute("onclick", "fnGetRecipe(\'" +recipe.idMeal+ "\', 'Search Bar')")
            div.appendChild(img)
            div.appendChild(h5)
            div.setAttribute("id", recipe.idMeal)
            fragment.appendChild(div)
        }
        )
        divResults.appendChild(fragment)
    })

}

window.fnGetRecipe = function fnGetRecipe(area, method) {
    window.localStorage.setItem('method', method)
    window.localStorage.setItem('demo', area)
    window.location = '/recipe.html'
}

window.fnGetRandomRecipe = function fnGetRandomRecipe() {
    getDataFromApi('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(data => {
            window.localStorage.setItem('method', 'Random Recipe')
            window.localStorage.setItem('demo', data['meals'][0]['idMeal'])
            window.location = '/recipe.html'
        })
}
fnFilteredRecipes()
document.getElementById('logo').setAttribute('src',logo)