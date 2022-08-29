var areas = []
var allOpened = false

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
            div.setAttribute("onclick", "fnSaludar()")
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