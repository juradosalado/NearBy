"use strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";

import {sessionManager} from "/js/utils/session.js";
import{authAPI} from "/js/api/auth.js";

import{usersAPI} from "/js/api/users.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
let currentUser = null;

function main(){
    debugger;

    if(userId!= null){
        loadCurrentUser();
    }

    let registerForm= document.getElementById("id-register-form");

    registerForm.onsubmit= handleSubmitRegister;
}

function handleSubmitRegister(event){
    //alert("The form has been sent");
    //debugger;

    event.preventDefault();

    let form = event.target;
    let formData= new FormData(form);


    let errors = userValidator.validateRegister(formData);
    
    if(errors.length>0){ //the user has filled in some fields in an incorrect way
        let errorDiv = document.getElementById("errors");
        errorDiv.innerHTML = "";
        for (let error of errors){
            messageRenderer.showErrorMessage(error);
        }
        //Funcion que te devuelva al top de la página
        //event.preventDefault();
    }else sendRegister(formData);

}//End of function handlerSubmitRegister

function sendRegister (formData){
    debugger;
    if(currentUser==null){
        authAPI.register(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }else{
        usersAPI.update(userId, formData)
            .then(data=> window.location.href = "index.html")
            .catch(error=> messageRenderer.showErrorMessage(error));
    }

}

function loadCurrentUser(){
    debugger;
    let cardTitle = document.getElementById("id-card-title");
    let cardText = document.getElementById("id-card-text");
    let pageTitle = document.getElementById("id-page-title");

    let name = document.getElementById("id-nombre-input");
    let lastName = document.getElementById("id-apellidos-input");
    let telephone = document.getElementById("id-telefono-input");
    let email = document.getElementById("id-email-input");
    let username = document.getElementById("id-usuario-input");
    let urlPhoto = document.getElementById("id-url-input");
    let botonSubmit = document.getElementById("id-boton-submit");


    cardText.textContent ="Por favor, modifique los datos que desea cambiar de su perfil";
    cardTitle.textContent ="Editando su perfil";
    pageTitle.textContent = "Editar perfil";
    botonSubmit.textContent= "Guardar cambios";

    usersAPI.getById(userId)
        .then(users=> {
            currentUser= users[0];
            name.value = currentUser.firstName;
            lastName.value = currentUser.lastName;
            telephone.value = currentUser.telephone;
            email.value= currentUser.email;
            username.value=currentUser.username;
            urlPhoto.value= currentUser.avatarUrl;
            

        })
        .catch(error=> messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);