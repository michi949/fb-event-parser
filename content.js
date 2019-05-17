/**
 * @author michael reder
 * @copyright michael reder
 * tool to get events from facebook into a json file to use it in other apps
 * the use of it is only allowed with permission of michael reder
 */

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.giveMe === "giveMe") {

            try {
                var obj = {
                    name: "",
                    description: "",
                    imgurl: "",
                    date: "",
                    location: document.getElementsByClassName("_5xhk")[1].innerText,
                    adress: document.getElementsByClassName("_5xhp")[1].innerText,
                    weburl: location.href
                };

                var ranges = [
                    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
                    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
                    '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
                    '\ud83d[\ude00-\ude4e]'
                ];

                var parseemojetitle = document.getElementById("seo_h1_tag").innerText;
                parseemojetitle = parseemojetitle.replace(new RegExp(ranges.join('|'), 'g'), '');
                obj.name = parseemojetitle;
                
                var parseemojedes = document.getElementsByClassName("_63ew")[0].innerText;
                parseemojedes = parseemojedes.replace(new RegExp(ranges.join('|'), 'g'), '');
                //another way but to shit..ö
                //parseemoje = parseemoje.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, '');
                obj.description = parseemojedes;

                var tmpTime = document.getElementsByClassName("_2ycp")[0].attributes[1].value;
                tmpTime = tmpTime.split("");
                var months = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];
                var monthShort = parseInt(tmpTime[5] + tmpTime[6]);
                monthShort = months[monthShort - 1];
                var timeHour = parseInt(tmpTime[11] + tmpTime[12]);
                timeHour = timeHour;
                var unixTimeString = tmpTime[8] + tmpTime[9] + "-" + monthShort + "-" + tmpTime[0] + tmpTime[1] + tmpTime[2] + tmpTime[3] + " " + timeHour + ":" + tmpTime[14] + tmpTime[15] + ":00";
                obj.date = Date.parse(unixTimeString)/1000;
                obj.date = obj.date + 32400;
                //7h unterschied

                /**
                 * if its a event with vid it fill the field with vid
                 * if its a event with pic its get checkt wich one and adds it
                 * @type {Element}
                 */
                var tmpClass = document.getElementsByClassName("_3kwh")[0];
                if (tmpClass.children[0].children[0].classList.contains("_3ojl")) {
                    tmpClass = document.getElementsByClassName("_3ojl")[0];
                    if (tmpClass.children[0].classList.contains("scaledImageFitHeight")) {
                        obj.imgurl = document.getElementsByClassName("scaledImageFitHeight")[0].src;
                    } else if (tmpClass.children[0].classList.contains("scaledImageFitWidth")) {
                        obj.imgurl = document.getElementsByClassName("scaledImageFitWidth")[0].src;
                    } else {
                        obj.imgurl = "wrong";
                    }
                } else {
                    obj.imgurl = "video";
                }

                console.log(obj.name);
                console.log(obj.description);
                console.log(obj.imgurl);
                console.log(obj.date);
                console.log(obj.location);
                console.log(obj.adress);

                sendResponse({backTo: obj});
            } catch (err) {
                sendResponse({backTo: ""});
            }

        } else {
            sendResponse({backTo: "badContent"});
        }
    });