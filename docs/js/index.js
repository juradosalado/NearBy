"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import{galleryRenderer} from "/js/renderers/gallery.js";
import{photosAPI} from "/js/api/photos.js";
import{messageRenderer} from "/js/renderers/messages.js";
import { sessionManager } from "./utils/session.js";

let userLoggedId;
let isLogged = sessionManager.isLogged();
if(isLogged){
    userLoggedId= sessionManager.getLoggedUser().userId;
}


//debugger;
//console.log(photoRenderer);

function main(){
    //From previous sessions but still useful in session06
    let container = document.querySelector("div.container");

    //Session06
    photosAPI.getAll()
        .then(photos=> {
            const fotosFiltradas = photos.filter(photo=> photo.visibility== "Public" || photo.userId == userLoggedId);
            let gallery = galleryRenderer.asCardGallery(fotosFiltradas);
            container.appendChild(gallery);
        })
        .catch(error=> messageRenderer.showErrorMessage(error));



}//Fin de función main

/*function clickHandler(event){
    alert("Has clickeado en el botón");
}

function enterHandler(event){
    let target= event.target;
    target.classList.remove("btn-info");
    target.classList.add("btn-danger");
}

function leaveHandler(event){
    let target= event.target;
    target.classList.remove("btn-danger");
    target.classList.add("btn-info");
}*/

document.addEventListener("DOMContentLoaded", main);