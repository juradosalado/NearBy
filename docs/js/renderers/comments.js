"use strict";

import { parseHTML} from "/js/utils/parseHTML.js";

import{usersAPI} from "/js/api/users.js";

const commentRenderer={
    asCard : function(comment){
        let fecha = new Date(comment.date);
        let fechaTransformada = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
        
        let html =`<div class="card" id=id-carta-comentario>
        <div class="card-header" id=id-cabecera-carta-comentario>
            <a class="user-name" href="profile.html?userId=${comment.userId}" id=id-link-sobre-azul>
              </a>
        </div>
        <div class="card-body" id=id-cuerpo-carta-comentario>
          <blockquote class="blockquote mb-0">
            <p>${comment.text}</p>
            <footer id=id-texto-fecha>${fechaTransformada}</footer>
          </blockquote>
        </div>
      </div>`

      let comentario = parseHTML(html);
      loadUserNameCard(comentario, comment.userId);
      return comentario;
    }

}; //End of commentRenderer

function loadUserNameCard(card, userId){
    usersAPI.getById(userId)
            .then(users => {
                let username= users[0].username;
                let p = card.querySelector("a.user-name");
                p.textContent= "@" + username;
                 }
            );
}

export{commentRenderer};