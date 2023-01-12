"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML} from "/js/utils/parseHTML.js";

function main(){
    //showUser();
    addLogoutHandler();
    hideHeaderOptions();
}

function showUser(){
    let title = document.querySelector("#id-navbar-title");
    //document.getElementById("id-navbar-title");
    let text;

    if(sessionManager.isLogged()){
        let username = sessionManager.getLoggedUser().username;
        text = "Hola @" +username;
    }else{
        text = "Near By";
    }
    title.textContent = text;
}

function addLogoutHandler(){
    let logoutButton = document.querySelector("#id-navbar-logout");

    logoutButton.addEventListener("click", function(){
        let answer = confirm("¿Está seguro de que quiere cerrar sesión?");
        if(answer){
            sessionManager.logout();
            window.location.href = "index.html";
        }
    });
}

function hideHeaderOptions(){
    let headerLogin = document.querySelector("#id-navbar-login");
    let headerRegister = document.querySelector("#id-navbar-register");
    let headerLogout = document.querySelector("#id-navbar-logout");
    let headerCreate = document.querySelector("#id-navbar-añadir-publicacion");
    let headerProfile = document.querySelector("#id-navbar-tu-perfil");

    if(sessionManager.isLogged()){
        headerLogin.style.display = "none";
        headerRegister.style.display ="none";
        
        let html = `<i class="fa fa-user" aria-hidden="true"></i>`;
        let icon = parseHTML(html);
        headerProfile.textContent = " " +sessionManager.getLoggedUser().username;

        //Función en js que añade un primer hijo, para que así salga el icono antes del texto y no al contrario
        headerProfile.prepend(icon);
    }else{
        headerLogout.style.display = "none";
        headerCreate.style.display = "none";
        headerProfile.style.display = "none";

    }
}

document.addEventListener("DOMContentLoaded", main);