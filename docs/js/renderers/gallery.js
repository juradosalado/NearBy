"use strict";

import {parseHTML} from "/js/utils/parseHTML.js";
import {photoRenderer} from "/js/renderers/photos.js";

const galleryRenderer = {
    asCardGallery : function(photos){
        let photosSorted = photos.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });
        let str= `<div class="photo-gallery"></div>`;
        let galleryContainer = parseHTML(str);



        //Creado por mi
        str=`<div class="row text-center">
                 <div class="col-md-4"></div>
                 <div class="col-md-4"></div>
                 <div class="col-md-4"></div>
            </div>`;
        let row = parseHTML(str);

        galleryContainer.appendChild(row);
        let counter=0;
        for(let photo of photosSorted){
            let card= photoRenderer.asCard(photo);
            let columna = row.children[counter%3];
            counter++;
            columna.appendChild(card);
            let strHr = "<hr>";
            let espaciado = parseHTML(strHr);
            columna.appendChild(espaciado);
        }

        //Creado por mi

        /*str='<div class="row"></div>';
        let row = parseHTML(str);

        galleryContainer.appendChild(row);
        let counter=0;

        for(let photo of photos){
            let card= photoRenderer.asCard(photo);
            row.appendChild(card);
            counter++;
            if(counter % 3 === 0){
                row = parseHTML(`<div class="row"></div>`);
                galleryContainer.appendChild(row);
            }
        }*/
        return galleryContainer;
    }
};

export{galleryRenderer};