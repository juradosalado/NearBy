"use strict";

import { parseHTML} from "/js/utils/parseHTML.js";
import{photoCategoriesAPI} from "/js/api/photoCategories.js"
import { galleryRenderer } from "./renderers/gallery.js";
import{messageRenderer} from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let categoryName = urlParams.get("name");
//Pone la primera letra en mayúsculas:
let categoryNameUpperCase = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

function main(){
    let container = document.querySelector("#id-contenedor-fotos");
    let titulo = `<div class="row text-center">
                    <div class="col-md" id="id-titulos">
                        <p></p>
                        <h2 id="id-title" class="text-left">${categoryNameUpperCase}</h2>
                        <p></p>
                    </div>
                </div>`;
    let titulohtml = parseHTML(titulo);

    photoCategoriesAPI.get_by_name(categoryName)
        .then(photos=>{
            let gallery = galleryRenderer.asCardGallery(photos);
            container.appendChild(gallery);
        })
        .catch(error=> messageRenderer.showErrorMessage(error));



    container.appendChild(titulohtml);

}



document.addEventListener("DOMContentLoaded", main);