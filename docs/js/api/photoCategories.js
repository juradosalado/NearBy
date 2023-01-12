"use strict";

import {BASE_URL, requestOptions} from "./common.js";

const photoCategoriesAPI={
    get_by_name : function(name){
        return new Promise(function(resolve, reject){
            axios
                .get(`${BASE_URL}/photoCategories/${name}`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },

    get_by_photoId : function(photoId){
        return new Promise(function (resolve, reject){
            axios 
                .get(`${BASE_URL}/photoCategories/v2/${photoId}`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },

    create : function(formData){
        return new Promise(function (resolve, reject){
            axios
                .post(`${BASE_URL}/photoCategories`, formData, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },

    delete_all : function (photoId){
        return new Promise (function (resolve, reject){
            axios
                .delete(`${BASE_URL}/photoCategories/${photoId}`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },





};

export{photoCategoriesAPI};