var recipes = []

function getDataFromApi(urlApi) {
    return fetch(urlApi)
    .then(response => {
        return response.json();
    })
}

function fnFilteredRecipes (){
    let fragment = new DocumentFragment()
    let divResults = document.getElementById('results')
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
            let h1 = document.createElement('h1')
            h1.textContent = recipe.strMeal
            img.setAttribute("src", recipe.strMealThumb)
            img.setAttribute("alt", recipe.strMeal)
            div.setAttribute("onclick", "fnSaludar(\'" +recipe.idMeal+ "\', 'Search Bar')")
            div.appendChild(img)
            div.appendChild(h1)
            div.setAttribute("id", recipe.idMeal)
            fragment.appendChild(div)
        }
        )
        divResults.appendChild(fragment)
    })

}

fnFilteredRecipes()

function fnSaludar(area, method) {
    window.localStorage.setItem('method', method)
    window.localStorage.setItem('demo', area)
    window.location = '/html/demo.html'
}