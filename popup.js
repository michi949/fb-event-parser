/**
 * @author michael reder
 * @copyright michael reder
 * tool to get events from facebook into a json file to use it in other apps
 * the use of it is only allowed with permission of michael reder
 */


function loadPopUp() {
    /** Only possible when on webserver, because popup cant take it from internal server
     document.getElementById("").src = chrome.runtime.getURL("32_weiß.png");
     */
}

var btn = document.getElementById("newJson");
if (btn) {
    btn.addEventListener("click", function () {
        chrome.runtime.sendMessage({type: "clearArray"}, null);
        console.log("clearArray");
    });
}

btn = document.getElementById("addEvent");
if (btn) {
    btn.addEventListener("click", function () {

        console.log("event added");
        chrome.runtime.sendMessage({type: "addEvent"}, null);
    });
}

btn = document.getElementById("showJsonBtn");
if (btn) {
    btn.addEventListener("click", function () {
        chrome.runtime.sendMessage({type: "toJson"}, function (response) {
            document.getElementById("showJson").innerText = response.showJson;
        });
        console.log("exported");

    });
}

btn = document.getElementById("copyJson");
if (btn) {
    btn.addEventListener("click", function () {

        console.log("Copy Json");
        chrome.runtime.sendMessage({type: "copyJson"}, null);
    });
}