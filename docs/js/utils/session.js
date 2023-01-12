'use strict';

// Time in seconds during which the session token is valid
const TOKEN_VALIDITY_TIME = 86400;

const sessionManager = {

    login: function (sessionToken, userData) {
        localStorage.setItem("sessionToken", sessionToken);
        localStorage.setItem("sessionTokenTime", new Date().getTime());
        localStorage.setItem("loggedUserData", JSON.stringify(userData));
    },

    logout: function () {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("sessionTokenTime");
        localStorage.removeItem("loggedUserData");
    },

    getToken: function () {
        let token = localStorage.getItem("sessionToken");

        // Logout if the token has expired
        if (token !== null) {
            let currentDate = new Date().getTime();
            let tokenDate = localStorage.getItem("sessionTokenTime");
            let diff = currentDate - tokenDate;

            if (diff > TOKEN_VALIDITY_TIME * 1000) {
                console.error("The session has expired, logging out.");
                this.logout();
                token = null;
            }
        }

        return token;
    },

    isLogged: function () {
        return this.getToken() !== null;
    },

    getLoggedUser: function () {
        return JSON.parse(localStorage.getItem("loggedUserData"));
    },

    getLoggedId: function () {
        return this.isLogged() ? this.getLoggedUser().userId : null;
    }
};

export { sessionManager };
