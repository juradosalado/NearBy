"use strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";

import {sessionManager} from "/js/utils/session.js";
import{authAPI} from "/js/api/auth.js";

function main(){
    debugger;
    console.log("Prueba");
    let loginForm = document.getElementById("id-login-form");
    loginForm.onsubmit = handleSubmitLogin;
}

function handleSubmitLogin(event){
    debugger;
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let contraseña = form.elements[1].value;

    authAPI.login(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href ="index.html";
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);