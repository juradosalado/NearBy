"use strict";
import { parseHTML} from "/js/utils/parseHTML.js";
import{photosAPI} from "/js/api/photos.js";
import{photoRenderer} from "/js/renderers/photos.js";
import{messageRenderer} from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import{ratingsAPI} from "/js/api/ratings.js";
import { commentsAPI } from "./api/comments.js";
import{photoCategoriesAPI} from "./api/photoCategories.js";
import{categoryRenderer} from "/js/renderers/categories.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId;
let photoUserId;
let isPrivate = false;
let isLogged = sessionManager.isLogged();
if(isLogged){
    userId = sessionManager.getLoggedUser().userId;
}

function main(){
    let photoRow = document.querySelector("div.row");
    let photoCol = document.querySelector("#id-div-referencia");
    let rateH = document.querySelector("#id-rate-value");
    let divCategories = document.querySelector("#id-div-categorias");

    photosAPI.getById(photoId)
        .then(photos=> {
            let photo = photos[0];
            let photoDetails = photoRenderer.asDetails(photo);
            photoRow.insertBefore(photoDetails, photoCol);
            photoUserId = photos[0].userId;
            isPrivate = photos[0].visibility == "Private";
            hideActionsBottons(); //En esta sección para que no haya problemas en la ejecución del código por asincronia
            
            //renderiza las categorías de la publicación:
            photoCategoriesAPI.get_by_photoId(photoId)
                .then(names=> {
                    for(let name of names){
                        let link = categoryRenderer.asLink(name);
                        divCategories.appendChild(link);
                    }
                })
                //Suponemos que si hay fallo es porque la publicación carece de categorías
                //por lo que el título de "Categorias" no debe aparecer
                .catch(error=>{
                    let html = `<h5> Publicación sin categorías</h5>`;
                    let h5 = parseHTML(html);
                    divCategories.appendChild(h5);
                }); 
            })
        .catch(error=> messageRenderer.showErrorMessage(error));
    
    debugger;
    
    //renderiza la puntuación
    ratingsAPI.get_by_photoId(photoId)
        .then(ratings=>{
            let average = averageRate(ratings);
            rateH.textContent = rateH.textContent + " " + average.toString();
        })
        .catch(error=> rateH.textContent = rateH.textContent + " Sin calificaciones por el momento");

    //Al p de puntuacion media textContent = media.toString

    let deleteBtn = document.querySelector("#id-boton-eliminar");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#id-boton-editar");
    editBtn.onclick = handleEdit;

    let rateform = document.querySelector("#id-formulario-puntuar");
    rateform.onsubmit = handleRate;

    let commentsBtn = document.querySelector("#id-boton-comentarios");
    commentsBtn.onclick = handleComments;

}

function averageRate(ratings){
    if(ratings.length==0){
        return 0;
    }else{
        let sum= 0.;
        for(let i=0; i<ratings.length; i++){
            sum += ratings[i].rate;
        }
        return (sum/(ratings.length)).toFixed(2);
    }
}

function handleRate(event){
    debugger;
    event.preventDefault();
    let form = event.target;
    //let arg = form.elements[0];
    //console.log(form));
    let formData = new FormData(form);
    
    formData.append("userId", userId);
    formData.append("photoId", photoId);
    ratingsAPI.create(formData)
            .then(data=>{
                window.location.href="photo_details.html?photoId=" + photoId;
                //messageRenderer.showSuccessMessage("¡Gracias por valorar la publicación!");
            })
            .catch(error=> messageRenderer.showErrorMessage(error));
}

function handleDelete(event){
    commentsAPI.get_by_photoId(photoId)
        .then(comments=>{
            //Si obtiene comentarios, devuelve un error
            messageRenderer.showErrorMessage("No se puede eliminar una publicación con comentarios");
        })
        .catch(error=>{
            //si falla al obtener sus comentarios es que no los tiene, te permite eliminar la publicación
            let answer = confirm("¿Está seguro de que desea eliminar la publicación?");

            if(answer){
                photosAPI.delete(photoId)
                        .then(data=> window.location.href = "index.html")
                        .catch(error=> messageRenderer.showErrorMessage(error));
            }

        });
}

function handleEdit(event){
    window.location.href = "edit-photo.html?photoId=" + photoId;
};

function handleComments(event){
    window.location.href = "comments.html?photoId=" + photoId;
}

function hideActionsBottons(){
    debugger;
    let colEsconder = document.querySelector("#id-div-esconder");
    let colEsconderLogged = document.querySelector("#id-div-botones-logged");
    let commentsBtn = document.getElementById("id-boton-comentarios");

    if(isPrivate){
        commentsBtn.style.display = "none";
    }

    if(!sessionManager.isLogged()){
        colEsconder.style.display = "none";
    }
    if(userId!=photoUserId){
        colEsconderLogged.style.display = "none";

    }
}


document.addEventListener("DOMContentLoaded", main);