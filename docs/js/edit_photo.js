"use strict";

import { categoriesAPI } from "./api/categories.js";
import { photoCategoriesAPI } from "./api/photoCategories.js";
import { wordsAPI } from "./api/words.js";
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import{photoValidator} from "/js/validators/photos.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;
let userId = sessionManager.getLoggedId();
let maxIdPhotos; 
//Se utiliza para asignar las id manualmente y así saber cual será asignada

let superaLimite = false;

function main(){

    //Comprueba si edita o añade publicación:
    if(photoId != null){
        loadCurrentPhoto();
    }

    debugger;
    //Comprueba que el usuario no supere las 50 fotos
    photosAPI.getAll()
        .then(photos=> {
            let arrayId = [];
            for(let photo of photos){
                arrayId.push(photo.photoId);
            }
            maxIdPhotos = Math.max(...arrayId);

            const fotosFiltradas = photos.filter(photo=> photo.userId == userId);
            if(fotosFiltradas.length >=50 && photoId==null){
                superaLimite=true;
            }
            let registerForm= document.getElementById("id-form-photo-upload");
            registerForm.onsubmit = checkPhoto;
        })
        .catch(error=> messageRenderer.showErrorMessage(error));

}

function checkPhoto(event){
    event.preventDefault();
    let form= event.target;

    let alt = form.elements[3];
    let description = form.elements[2];
    let title = form.elements[1];

    let inappropriateWords = false;

    debugger;
    let titleValue = title.value.toLowerCase();
    let descriptionValue = description.value.toLowerCase();
    let altValue = alt.value.toLowerCase();
    console.log(titleValue);
    let errorTxt = "";
    //Comprueba que no contiene palabras inapropiadas
    wordsAPI.getAll()
        .then(words=> {
            for(let i=0; i<words.length; i++){
                if(titleValue.includes(words[i].word)
                || descriptionValue.includes(words[i].word)
                || altValue.includes(words[i].word)){
                    inappropriateWords=true;
                    errorTxt = `La publicación contiene la palabra inapropiada "` + words[i].word + `". Por favor, revísela.`;
                }//fin del if
            }//fin del for

            if(superaLimite==true){
                messageRenderer.showErrorMessage("Supera el límite de 50 publicaciones. Por favor, elimine al menos una publicación para publicar otra nueva.");
            }else if(inappropriateWords==true){
                messageRenderer.showErrorMessage(errorTxt);
                return 0;
            }else{
                handleSubmitPhoto(form);
            }
        })
        .catch(error=> messageRenderer.showErrorMessage(error));
}

//metodo que añade las categorías y publica/edita las fotos
//este método publica y edita las fotos para que no haya problemas con la asincronía.
function handleCategoriesAndPublish(form){
    debugger;
    let categories = form.elements[4].value.toLowerCase();
    let arrayCategories = categories.split(',');
    console.log(arrayCategories);

    //Codigo de prueba
    let formData = new FormData(form);

    categoriesAPI.get_all()
        .then(categories=>{
            //Creamos array con los nombres de las categorías ya existentes:
            let arrayNames = [];
            for(let categoria of categories){
                console.log(categoria.NAME);
                arrayNames.push(categoria.NAME);
            }
            console.log(arrayNames);

            //vamos creando el photoCategory y el category para cada categoría añadida a la foto
            for(let category of arrayCategories){
                debugger;
                //Crea el formulario para photoCategories
                let formPhotoCategory;
                let formDataPhotoCategory = new FormData(formPhotoCategory);
                if(photoId==null){
                    formDataPhotoCategory.append("photoId", maxIdPhotos+1);
                }else{
                    formDataPhotoCategory.append("photoId", photoId);
                }
                formDataPhotoCategory.append("name", category.trim());

                //Si la categoria ya está creada:
                if(arrayNames.includes(category.trim())){
                        //si la foto es nueva, se crea la foto y despues solo el photoCategory
                    if(photoId==null){
                        formData.append("userId", sessionManager.getLoggedId());
                        //Se añade manualmente la id, que es la maxima en la base de datos más uno,
                        //para que nunca coincida con ninguna otra.
                        formData.append("photoId", maxIdPhotos+1);

                        //si es la primera categoría, crea la foto y después la photocategoría
                        if(category==arrayCategories[0]){
                            photosAPI.create(formData)
                                .then(data=>{
                                    photoCategoriesAPI.create(formDataPhotoCategory)
                                        .then(data=>{
                                            if(category==arrayCategories[arrayCategories.length-1]){
                                                window.location.href = "index.html";
                                            }
                                        })
                                        .catch(error=> messageRenderer.showErrorMessage(error));
                                })
                                .catch(error=> messageRenderer.showErrorMessage(error));

                        //si es la última categoría, se crea la photocategory y se va a inicio:
                        }else if(category==arrayCategories[arrayCategories.length-1]){
                            photoCategoriesAPI.create(formDataPhotoCategory)
                                .then(datos=> window.location.href= "index.html")
                                .catch(error=> messageRenderer.showErrorMessage(error));
                        //si no es la primera ni la última, crea el photocategory y no hace nada después
                        //(Sigue con el bucle for)
                        }else{
                            photoCategoriesAPI.create(formDataPhotoCategory)
                                .catch(error=> messageRenderer.showErrorMessage(error));
                        }
                    
                    //si la foto ya está creada, crea el photoCategory y después la actualiza
                    }else{
                        photoCategoriesAPI.create(formDataPhotoCategory)
                        .then(datos=>{
                            //si es la última categoría, actualiza ya la foto. Si no, sigue añadiendo categorías
                            if(category==arrayCategories[arrayCategories.length-1]){
                                photosAPI.update(photoId, formData)
                                    .then(data=> window.location.href = "photo_details.html?photoId="+photoId)
                                    .catch(error=> messageRenderer.showErrorMessage(error));

                            }
                        

                        })
                        .catch(error=> messageRenderer.showErrorMessage(error));

                    }
                //Si no está creada la categoría, se crea primero:
                }else{
                    let formCategoy;
                    let formDataCategory = new FormData(formCategoy);
                    formDataCategory.append("name", category.trim());
                    //Comprueba que, si la foto aún no está creada, la cree
                    if(photoId==null && category==arrayCategories[0]){
                        formData.append("userId", sessionManager.getLoggedId());
                                //Se añade manualmente la id, que es la maxima en la base de datos más uno,
                                //para que nunca coincida con ninguna otra.
                        formData.append("photoId", maxIdPhotos+1);
                        photosAPI.create(formData)
                            .then(data=>{
                                categoriesAPI.create(formDataCategory)
                                    .then(data=>{
                                        photoCategoriesAPI.create(formDataPhotoCategory)
                                            .then(data=> {
                                                if(category==arrayCategories[arrayCategories.length-1]){
                                                    window.location.href = "index.html";
                                                }
                                            })
                                            .catch(error=> messageRenderer.showErrorMessage(error));//catch photoCreate
                                    })
                                    .catch(error=> messageRenderer.showErrorMessage(error)); //((Catch categoriCreate))
                            })
                            .catch(error=> messageRenderer.showErrorMessage(error)); //catch photoCreate
                    }else if(photoId==null){
                        categoriesAPI.create(formDataCategory)
                        .then(datos=> {

                            photoCategoriesAPI.create(formDataPhotoCategory)
                                .then(datos=>{
                                    if(category==arrayCategories[arrayCategories.length-1]){
                                        window.location.href="index.html";
                                    }
                                })
                                .catch(error=> messageRenderer.showErrorMessage(error));
                        })
                        .catch(error=> messageRenderer.showErrorMessage(error));


                    
                    //Si la foto ya está creada, se crea el photoCategory y se actualiza
                    }else{
                        categoriesAPI.create(formDataCategory)
                        .then(datos=> {
                            photoCategoriesAPI.create(formDataPhotoCategory)
                                .then(datos=>{
                                    //si es la última, actualiza ya la foto. Si no, sigue añadiendo categorías
                                    if(category==arrayCategories[arrayCategories.length-1]){
                                        photosAPI.update(photoId, formData)
                                            .then(data=> window.location.href = "photo_details.html?photoId="+photoId)
                                            .catch(error=> messageRenderer.showErrorMessage(error));
                                    }
                                
                                })
                                .catch(error=> messageRenderer.showErrorMessage(error)); //catch photocategoryCreate

                        })
                        .catch(error=> messageRenderer.showErrorMessage(error)); //catch del createCategory
                    

                    }
                }//fin del else (si no está creada la categoría)
            }//fin del for
        })
        .catch(error=> messageRenderer.showErrorMessage(error));//catch del categoriesgetAll



}

function handleSubmitPhoto(form){
    

    let formData = new FormData(form);

    let errors = photoValidator.validateRegister(formData);

    if(errors.length>0){
        let errorDiv = document.getElementById("errors");
        errorDiv.innerHTML= "";
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    }else{
        debugger;
        if(currentPhoto===null){

            handleCategoriesAndPublish(form);
        }else{
            //Resetea las categorías borrando las que ya tenía y despues invoca al metodo
            //que añade las categorías y publica las fotos
            photoCategoriesAPI.delete_all(photoId)
                .then(datos=>{
                    handleCategoriesAndPublish(form);

                })
                .catch(error=> messageRenderer.showErrorMessage(error));
        }

    }
    
}

function loadCurrentPhoto(){
    let cardTitle = document.getElementById("id-card-title");
    let pageTitle = document.getElementById("id-page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let altInput = document.getElementById("input-alt");
    let visibilityInput = document.getElementById("input-visibility");
    let categoriesInput = document.getElementById("input-categories")

    cardTitle.textContent= "Editando la publicación";
    pageTitle.textContent = "Editar publicación";

    photosAPI.getById(photoId)
        .then(photos=> {
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            altInput.value = currentPhoto.alt;
            visibilityInput.value = currentPhoto.visibility;
            categoriesInput.value = "";
            debugger;
            photoCategoriesAPI.get_by_photoId(currentPhoto.photoId)
                .then(photoCategories=>{
                    for(let category of photoCategories){
                        //Añade la primera sin comas, y el resto con ", "
                        if(category==photoCategories[0]){
                            categoriesInput.value = categoriesInput.value.concat(category.name);
                        }else{
                            categoriesInput.value = categoriesInput.value.concat(", ", category.name);
                        }
                    }
                })

        })
        .catch(error => messageRenderer.showErrorMessage(error));

}

document.addEventListener("DOMContentLoaded", main);