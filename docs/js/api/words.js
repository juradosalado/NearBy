"use strict";

import {BASE_URL, requestOptions} from "./common.js";

const wordsAPI={
    getAll : function(){
        return new Promise(function(resolve, reject){
            axios
                .get(`${BASE_URL}/words`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },
}

export{wordsAPI};