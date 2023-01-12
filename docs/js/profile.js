"use strict";


import{messageRenderer} from "/js/renderers/messages.js";
import{userRenderer} from "/js/renderers/users.js";
import{photoRenderer} from "/js/renderers/photos.js";
import{galleryRenderer} from "/js/renderers/gallery.js";
import {usersAPI} from "/js/api/users.js";
import {photosAPI} from "/js/api/photos.js";
import { sessionManager } from "./utils/session.js";


debugger;
let urlParams = new URLSearchParams(window.location.search);
let userId;
let userLoggedId;
let isLogged = sessionManager.isLogged();
if(isLogged){
    userLoggedId= sessionManager.getLoggedUser().userId;
}
//por defecto toma como userId el del perfil que se pasa como parametro
userId = urlParams.get("userId");
//Si al tomarlo de los parametros es null (lo que significa que entramos desde "Tu perfil"
//y que el usuario desea cargar su propio perfil), se asigna como
//userId el del usuario logeado.
if(userId==null && sessionManager.isLogged()){
    userId = sessionManager.getLoggedUser().userId;
}

function main(){
    let profileContainer = document.querySelector("div.container");

   usersAPI.getById(userId)
        .then(users=>{
            let userDetails = userRenderer.asDetails(users[0]);
            profileContainer.appendChild(userDetails);
            addPhotos();
        })
        .catch(error=> messageRenderer.showErrorMessage(error));
    
        /*let editProfile = document.querySelector("#id-boton-editar");
        editProfile.onclick = handleEdit;*/

        let logOut = document.querySelector("#id-boton-logout");
        logOut.onclick= handleLogout;

        hideLogOut();
}

function hideLogOut(){
    let colLogOut = document.querySelector("#id-div-logOut");
    if(userLoggedId!=userId){
        colLogOut.style.display = "none";
    }
}

function handleLogout(event){
    let answer = confirm("¿Está seguro de que quiere cerrar sesión?");
    if(answer){
        sessionManager.logout();
        window.location.href = "index.html";
    }
}

/*function handleEdit(event){
    window.location.href ="register.html?userId=" + userId;
}*/


function addPhotos(){
    let profileContainer = document.querySelector("div.container");

    photosAPI.getAll()
        .then(photos=> {
            const fotosFiltradas = photos.filter(photo=> photo.userId == userId && (photo.visibility == "Public" || photo.userId == userLoggedId));
            let gallery = galleryRenderer.asCardGallery(fotosFiltradas);
            profileContainer.appendChild(gallery);
        })
        .catch(error=> messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);