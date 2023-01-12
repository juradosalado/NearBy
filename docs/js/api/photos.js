"use strict";

import {BASE_URL, requestOptions} from "./common.js";

import {parseHTML} from "/js/utils/parseHTML.js";

import{usersAPI} from "/js/api/users.js";

const photosAPI={
    getAll : function(){
        return new Promise(function(resolve, reject){
            axios
                .get(`${BASE_URL}/photos`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },

    getById : function(photoId){
        return new Promise(function(resolve, reject){
            axios
                .get(`${BASE_URL}/photos/${photoId}`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },

    create : function(formData){
        return new Promise(function (resolve, reject){
            axios
                .post(`${BASE_URL}/photos`, formData, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error=> reject(error.response.data.message));
        });
    },

    update : function (photoId, formData){
        return new Promise (function (resolve, reject){
            axios
                .put(`${BASE_URL}/photos/${photoId}`, formData, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    delete : function (photoId){
        return new Promise (function (resolve, reject){
            axios
                .delete(`${BASE_URL}/photos/${photoId}`, requestOptions)
                .then(response=> resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export{photosAPI};