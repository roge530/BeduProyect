document.getElementById('metodo').append(window.localStorage.getItem('method'))
document.getElementById('mealID').append(window.localStorage.getItem('demo'))

function fnSearch() {
    let recipe = (document.getElementById('myInput'))
    window.localStorage.setItem('demo', recipe.className)
    window.localStorage.setItem('method', 'Search Bar')
    window.location = '/html/demo.html'
}


document.getElementById('metodo').append(window.localStorage.getItem('method'))
document.getElementById('mealID').append(window.localStorage.getItem('demo'))
const foodName= localStorage.getItem('demo')
const baseURL='https://www.themealdb.com/api/json/v1/1/lookup.php?i='
let recipeURL=baseURL+foodName


function getDataFromApi(urlApi) {
    return fetch(urlApi)
    .then(response => 
         response.json()
    )
};

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    getDataFromApi(recipeURL)
    .then(
        retrievedValues=>{
            const retrievedValuesArray= Object.entries(retrievedValues.meals[0]);
            const filteredArray=filterArray(retrievedValuesArray)
            //console.log(filterArray(retrievedValuesArray))
            
            //Get meal name
            console.log(dataFilter(filteredArray,'strMeal')[0][1])
            const mealName=dataFilter(filteredArray,'strMeal')[0][1]
            
            //Get ingredients
            //console.log(dataFilter(filteredArray,'Ingredient'))
            const ingArray=dataFilter(filteredArray,'Ingredient')
            const ingredients=ingArray.map(function(element){
                
                return element[1]
            })
            console.log(ingredients)

            
            //Get procedure
            console.log(dataFilter(filteredArray,'strInstruction')[0][1])
            const procedure1=dataFilter(filteredArray,'strInstruction')[0][1]
            //DOM Render

            const mealNameDOM= document.querySelector('#mealID')
            const instructionsDOM= document.querySelector('#instructions')
            const ingListDOM= document.querySelector("#ingredients")

            mealNameDOM.textContent=mealName;
            instructionsDOM.textContent=procedure1;

            ingredients.forEach(element => {
                let node= document.createElement("p");
                let textNode=document.createTextNode(element);
                node.appendChild(textNode)
                ingListDOM.appendChild(node);


            });
           // ingListDOM.textContent=ingListDOM;
        }
        )
});


//Clear null and empty data from the arrayResult from object
function filterArray(arrayData) {
    return arrayData.filter(function(entry){
        let validation=entry[1]!=false &&entry[1]!=null
        return validation     
    })
}

//Get recipie Name
function dataFilter(dataArray, filter){
    return dataArray.filter(function(entry,index){
        let validation= entry[0].includes(filter)
        return validation
    })
}