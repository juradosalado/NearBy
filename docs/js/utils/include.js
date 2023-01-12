'use strict';

let include = (htmlFile, selector) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', htmlFile, false); //Turns synchronous
    xhr.addEventListener('load', () => {
        if (xhr.readyState == 4 && xhr.status == "200") {
            document.querySelector(selector).innerHTML += xhr.responseText;
        }
        else {
            console.error(htmlFile + " does not exist");
        }
    });
    xhr.send();
}

window.include = include;