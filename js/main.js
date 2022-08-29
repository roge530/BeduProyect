import css from "../css/style.css";
import image1 from '../assets/web_image_01.jpg';

const imagePlaceholder= document.getElementById('imageHolder');
imagePlaceholder.src=image1;

const p = document.createElement('p');
    p.textContent = 'Hola rox bonita';
    document.getElementById("unDiv").append(p);
//destucturing
//const [data] = JSON.parse(this.responseText)

