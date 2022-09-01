var areas = []
var allOpened = false
var categories = []

function fnShowFilteredResults(area, method) {
    //console.log('hola')
    console.log(area)

    window.localStorage.setItem('method', method)
    window.localStorage.setItem('demo', area)
    window.location = '/html/filteredResults.html'
}

function getDataFromApi(urlApi) {
    return fetch(urlApi)
    .then(response => {
        return response.json();
    })
}

function fnAllAreas() {
    getDataFromApi('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then(data => {
            areas = data['meals'].map(datum => {
                return datum['strArea']
            })
        })
}
fnAllAreas()

function fnHideAreas() {
    document.getElementById('allAreas').removeAttribute('hidden')
    areas.forEach(area => {
        document.getElementById(area).setAttribute('hidden', true)
    });
    document.getElementById('buttonHidde').setAttribute('hidden', true)    
}


function fnPrintAllAreas() {
    if (!allOpened) {
        let fragment = new DocumentFragment()
        areas = areas.filter(area => area != 'Mexican')
        areas = areas.filter(area => area != 'Canadian')
        document.getElementById('allAreas').setAttribute('hidden', true)
        areas.forEach(area => {
            let div = document.createElement('div')
            div.setAttribute("id", area)
            div.setAttribute("onclick", "fnShowFilteredResults(\'" +area+ "\', 'Area Filter')")
            div.innerHTML = '<p>'+area+'</p>'
            fragment.appendChild(div)
        })
        allOpened = true
        let divArea = document.querySelector('#areas')
        divArea.appendChild(fragment)
        let button = document.createElement('button')
        button.setAttribute("id", "buttonHidde")
        button.setAttribute("onclick", "fnHideAreas()")
        button.innerHTML = 'Ocultar'
        let areasSection = document.querySelector('#areasSection')
        areasSection.appendChild(button)
    }
    else {
        document.getElementById('allAreas').setAttribute('hidden', true)
        areas.forEach(area => {
            document.getElementById(area).removeAttribute('hidden')
        });
        document.getElementById('buttonHidde').removeAttribute('hidden')
    }
}

function fnAllCategories() {
    getDataFromApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then(data => {
        categories = data['meals'].map(datum => {
            return datum['strCategory']
        })
        fnPrintAllCategories()
    })
}

function fnPrintAllCategories() {
    let fragment = new DocumentFragment()
    categories.forEach(category => {
        let div = document.createElement('div')
        div.setAttribute("id", category)
        div.setAttribute("onclick", "fnShowFilteredResults(\'" +category+ "\', 'Category Filter')")
        div.innerHTML = '<p>'+category+'</p>'
        fragment.appendChild(div)
    })
    let divCategories = document.querySelector('#categories')
    divCategories.appendChild(fragment)
}

fnAllCategories()

function fnAutocomplete(input) {
    let currentFocus
    input.addEventListener("input", e => {
        let div, divMatchingElement, i, val = input.value
        let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + val
        getDataFromApi(url)
        .then(data => {
            closeAllLists()
            if (!val) return false
            currentFocus = -1
            div = document.createElement('div')
            div.setAttribute('id', input.id + 'autocompleteList')
            div.setAttribute("class", "autocompleteItems");
            input.parentNode.appendChild(div)
            data['meals'].forEach(datum => {
                let mealName = datum['strMeal']
                let mealID = datum['idMeal']
                if (mealName.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    divMatchingElement = document.createElement('div')
                    divMatchingElement.innerHTML = '<strong>' + mealName.substr(0, val.length) + '</strong>'
                    divMatchingElement.innerHTML += mealName.substr(val.length)
                    divMatchingElement.innerHTML += "<input id="+mealName.replace(/\s/g, "")+" type='hidden' value='" + mealName + "' class="+ mealID +">" 
                    divMatchingElement.addEventListener('click', e => {
                        let selectedInput = document.getElementById(mealName.replace(/\s/g, ""))
                        input.value = selectedInput.value
                        input.className = selectedInput.className
                        closeAllLists()
                    });
                    div.appendChild(divMatchingElement)
                }
            });

            input.addEventListener('keydown', e => {
                let autocompleteList = document.getElementById(input.id + 'autocompleteList')
                if (autocompleteList) autocompleteList = autocompleteList.getElementsByTagName("div")
                switch (e.keyCode) {
                    case 40:
                        currentFocus++
                        addActive(autocompleteList)
                        break;
                    case 38:
                        currentFocus--
                        addActive(autocompleteList)
                        break;
                    case 13:
                        e.preventDefault()
                        if (currentFocus > -1) {
                            if (autocompleteList) autocompleteList[currentFocus].click();
                        }
                }
            });
            
            function addActive(x) {
                if (!x) return false
                removeActive(x)
                if (currentFocus >= x.length) currentFocus = 0
                if (currentFocus < 0) currentFocus = (x.length - 1)
                x[currentFocus].classList.add("autocompleteActive")
            }
            function removeActive(x) {
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocompleteActive");
                }
            }
    
            function closeAllLists(elmnt) {
                var x = document.getElementsByClassName("autocompleteItems")

                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != input) {
                        x[i].parentNode.removeChild(x[i])
                    }
                }
            }
    
            document.addEventListener("click", e => {
                closeAllLists(e.target)
            });
        });
    });
}

fnAutocomplete(document.getElementById('myInput'))

function fnSearch() {
    let recipe = (document.getElementById('myInput'))
    window.localStorage.setItem('demo', recipe.className)
    window.localStorage.setItem('method', 'Search Bar')
    window.location = '/html/demo.html'
}

function fnGetRandomRecipe() {
    getDataFromApi('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(data => {
            window.localStorage.setItem('method', 'Random Recipe')
            window.localStorage.setItem('demo', data['meals'][0]['idMeal'])
            window.location = '/html/demo.html'
            console.log(data['meals'][0]['idMeal'])
        })
}

function fnGetRecipesByArea () {
    
}