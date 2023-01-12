"use strict";


import{messageRenderer} from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import{commentsAPI} from "/js/api/comments.js";
import{commentRenderer} from "/js/renderers/comments.js";
import {parseHTML} from "/js/utils/parseHTML.js";
import { wordsAPI } from "./api/words.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId;
let isLogged = sessionManager.isLogged();
if(isLogged){
    userId = sessionManager.getLoggedUser().userId;
}

function main(){

    let div = document.querySelector("#id-cartas-comentarios");
    let createForm = document.getElementById("id-create-comment-form");
    createForm.onsubmit = checkComment;
    commentsAPI.get_by_photoId(photoId)
        .then(comments=>{
            //Función básica que ordena por fecha de la más a la menos reciente
            let commentsSorted = comments.sort(function(a, b){
                return new Date(b.date) - new Date(a.date);
            });
            for(let comment of commentsSorted){
                debugger;
                let card = commentRenderer.asCard(comment);
                let srtHr = "<p></p>";
                let espaciado = parseHTML(srtHr);
                div.appendChild(card);
                div.appendChild(espaciado);
            }
            hideCreate();
        })
        .catch(error=>{
            //Asumimos que los errores se darán por falta de comentarios
            //messageRenderer.showErrorMessage(error);
            hideCreate();
            messageRenderer.showMessageAsAlert("Publicación sin comentarios por el momento", "warning");

        } );

    console.log("Prueba");
}

function checkComment(event){
    event.preventDefault();
    let form = event.target;
    let text = form.elements[0];
    let inappropriateWords = false;
    let textValue = text.value.toLowerCase();

    //texto donde se guarda el mensaje de error
    let errorTxt ="";

    wordsAPI.getAll()
        .then(words=>{
            for(let i=0; i<words.length; i++){
                if(textValue.includes(words[i].word)){
                    errorTxt = `El comentario contiene la palabra inapropiada "` + words[i].word + `". Por favor, revíselo.`;
                    inappropriateWords = true;
                }//fin del if
            }//fin del for

            if(inappropriateWords==true){
                messageRenderer.showErrorMessage(errorTxt);

            }else{
                
                handleCreate(form);
            }
        })
        .catch(error=> messageRenderer.showErrorMessage(error));
}

function handleCreate(form){
    let formData = new FormData(form);
    formData.append("photoId", photoId);
    formData.append("userId", userId);

    commentsAPI.create(formData)
        .then(data=> window.location.href="comments.html?photoId=" + photoId)
        .catch(error=> messageRenderer.showErrorMessage(error));
}

function hideCreate(){
    let colEsconder = document.getElementById("id-col-create-comment");
    if(!sessionManager.isLogged()){
        colEsconder.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);