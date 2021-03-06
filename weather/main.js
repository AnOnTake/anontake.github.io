/* User Variables */
let cityname = "Paris,fr";
let lat = "48.837985";
let lon = "2.395997";
let appid = "3ee4c5cdcac622727b68312127512f9a";
let xgridpoints = 4;
let ygridmultiplier = 4;
let ytextmultiplier = 2;
let smoothing = 3;

/* Variables */
let sunicon = "assets/png/004-sun.pngY.png";
let moonicon = "assets/png/027-moon phase.pngY.png";
let cloudyicon = "assets/png/001-cloudy.pngY.png";
let cloudynighticon = "assets/png/002-cloudy night.pngY.png";
let cloudsandsunicon = "assets/png/003-clouds and sun.pngY.png";
let thunderstormicon = "assets/png/006-thunderstorm.pngY.png";
let rainicon = "assets/png/007-rain.pngY.png";
let rainnighticon = "assets/png/014-rain.pngY.png";
let heavyrainicon = "assets/png/008-heavy-rain.pngY.png";
let stormicon = "assets/png/009-storm.pngY.png";
let rainandsunicon = "assets/png/010-rain.pngY.png";
let snowicon = "assets/png/011-snow.pngY.png";
let fogicon = "assets/png/022-fog.pngY.png";
let fognighticon = "assets/png/023-fog.pngY.png";
/* System Variables */
let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + appid;
let urlonecall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appid;
var canvas;
var ctx;
console.log(urlonecall);
/* Update Function */
function updateweather() {
    /* Get stylesheet */
    var style = getComputedStyle(document.body);
    /* Widget Animations */
    $.get(url,
        function(data, textStatus, jqXHR) {
            /* Parse Data */
            temp = Math.round((data.main.temp - 273.15) * 10) / 10;
            state = data.weather[0].main;
            city = data.name;
            country = data.sys.country;
            iconcode = data.weather[0].icon;
            /* Set Text */
            document.getElementsByClassName("city")[0].innerHTML = city + ", " + country;
            document.getElementsByClassName("temp")[0].innerHTML = temp + "°C";
            document.getElementsByClassName("state")[0].innerHTML = state;
            /* Get Appropriate Icon */
            iconsrc = "";
            switch (iconcode) {
                case "01d":
                    iconsrc = sunicon;
                    break;
                case "01n":
                    iconsrc = moonicon;
                    break;
                case "02d":
                    iconsrc = cloudsandsunicon;
                    break;
                case "02n":
                    iconsrc = cloudynighticon;
                    break;
                case "03d":
                    iconsrc = cloudyicon;
                    break;
                case "03n":
                    iconsrc = cloudyicon;
                    break;
                case "04d":
                    iconsrc = cloudyicon;
                    break;
                case "04n":
                    iconsrc = cloudyicon;
                    break;
                case "09d":
                    iconsrc = rainicon;
                    break;
                case "09n":
                    iconsrc = rainicon;
                    break;
                case "10d":
                    iconsrc = rainandsunicon;
                    break;
                case "10n":
                    iconsrc = rainnighticon;
                    break;
                case "11d":
                    iconsrc = thunderstormicon;
                    break;
                case "11n":
                    iconsrc = thunderstormicon;
                    break;
                case "13d":
                    iconsrc = snowicon;
                    break;
                case "13n":
                    iconsrc = snowicon;
                    break;
                case "50d":
                    iconsrc = fogicon;
                    break;
                case "50n":
                    iconsrc = fognighticon
                    break;
                default:
                    iconsrc = "error";
            }
            /* Set Icon*/
            document.getElementsByClassName("icon")[0].setAttribute("src", iconsrc);
        });
    /* Draw Plot*/
    /* Get Hourly Forecast */
    $.get(urlonecall, function(data, textStatus, jqXHR) {
        /* Get min and max for values */
        hourly = data.hourly;
        minhourlydt = hourly[0].dt;
        i = 0;
        maxtemp = hourly[0].temp;
        mintemp = hourly[0].temp;
        while (i < hourly.length) {
            if (maxtemp < hourly[i].temp) {
                maxtemp = hourly[i].temp;
            }
            if (mintemp > hourly[i].temp) {
                mintemp = hourly[i].temp;
            }
            i++;
        }
        /* Get Canvas Res */
        let canvasresx = document.getElementById("canvas").width;
        let canvasresy = document.getElementById("canvas").height;
        /* Set scale accordingly */
        scalex = canvasresx / 174300;
        scaley = canvasresy / (maxtemp - mintemp);
        /* Clear Canvas */
        ctx.clearRect(0, 0, canvasresx, canvasresy);
        /* Draw Plot */
        ctx.strokeStyle = style.getPropertyValue('--text-color-light');
        ctx.fillStyle = style.getPropertyValue('--text-color-light');
        ctx.lineWidth = Math.round(canvasresx / 1000);
        ctx.font = (canvasresx / 100).toString() + "px \"JetBrains Mono\"";

        /*Grid*/
        i = 0;
        while (i < xgridpoints + 1) {
            ctx.beginPath();
            ctx.moveTo(canvasresx * 0.9705 / xgridpoints * i, 0);
            ctx.lineTo(canvasresx * 0.9705 / xgridpoints * i, canvasresy);
            ctx.closePath();
            ctx.stroke();
            i++;
        }
        /* Draw Curve */
        ctx.beginPath();
        ctx.moveTo(0, (mintemp + (maxtemp - hourly[0].temp) / scaley) - 273.15);
        i = 0;
        while (i < hourly.length) {
            /* Find X,Y coordinates */
            x = ((hourly[i].dt - minhourlydt) * scalex);
            y = (maxtemp - hourly[i].temp) * scaley;
            xc = x;
            yc = y;
            try {
                xc = (x * smoothing + ((hourly[i + 1].dt - minhourlydt) * scalex)) / (smoothing + 1);
                yc = (y * smoothing + (maxtemp - hourly[i + 1].temp) * scaley) / (smoothing + 1);
            } catch (e) {}
            /* Draw Line */
            ctx.quadraticCurveTo(x, y, xc, yc);
            /* Draw Text */
            if (Number.isInteger(i / ytextmultiplier)) {
                tempdisplay = (Math.round((hourly[i].temp - 273.15) * 10) / 10).toString();
                textx = x - ((tempdisplay.length) * (canvasresx / 200));
                if (y < (canvasresx / 50)) {
                    texty = y + (canvasresx / 150);
                } else {
                    texty = y - (canvasresx / 150);
                }
                // ctx.fillText(tempdisplay, textx, texty);
                // ctx.strokeStyle = '#000000';
                // ctx.lineWidth = Math.round(canvasresx / 4000);
                ctx.strokeStyle = style.getPropertyValue('--text-color-light');
                ctx.fillStyle = style.getPropertyValue('--text-color-light');
                ctx.fillText(tempdisplay, textx, texty);
                ctx.lineWidth = Math.round(canvasresx / 2000);

            }
            i++;
        }
        ctx.stroke();
        ctx.closePath();
        document.getElementsByClassName("icon")[0].style.transform = "scale(1)";
    });
    console.log("updated");
}
$(document).ready(function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    updateweather();
    setInterval(updateweather, 60000);
    setInterval(checkdarkreader, 1000);
});
/* Check if dark reader is enabled */

// function checkdarkreader() {
//     if (!!document.getElementsByClassName("darkreader")[0]) {
//         /* Invert */
//         document.getElementsByClassName("icon")[0].style.filter = "invert(1)";
//         document.getElementsByClassName("tempplot")[0].style.filter = "invert(1)";
//     } else {
//         /* Revert */
//         document.getElementsByClassName("icon")[0].style.filter = "invert(0)";
//         document.getElementsByClassName("tempplot")[0].style.filter = "invert(0)";
//     }
// }
