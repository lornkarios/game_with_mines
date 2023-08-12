import $ from 'jquery';
import axios from "axios";

var curSelectedMenuColor = "orange";
var menuBackground = new Image();
var minaCurrent = 0
var mina = [];
var selectedMenuIndex = 0;
var menuArr = [];

export default async function menuInit() {
    menuBackground.src = '/storage/menu/menu_background.png'
    mina[0] = new Image();
    mina[0].src = '/storage/menu/mina/mina_orange.png';
    mina[1] =  new Image();
    mina[1].src= '/storage/menu/mina/mina_red.png';

    await setMenu();
    window.requestAnimationFrame(drawMenu);
    listenKey();
}

async function setMenu() {
    let response = await axios({
        method: 'get',
        url: '/api/menu'
    });
    menuArr = response.data;
}

function drawMenu() {

    var ctx = document.getElementById("canvas").getContext("2d");

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 600, 600); // clear canvas

    ctx.drawImage(menuBackground, 0, 0);
    ctx.globalCompositeOperation = "source-over";


    if (curSelectedMenuColor === "orange") {
        curSelectedMenuColor = "white";
    } else if (curSelectedMenuColor === "white") {
        curSelectedMenuColor = "orange";
    }
    menuArr.forEach(function (element, index) {
        if (index === selectedMenuIndex) {
            ctx.fillStyle = curSelectedMenuColor;
        } else {
            ctx.fillStyle = "orange";
        }

        ctx.font = "48px impact";
        ctx.fillText(element, 180, 300 + 60 * index);
    });
    drawLogo(ctx);

    setTimeout(function () {

        window.requestAnimationFrame(drawMenu);
    }, 150)
}

function drawLogo(ctx) {
    if (minaCurrent === 0) {
        minaCurrent = 1;
    } else {
        minaCurrent = 0;
    }
    ctx.drawImage(mina[minaCurrent], 50, 30);
}

function listenKey() {
    $(document).on('keydown', function (event) {
        let pressedButton = event.key;
        if (pressedButton === 'Enter') {
            alert(menuArr[selectedMenuIndex]);
        }
        if (pressedButton === 'ArrowUp') {
            if (selectedMenuIndex === 0) {
                selectedMenuIndex = menuArr.length - 1;
            } else {
                selectedMenuIndex = selectedMenuIndex - 1;
            }
        }
        if (pressedButton === 'ArrowDown') {
            if (selectedMenuIndex === menuArr.length - 1) {
                selectedMenuIndex = 0;
            } else {
                selectedMenuIndex = selectedMenuIndex + 1;
            }
        }
    });
}
