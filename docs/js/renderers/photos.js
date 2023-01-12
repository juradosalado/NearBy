"use strict";

import { parseHTML} from "/js/utils/parseHTML.js";

import{usersAPI} from "/js/api/users.js";


const photoRenderer={

    asCard: function (photo){
        let html=`<div class="card" id=id-carta-foto>
                        <a href="photo_details.html?photoId=${photo.photoId}">
                            <img src="${photo.url}"
                                class="card-img-top"
                                alt="${photo.alt}">
                        </a>
                        
                        <div class="card-body" id=id-cuerpo-carta-foto>
                            <a href="photo_details.html?photoId=${photo.photoId}" id=id-link>
                                <h4 class="card-title text-left">${photo.title}</h4>
                            </a>
                            <h5 class="card-text text-left">${photo.description}</h5>
                            <a href="profile.html?userId=${photo.userId}" id=id-link>
                                <p class="text-right user-name"> </p>
                            </a>
                        </div>
                        
                    </div>
                    `;
                
                let card=parseHTML(html);
                loadUserNameCard(card, photo.userId);
                return card;
    },
    asDetails: function (photo){
        let fecha = new Date(photo.date);
        let fechaTransformada = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
        
        let visibilidad = photo.visibility;
        let visibilidadEspañol;
        if(visibilidad=="Public"){
            visibilidadEspañol= "pública";
        }else{
            visibilidadEspañol="privada";
        }
        
        let htmlDetails=`<div class="col-md">
                            <h1 id=id-titulo-imagen-detalle>${photo.title}</h1>
                            <h4>${photo.description}</h4>
                            <img src="${photo.url}" class="img-fluid" id=id-imagen-detalle alt="${photo.alt}">

                            <p></p>

                            <div class="row text-left">
                                <div class="col-md">
                                    <a href="profile.html?userId=${photo.userId}" id=id-link>
                                    <p class="text-left user-name"></p>
                                    </a>
                                    <p> ${fechaTransformada}</p>
                                </div>
                                <p>Visibilidad ${visibilidadEspañol}</p> 
                            </div>
                        </div>`
        let details=parseHTML(htmlDetails);
        loadUserNameCard(details, photo.userId);
        return details;
    }


}; //end of the object photoRenderer

//Session06: for asynchronously getting the user name
function loadUserNameCard(card, userId){
    usersAPI.getById(userId)
            .then(users => {
                let username= users[0].username;
                let p = card.querySelector("p.user-name");
                p.textContent= "@" + username;
                 }
            );
}

export{photoRenderer};