"use strict";

const userValidator = {
    validateRegister : function (formData){
        let firstName = formData.get("firstName"); //False Friend, hay que pasarle el nombre, no el id
        let lastName = formData.get("lastName");
        let password = formData.get("password");
        let passwordPrime = formData.get("passwordPrime");
        let userUrl = formData.get("avatarUrl");
        let telephone = formData.get("telephone");

        let allowedExtension = ['jpeg', 'jpg'];
        let fileExtension = userUrl.split('.').pop().toLowerCase();
        

        let errors=[];

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

        if(firstName.length<3){
            errors.push("El nombre debe contener al menos 3 caracteres");
        }

        if(lastName.length<3){
            errors.push("El apellido debe contener al menos 3 caracteres");
        }

        if(password.length<10){
            errors.push("La contraseña debe tener una longitud de al menos de 10 caracteres");
        }

        if(password !== passwordPrime){
            errors.push("Las contraseñas deben coincidir");
        }

        if(telephone.length!=9){
            errors.push("El número de teléfono ha de ser de 9 dígitos");
        }

        return errors;
    }//End of method validateRegister
};//End of object userValidator

export { userValidator };