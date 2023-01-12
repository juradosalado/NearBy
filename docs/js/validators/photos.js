"use strict";

const photoValidator = {
    validateRegister : function(formData){
        let photoUrl = formData.get("url");
        let allowedExtension = ['jpeg', 'jpg'];
        let errors=[];
        let fileExtension = photoUrl.split('.').pop().toLowerCase();
        let isValid = false;
        for(let index in allowedExtension){
            if(fileExtension===allowedExtension[index]){
                isValid=true;
                break;
            }
        }

        if(!isValid){
            errors.push("La url de la publicación debe ser de formato jpg");
        }

        return errors;

    }//End of method validatePhoto
};//End of object 

export{photoValidator};