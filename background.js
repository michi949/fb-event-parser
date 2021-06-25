/**
 * @author michael reder
 * @copyright michael reder
 * tool to get events from facebook into a json file to use it in other apps
 */

var objArray;
var jsonString;


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "addEvent") {

        if (typeof objArray === "undefined") {
            objArray = new Array();
        }

        chrome.tabs.query({url: ['https://www.facebook.com/events/*']}, function (tabs) {

            for (var r = 0; r < tabs.length; r++) {
                var currentTab = tabs[r];
                if (currentTab) {
                    chrome.tabs.sendMessage(tabs[r].id, {giveMe: "giveMe"}, function (response) {


                        var obj = response.backTo;

                        if (obj !== "") {
                            console.log(obj.name);
                            console.log(obj.description);
                            console.log(obj.imgurl);
                            console.log(obj.date);
                            console.log(obj.location);
                            console.log(obj.adress);

                            objArray.push(obj);
                        }
                    });
                }
            }
            alert("Es sollten " + tabs.length + " hinzugefügt worden sein, bitte prüfen!")
        });
    }


    if (request.type === "clearArray") {
        if (confirm("Alles löschen?")) {
            objArray = new Array();
        }
    }

    if (request.type === "toJson") {
        jsonString = JSON.stringify(objArray);
        sendResponse({showJson: jsonString});
    }

    if (request.type === "copyJson") {
        jsonString = JSON.stringify(objArray);
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = jsonString;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }

});

/**
 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "addEvent") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if(currentTab) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                console.log(response);
            });
            }
        });
    }

}); */


