import css from "../css/style.css";
import image2 from '../assets/jk.PNG';

const imageTest= document.getElementById('roxi');
imageTest.src=image2;

const p = document.createElement('p');
    p.textContent = 'Hola rox bonita';
    document.getElementById("unDiv").append(p);
//destucturing
//const [data] = JSON.parse(this.responseText)

