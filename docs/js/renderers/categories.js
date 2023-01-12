"use strict";

import { parseHTML} from "/js/utils/parseHTML.js";

const categoryRenderer={
    asLink : function(category){
        let html=`<h5><a href="categories.html?name=${category.name}" class="badge badge-dark">${category.name}</a></h5>`
        let link = parseHTML(html);
        return link;
    }

};

export{categoryRenderer};