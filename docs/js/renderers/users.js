"use strict";

import { parseHTML} from "/js/utils/parseHTML.js";

const userRenderer={
    asDetails: function (user){
        let htmlDetails=`<div>
                            <div class="row text-center">
                                <div class="col-md" id="id-contenedor-redondeador">
                                    <p></p>
                                    <img id=id-imagen-perfil src="${user.avatarUrl}">
                                </div><!--Fin primera columna de la primera fila-->

                            </div><!--Fin primera fila-->
                            <div class="row text-center">

                                <div class="col-md text-center">
                                    <h5>@${user.username}</h5>
                                    <h5>${user.firstName} ${user.lastName}</h5>
                                    <h5>${user.email}</h5>
                                </div>

                            </div><!--Fin segunda fila(usuario y email)-->
                            <hr>

                            <div class="row text-center">
                                <div class="col-md text-center">
                                    <h3 id=id-title>Publicaciones Recientes</h3>
                                </div>
                                <p></p>
                            </div><!--Fin fila publicaciones recientes-->
                            <p></p>
                        </div>`;
        let details=parseHTML(htmlDetails);
        return details;
    }
};//end of object userRenderer

export{userRenderer};