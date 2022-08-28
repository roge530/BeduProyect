var areas = []
function fnSaludar() {
    console.log('hola')
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
            console.log(areas.length)
        })
}
fnAllAreas()
function fnPrintAllAreas() {
    let fragment = new DocumentFragment()
    areas = areas.filter(area => area != 'Canadian' || area != 'Mexican')
    areas.forEach(area => {
        let div = document.createElement('div')
        div.setAttribute("id", area)
        div.setAttribute("onclick", fnSaludar())
        div.innerHTML = '<p>'+area+'</p>'
        fragment.appendChild(div)
    })
    let divArea = document.querySelector('#areas')
    divArea.appendChild(fragment)
}