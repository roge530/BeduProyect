import css from "../css/style.css";
import image1 from '../assets/web_image_01.jpg';
import image2 from '../assets/footer_03_04.jpg';

const footerImgholder = document.getElementById('footerImgholder');
const imagePlaceholder = document.getElementById('imageHolder');

//

imagePlaceholder.src = image1;
footerImgholder.src = image2;
    const p = document.createElement('p');
    p.textContent = 'Hola rox bonita';
    document.getElementById("unDiv").append(p);

    
//destucturing
//const [data] = JSON.parse(this.responseText)

