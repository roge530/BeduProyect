import css from "../css/recipe.css";
import logo from '../assets/icon.png'
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
    getDataFromApi(recipeURL)
    .then(
        retrievedValues=>{
            const mealNameDOM= document.querySelector('#mealID')
            const instructionsDOM= document.querySelector('#instructions')
            const ingListDOM= document.querySelector("#ingredients")
            const videoDOM=document.querySelector("#videoContainer")
            

            const retrievedValuesArray= Object.entries(retrievedValues.meals[0]);
            const filteredArray=filterArray(retrievedValuesArray)
            
            //Get meal name
            const mealName=dataFilter(filteredArray,'strMeal')[0][1]
            
            //Get ingredients
            const ingArray=dataFilter(filteredArray,'Ingredient')
            const ingredients=ingArray.map(function(element){
                
                return element[1]
            })

            
            //Get procedure
            const procedure1=dataFilter(filteredArray,'strInstruction')[0][1]


            //Get image
            const recipeImg=dataFilter(filteredArray,'strMealThumb')[0][1]

            //Get youtube video
            try{ dataFilter(filteredArray,'strYoutube')
            const videoURL=dataFilter(filteredArray,'strYoutube')[0][1].replace("watch?v=","embed/")
            videoDOM.setAttribute("src",`${videoURL}?controls=0`)
        }catch{
            videoDOM.setAttribute("alt",`Not available video`)
            }
            

            //DOM Render
            document.querySelector('#recipeImg').src=recipeImg
            

            mealNameDOM.textContent=mealName;
            instructionsDOM.textContent=procedure1;

            ingredients.forEach(element => {
                let node= document.createElement("p");
                let textNode=document.createTextNode(element);
                node.appendChild(textNode);
                ingListDOM.appendChild(node);
                // const icon=`<i class="fa fa-star" aria-hidden="true"><span>  ${element}</span> </i> <br>
                // <br>` ;
                // ingListDOM.insertAdjacentHTML('beforeend', icon);
                //node.insertAdjacentHTML('afterend', '</i>');
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
document.getElementById('logo').setAttribute('src',logo)