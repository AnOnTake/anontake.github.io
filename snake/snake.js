var angle = 1
var score = 0;
var positions = [
    [20, 15],
    [21, 15],
    [22, 15],
    [23, 15],
    [24, 15]
];
var snaketailposition = [19, 15]
var fruitposition = [10, 10]

function drawframe() {
    document.getElementById("snake-window").innerHTML = "";
    drawsnake()
    drawfruit()
    drawscore();
}

function drawsnake() {
    var i;
    for (i = 0; i < positions.length; i++) {
        var divelement = document.createElement("div");
        divelement.className = "snake-pixel"
        divelement.style.left = (positions[i][0]) + "vw";
        divelement.style.top = (positions[i][1]) + "vw";
        //divelement.style.opacity = (150-(Math.abs(0.5-((i/(positions.length-1))))*200))+"%";
        /*
        try{
          switch (positions[i+1][0]-positions[i][0]) {
            case 1:
              divelement.className = "snake-pixel snake-pixel-right";
              break;
              case 0-1:
                divelement.className = "snake-pixel snake-pixel-left";
                break;
          }
          switch (positions[i+1][1]-positions[i][1]) {
            case 1:
              divelement.className = "snake-pixel snake-pixel-down";
              break;
              case 0-1:
                divelement.className = "snake-pixel snake-pixel-up";
                break;
          }
        }
        catch{
          switch (angle) {
            case 0:
            divelement.className = "snake-pixel snake-pixel-head snake-pixel-up";
            break;
            case 1:
            divelement.className = "snake-pixel snake-pixel-head snake-pixel-right";
            break;
            case 2:
            divelement.className = "snake-pixel snake-pixel-head snake-pixel-down";
            break;
            case 3:
            divelement.className = "snake-pixel snake-pixel-head snake-pixel-left";
            break;
          }
        }
        */
        document.getElementById("snake-window").appendChild(divelement);
    }
}

function updatefruit() {
    newfruitposition = [Math.round(Math.random() * 39), Math.round(Math.random() * 29)]
    if (newfruitposition != fruitposition) {
        fruitposition = newfruitposition;
    } else {
        updatefruit();
    }
}

function drawfruit() {
    var divelement = document.createElement("div");
    divelement.className = "snake-fruit"
    divelement.style.left = (fruitposition[0] + 0.125) + "vw";
    divelement.style.top = (fruitposition[1] + 0.125) + "vw";
    document.getElementById("snake-window").appendChild(divelement);
}

function drawscore() {
    document.getElementById("snake-score").innerHTML = score * 100;
}

function gameover() {
    positions = [
        [20, 15],
        [21, 15],
        [22, 15],
        [23, 15],
        [24, 15]
    ];
    angle = 1;
    score = 0;
}

function issnake(snakepixel) {
    if (snakepixel[0] == positions[newpositions.length - 1][0]) {
        if (snakepixel[1] == positions[newpositions.length - 1][1]) {
            gameover();
        }
    }
}

function updatesnake() {
    newpositions = [];
    var i;
    for (i = 0; i < positions.length - 1; i++) {
        newpositions.push(positions[i + 1])
    }
    switch (angle) {
        case 0:
            vector = [0, 0 - 1];
            break;
        case 1:
            vector = [1, 0];
            break;
        case 2:
            vector = [0, 1];
            break;
        case 3:
            vector = [0 - 1, 0];
            break;
    }
    newpositions.push([positions[positions.length - 1][0] + vector[0], positions[positions.length - 1][1] + vector[1]])
    snaketailposition = positions[0]
    positions = newpositions;
    if (newpositions[newpositions.length - 1][0] > 39) {
        gameover();
    }
    if (newpositions[newpositions.length - 1][0] < 0) {
        gameover();
    }
    if (newpositions[newpositions.length - 1][1] > 29) {
        gameover();
    }
    if (newpositions[newpositions.length - 1][1] < 0) {
        gameover();
    }
    if ((positions.slice(0, newpositions.length - 1)).find(issnake) != undefined) {
        gameover();
    }
    if (newpositions[newpositions.length - 1][0] == fruitposition[0]) {
        if (newpositions[newpositions.length - 1][1] == fruitposition[1]) {
            positions.unshift(snaketailposition);
            score++;
            updatefruit();
        }
    }
}
$(document)
    .ready(function() {
        setInterval(function() {
            updatesnake();
            drawframe();
        }, 150);
        document.addEventListener('keydown', function(event) {
            switch (event.keyCode) {
                case 38:
                    if(positions[positions.length-2][1]-positions[positions.length-1][1] != 0-1){
                    angle = 0;
                    }
                    break;
                case 39:
                if(positions[positions.length-2][0]-positions[positions.length-1][0] != 1){
                angle = 1;
                }
                    break;
                case 40:
                if(positions[positions.length-2][1]-positions[positions.length-1][1] != 1){
                angle = 2;
                }
                    break;
                case 37:
                if(positions[positions.length-2][0]-positions[positions.length-1][0] != 0-1){
                angle = 3;
                }
                    break;
            }
        });
    });
