// dom element variables
var gameclient = document.getElementById("aberoyale-window");
var lobbyclient = document.getElementById("lobby-port");
var acccclient = document.getElementById("login-port");

//dom element events
document.getElementById("crrAccBtn").addEventListener("click", async () => {
    accreq(0);
});

var leaveMode = false;
document.getElementById("leave-arena-btn").onclick = function () {
    if (leaveMode == false) {
        leaveMode = true;
        document.getElementById("leave-arena-btn").innerHTML = "cancel";
    } else if (leaveMode == true) {
        leaveMode = false;
        document.getElementById("leave-arena-btn").innerHTML = "leave arena (" + accountinfo.level[lgusrIndex] + "s)";
    }

    setTimeout(function () {
        if (accountinfo.place[lgusrIndex] == 1) {
            db.push({ type: "return-lobby", name: lgusr });
            document.getElementById("leave-arena-btn").innerHTML = "leave arena (" + accountinfo.level[lgusrIndex] + "s)";
            goToWindow(1);
        }
    }, accountinfo.level[lgusrIndex] * 1000)
}

document.getElementById("ready-trig-btn").addEventListener("click", async () => {
    //change UI display...
    document.getElementById("uplayer-username").innerHTML = "<i>joining arena...</i>";
    document.getElementById("lobby-idle-btns").style.display = "none";
    document.getElementById("lobby-active-btns").style.display = "block";

    joinGame();
});

var cancelMode = false;
document.getElementById("cancel-trig-btn").addEventListener("click", async () => {
    cancelMode = true;
    document.getElementById("cancel-trig-btn").innerHTML = "Cancelling...";
})

// game global variables
var clientmobiletype = false;
var gamestate = 0; // 0 = welcome menu

var checkClientType = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

window.onload = function () {
    // check if browser is mobile or pc
    var clientmobiletype = checkClientType();
    if (clientmobiletype == false) {
        gameclient.style.width = "377.5px";
        gameclient.style.height = "600px";

        acccclient.style.width = "377.5px";
        acccclient.style.height = "600px";

        lobbyclient.style.width = "377.5px";
        lobbyclient.style.height = "600px";
    } else {
        gameclient.style.width = "100%";
        gameclient.style.height = "100vh";
        acccclient.style.width = "100%";
        acccclient.style.height = "100vh";
        lobbyclient.style.width = "100%";
        lobbyclient.style.height = "100vh";
    }

    // game start function for test / test purpose script
    // lgusr = "a!v";
    // lgusrIndex = 0;
    // startGame();
}

function generateTerrain(x, y, sizex, sizey) {

}

function accreq(mode) {
    var namereq = document.getElementById("usernamepre").value;
    var passreq = document.getElementById("passwordpre").value;
    if (namereq != "" && passreq != "") {
        if (mode == 0) {
            if (accountinfo.name.indexOf(namereq) == -1 && namereq != "null") {
                var skinToneReq = Math.floor(Math.random() * 10) / 10;
                var shirtColorReq = Math.floor(Math.random() * 360);
                var hairColorReq = Math.floor(Math.random() * 10) / 10;
                var shirtBrightnesReq = Math.floor(Math.random() * 10) / 10;

                db.push({ type: "acc", name: namereq, pass: passreq, hair: hairColorReq, skin: skinToneReq, shirt: shirtColorReq, shirtBrightness: shirtBrightnesReq });
                login(namereq);
            } else {
                alert("username already used");
            }
        } else if (mode == 1) {
            if (accountinfo.name.indexOf(namereq) != -1 && accountinfo.pass[accountinfo.name.indexOf(namereq)] == passreq) {
                login(namereq);
            } else {
                alert("incorrect username or password");
            }
        }
    } else {
        alert("please enter everything");
    }
}

function goToWindow(mode) {
    if (mode == 0) {
        document.getElementById("login-port").style.display = "block";
        document.getElementById("lobby-port").style.display = "none";
        document.getElementById("game-port").style.display = "none";
    } else if (mode == 1) {
        document.getElementById("login-port").style.display = "none";
        document.getElementById("lobby-port").style.display = "block";
        document.getElementById("game-port").style.display = "none";
        accountinfo.health[lgusrIndex] = accountinfo.level[lgusrIndex] * 100;

        //lobby port ui display reset
        document.getElementById("uplayer-username").innerHTML = lgusr;
        document.getElementById("lobby-idle-btns").style.display = "block";
        document.getElementById("lobby-active-btns").style.display = "none";
    } else if (mode == 2) {
        document.getElementById("login-port").style.display = "none";
        document.getElementById("lobby-port").style.display = "none";
        document.getElementById("game-port").style.display = "block";
    }
}

// server scripts
var db = new Firebase("https://aberoyale-94ca3-default-rtdb.firebaseio.com/");
var accountinfo = {
    name: [],
    pass: [],
    hair: [],
    skin: [],
    shirt: [],
    shirtB: [],
    positionx: [],
    positiony: [],
    place: [], // 0 : lobby, 1 : arena, 2 : waiting server join
    status: [],
    health: [],
    level: [],
    attack: [] //attack level based on gear
}

var lgusr;
var lgusrIndex;

var opusr;

function login(usrname) {
    lgusr = usrname;
    lgusrIndex = accountinfo.name.indexOf(lgusr);

    //set lobby skin, set global skin variable
    // console.log("brightness(" + accountinfo.shirtB[lgusrIndex] + ") hue-rotate(" + accountinfo.shirt[lgusrIndex] + "deg)");
    document.getElementById("lobby-hair").style.filter = "brightness(" + accountinfo.hair[lgusrIndex] + ")";
    document.getElementById("lobby-uskin").style.filter = "brightness(" + accountinfo.skin[lgusrIndex] + ")";
    document.getElementById("lobby-clothes").style.filter = "brightness(" + accountinfo.shirtB[lgusrIndex] + ") hue-rotate(" + accountinfo.shirt[lgusrIndex] + "deg)";

    //switch screen based on character place
    if (accountinfo.place[lgusrIndex] == 0) {
        goToWindow(1);
    } else if (accountinfo.place[lgusrIndex] == 1 && accountinfo.status[lgusrIndex] == 1) {
        // in arena and is alive
        goToWindow(2);
        startGame();
    } else if (accountinfo.place[lgusrIndex] == 1 && accountinfo.status[lgusrIndex] == 0) {
        // in arena and is dead
        goToWindow(2);
        startGame();
        deadScreen();
    }
}

function updateFrame() {

}

var startListening = function () {
    db.on('child_added', function (snapshot) {
        var snap = snapshot.val();
        if (snap.type == "acc") {
            accountinfo.name.push(snap.name);
            accountinfo.pass.push(snap.pass);
            accountinfo.shirt.push(snap.shirt);
            accountinfo.skin.push(snap.skin);
            accountinfo.hair.push(snap.hair);
            accountinfo.shirtB.push(snap.shirtBrightness);
            accountinfo.positionx.push(0);
            accountinfo.positiony.push(0);
            accountinfo.place.push(0);
            accountinfo.status.push(1); // 1 is alive, 0 is dead
            accountinfo.level.push(1);
            accountinfo.health.push(100);
            accountinfo.attack.push(1);
        } else if (snap.type == "join-game-request") {
            var aaindex = accountinfo.name.indexOf(snap.name);
            accountinfo.place[aaindex] = 2;
            if (snap.name == lgusr) {
                setTimeout(function () {
                    if (cancelMode == false) {
                        db.push({ type: "join-server", name: lgusr });
                        goToWindow(2);
                        gamemode = true;
                        //create new random spawn position
                        var newX = Math.floor(Math.random() * 500);
                        var newY = Math.floor(Math.random() * 400);
                        db.push({ type: "player-new-position", name: lgusr, positionx: newX, positiony: newY });
                        startGame();
                    } else {
                        cancelMode = false;
                        db.push({ type: "return-lobby", name: lgusr });
                        document.getElementById("cancel-trig-btn").innerHTML = "Cancel";
                        goToWindow(1);
                    }
                }, 2000)
            }
        } else if (snap.type == "return-lobby") {
            accountinfo.place[accountinfo.name.indexOf(snap.name)] = 0;
        } else if (snap.type == "join-server") {
            accountinfo.place[accountinfo.name.indexOf(snap.name)] = 1;
            accountinfo.health[accountinfo.name.indexOf(snap.name)] = accountinfo.level[accountinfo.name.indexOf(snap.name)] * 100;
        } else if (snap.type == "player-new-position") {
            // new position
            // console.log(lgusrIndex);
            accountinfo.positionx[accountinfo.name.indexOf(snap.name)] = snap.positionx;
            accountinfo.positiony[accountinfo.name.indexOf(snap.name)] = snap.positiony;
        }
        //game server stuff
        if (snap.type == "new-consume-drop") {
            if (snap.ctype == "scroll") {
                //scrolls
                consumes.allList.push("s!" + snap.tier);
                consumes.positionx.push(snap.positionx);
                consumes.positiony.push(snap.positiony);
                consumes.float.push(200);
                consumes.pickup.push(1);
            }
        } else if (snap.type == "item-pickup") {
            var scrollId = parseInt(snap.consumePoint);
            // console.log(scrollId);
            // console.log(consumes.allList[scrollId]);
            consumes.allList.splice(scrollId, 1);
            consumes.positionx.splice(scrollId, 1);
            consumes.positiony.splice(scrollId, 1);
            consumes.float.splice(scrollId, 1);
            consumes.pickup.splice(scrollId, 1);
        } else if (snap.type == "punch-player") {
            //player attacked snap
            var attackPowaa = Math.floor(Math.random() * accountinfo.attack[accountinfo.name.indexOf(snap.recieve)]) + 1;
            console.log(accountinfo.health[accountinfo.name.indexOf(snap.recieve)]);
            if (attackPowaa >= accountinfo.health) {
                accountinfo.health[accountinfo.name.indexOf(snap.recieve)] = 0;
                console.log(accountinfo.health[accountinfo.name.indexOf(snap.recieve)]);
            } else {
                accountinfo.health[accountinfo.name.indexOf(snap.recieve)] -= attackPowaa;
                console.log(accountinfo.health[accountinfo.name.indexOf(snap.recieve)]);
            }
        }
    });
}
startListening();

var punchNumber = 0;
function playPunchAudio() {
    punchAudio[punchNumber].play(Math.floor(Math.random()));
}

// game scripts
var mylife = 100;
var itemslot = [];
var theirlife = 100;

function joinGame() {
    db.push({ type: "join-game-request", name: lgusr });
}

window.addEventListener("beforeunload", function (e) {
    db.push({ type: "client-leave", name: lgusr });
}, false);

function startGame() {
    // console.log("game canvas access start");
    gamemode = true;
    animate();
}

var gamemode = false;
var testmode = false;
var camera = [0, -50];
var floorDimension = [1200, 1200];
var health = 300;

//image holders
var terrainWall = new Image();
terrainWall.src = "./assets/terrain/castle_wall.png";

var playerb = new Image();
playerb.src = "./assets/player_skin/pbase_up.png";
var players = new Image();
players.src = "./assets/player_skin/pclothes_right.png";

var safeZoneIMG = new Image();
safeZoneIMG.style.imageRendering = "pixelated";
safeZoneIMG.src = "./assets/terrain/safezone.png";

var scrolls = [];
for (i = 0; i < 8; i++) {
    scrolls[i] = new Image();
    scrolls[i].src = "./assets/consume/scroll_t" + i + ".png";
}

var consumes = {
    allList: [],
    positionx: [],
    positiony: [],
    float: [],
    pickup: []
}

var scrollDropAudio = new Audio();
scrollDropAudio.src = "./assets/audio/scrollDrop.mp3";
var scrollPickupAudio = new Audio();
scrollPickupAudio.src = "./assets/audio/scrollPickup.mp3";

//punch sound
var punchAudio = [];
var punchPref = new Audio;
punchPref.src = "./assets/audio/punch.mp3";
punchAudio.push(punchPref);
punchPref = new Audio;
punchPref.src = "./assets/audio/punch2.mp3";
punchAudio.push(punchPref);

var audioPlayer = [];
function spawn(mode) {
    if (mode == 0) {
        // scroll
        // console.log("new scroll");
        var scrollTier = Math.floor(Math.random() * 4);
        var dropPositionX = Math.floor(Math.random() * floorDimension[0] - 30) + 70;
        var dropPositionY = Math.floor(Math.random() * floorDimension[0] - 90) + 105;
        // if (consumes.positionx.indexOf(dropPositionX) != consumes.positiony.indexOf(dropPositionY)) {
        db.push({ type: "new-consume-drop", ctype: "scroll", tier: scrollTier, positionx: dropPositionX, positiony: dropPositionY });
        // console.log(dropPositionX + "," + dropPositionY);
        // }
    } else if (mode == 1) {
        // potion
        // console.log("new potion");
    } else if (mode == 2) {
        // gear
        // console.log("new gear");
    }
}

function testSpawn(xp, yp) {
    var scrollTier = Math.floor(Math.random() * 7);
    // if (consumes.positionx.indexOf(dropPositionX) != consumes.positiony.indexOf(dropPositionY)) {
    db.push({ type: "new-consume-drop", ctype: "scroll", tier: scrollTier, positionx: xp, positiony: yp });
    // console.log(dropPositionX + "," + dropPositionY);
}

var spawnTick = 100;
var deadParam = false;

function animate() {
    var canvas = document.getElementById("aberoyale-window");
    canvas.width = 377.5;
    canvas.height = 600;
    var ctx = canvas.getContext("2d");

    // check and show vitals
    //life bar
    // console.log(((accountinfo.health[lgusrIndex] / (accountinfo.level[lgusrIndex] * 100)) * 100));
    var healthPerc = ((accountinfo.health[lgusrIndex] / (accountinfo.level[lgusrIndex] * 100)) * 100);
    document.getElementById("client-life-bar").style.width = healthPerc + "%";

    if (accountinfo.health[lgusrIndex] == 0) {
        deadParam = true;
        dead();
        gamemode = false;
    }

    ctx.clearRect(0, 0, 500, 500);

    ///draw floor
    ctx.fillStyle = "#67802d";
    ctx.fillRect(50 - camera[0], 20 - camera[1], floorDimension[0], floorDimension[1]);

    //render safe zone
    ctx.drawImage(safeZoneIMG, (floorDimension[0] / 2) - (camera[0] + 250), (floorDimension[1] / 2) - (camera[1] + 150), 500, 300);

    //shadow test
    // ctx.fillStyle = "#0000006b";
    // ctx.fillRect(100, 150, 17, 5);
    //render the consumes, update position
    // console.log(consumes.allList.length);
    for (i = 0; i < consumes.allList.length; i++) {
        // console.log(consumes.pickup[i]);
        if (consumes.pickup[i] == 1) {
            //not picked up
            //render shadow
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(consumes.positionx[i] - 9 - camera[0], consumes.positiony[i] - 3 - camera[1], 17, 5);
            ctx.globalAlpha = 1;
            //render consume
            if (consumes.allList[i].split("!")[0] == "s") {
                ctx.drawImage(scrolls[parseInt(consumes.allList[i].split("!")[1])], consumes.positionx[i] - 9 - camera[0], consumes.positiony[i] - consumes.float[i] - 3 - camera[1], 17, 5);
                if (consumes.float[i] == 200) {
                    audioPlayer.push(scrollDropAudio);
                    audioPlayer[audioPlayer.length - 1].play();

                }
            }
            if (consumes.float[i] > 0) {
                consumes.float[i] -= 5;
            }

        }
    }


    //draw arround right left and up
    for (i = 0; i < floorDimension[0]; i++) {
        ctx.drawImage(terrainWall, (50 - camera[0]) + i, 20 - camera[1], 1, 80);
    }
    for (i = 0; i < floorDimension[1] - 80; i++) {
        ctx.drawImage(terrainWall, (50 - camera[0]), (20 - camera[1]) + i, 10, 80);
    }
    for (i = 0; i < floorDimension[1] - 80; i++) {
        ctx.drawImage(terrainWall, (50 - camera[0]) + floorDimension[0], (20 - camera[1]) + i, 10, 80);
    }

    // ctx.drawImage(terrainWall, (50 - camera[0]), 0);

    // check render player and render whos in arena
    for (i = 0; i < accountinfo.place.length; i++) {
        if (accountinfo.place[i] == 1) {
            //render player shadow
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(accountinfo.positionx[i] - camera[0] + 71, accountinfo.positiony[i] - camera[1] + 100, 17, 5);
            ctx.globalAlpha = 1;
            //player is in arena render player
            ctx.globalAlpha = 0.5;
            ctx.drawImage(playerb, accountinfo.positionx[i] - camera[0] + 60, accountinfo.positiony[i] - camera[1] + 25, 40, 80);
            ctx.globalAlpha = 1;
            // ctx.drawImage(players, accountinfo.positionx[i] - camera[0] + 60, accountinfo.positiony[i] - camera[1] + 45, 17, 55);
        }
    }

    //render name afterwards
    for (i = 0; i < accountinfo.place.length; i++) {
        if (accountinfo.place[i] == 1) {
            if (i == lgusrIndex) {
                ctx.fillStyle = "#ffffff";
            } else {
                ctx.fillStyle = "#ff6462";
            }
            ctx.font = '20px sans-serif';
            ctx.strokeStyle = 'black';
            ctx.strokeText(accountinfo.name[i], accountinfo.positionx[i] - camera[0] + 78 - (accountinfo.name[i].length * 5), accountinfo.positiony[i] - camera[1] + 10);
            ctx.fillText(accountinfo.name[i], accountinfo.positionx[i] - camera[0] + 78 - (accountinfo.name[i].length * 5), accountinfo.positiony[i] - camera[1] + 10);

        }
    }

    for (i = 0; i < floorDimension[0]; i++) {
        ctx.drawImage(terrainWall, (50 - camera[0]) + i, 20 - camera[1] + floorDimension[1] - 80, 1, 80);
    }

    // draw client player
    if (inspectKey == true) {
        //console logs
    }

    // move the camera automatically, depending on character position
    if (testmode == false) {
        var howfarraw = accountinfo.positionx[lgusrIndex] - (camera[0] + 120);
        if (accountinfo.positionx[lgusrIndex] < (camera[0] + 120)) {
            if (Math.abs(howfarraw) >= 10) {
                camera[0] -= 10;
            } else {
                camera[0] -= Math.abs(howfarraw);
            }
        } else if (accountinfo.positionx[lgusrIndex] > (camera[0] + 120)) {
            if (Math.abs(howfarraw) >= 10) {
                camera[0] += 10;
            } else {
                camera[0] += Math.abs(howfarraw);
            }
        }
    }

    //auto camera
    if (testmode == false) {
        howfarraw = accountinfo.positiony[lgusrIndex] - (camera[1] + 250);
        if (accountinfo.positiony[lgusrIndex] < (camera[1] + 250)) {
            if (Math.abs(howfarraw) >= 10) {
                camera[1] -= 10;
            } else {
                camera[1] -= Math.abs(howfarraw);
            }
        } else if (accountinfo.positiony[lgusrIndex] > (camera[1] + 250)) {
            if (Math.abs(howfarraw) >= 10) {
                camera[1] += 10;
            } else {
                camera[1] += Math.abs(howfarraw);
            }
        }
    }


    // move camera manual
    //write text
    if (testmode) {
        ctx.fillStyle = "#ffffff";
        ctx.font = '20px serif';
        ctx.fillText('Arrow / WASD to move camera', 20, 30);
        if (moveForward) {
            camera[1] -= 10;
        }

        if (moveBackward) {
            camera[1] += 10;
        }
        if (moveRight) {
            camera[0] += 10;
        }
        if (moveLeft) {
            camera[0] -= 10;
        }
    }

    // spawn consumes
    spawnTick -= 1;
    if (spawnTick == 0) {
        spawnTick = 10;
        //set consume type
        if (consumes.allList.length < 30) {
            var spawnType = Math.floor(Math.random() * 2);
            spawn(spawnType);
        }
    }

    if (moveCoolDown != 0) {
        moveCoolDown -= 10;
        document.getElementById("runCoolDownBar").style.height = (32 - (32 * (moveCoolDown / 300))) + "px";
    }

    if (deadParam) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.globalAlpha = 1;
        ctx.font = '20px sans-serif';
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        ctx.strokeText("You died.", 10, 30);
        ctx.fillText("You died.", 10, 30);
        deadParam = false;
    }

    setTimeout(function () {
        if (gamemode) {
            animate();
        }
    }, 10)
}

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var inspectKey = false;

var onKeyDown = function (event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true; break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 73: //i
            inspectKey = true;
            break;
    }
};
var onKeyUp = function (event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 73: //i
            inspectKey = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
};
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

gameclient.addEventListener("click", function (e) {
    // console.log("itscliecne")
    var actionConf = true;
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    // check if click axis has consumes
    for (i = 0; i < consumes.allList.length; i++) {
        var minRangeX = consumes.positionx[i] - 10;
        var maxRangeX = consumes.positionx[i] + 10;
        var minRangeY = consumes.positiony[i] - 10;
        var maxRangeY = consumes.positiony[i] + 10;
        var scrollOffsetX = mouseX + camera[0] + 9;
        var scrollOffsetY = mouseY + camera[1] + 3;

        if (consumes.allList[i].split("!")[0] == "s") {
            //scrolls
            if (minRangeX < scrollOffsetX && scrollOffsetX < maxRangeX && minRangeY < scrollOffsetY && scrollOffsetY < maxRangeY) {
                console.log("clicking on scrolls")
                actionConf = false;

                //pick up the consume if inventory not full
                if (itemslot.length < 4) {
                    audioPlayer.push(scrollPickupAudio);
                    audioPlayer[audioPlayer.length - 1].play();
                    //add the scroll to inventory
                    itemslot.push(consumes.allList[i]);
                    document.getElementById("itemS-" + itemslot.length).style.backgroundImage = "url('./assets/consume/scroll_t" + consumes.allList[i].split("!")[1] + "_inventory.png')";

                    // tell server to remove the item from the ground
                    db.push({ type: "item-pickup", consumePoint: i, name: lgusr });
                }
            }
        }
    }

    //check if any players
    for (i = 0; i < accountinfo.positionx.length; i++) {
        var pxmin = accountinfo.positionx[i] - camera[0] + 71;
        var pxmax = accountinfo.positionx[i] - camera[0] + 87;
        var pymin = accountinfo.positiony[i] - camera[1] + 25;
        var pymax = accountinfo.positiony[i] - camera[1] + 100;
        if (pxmin <= mouseX && mouseX <= pxmax && pymin <= mouseY && mouseY <= pymax && i != lgusrIndex) {
            //playr is clicked
            console.log("clicking on player");
            actionConf = false;
            //change focused player
            //send punches
            db.push({ type: "punch-player", attacker: lgusr, recieve: accountinfo.name[i] });
        }
    }

    // if nothing is at click destination, move
    if (actionConf) {
        if (gamemode && e.clientX >= 0 && e.clientY >= 0 && (e.clientX + camera[0] - 70) <= (floorDimension[0] - 30) && (e.clientY + camera[1] - 100) <= (floorDimension[1] - 100)) {
            // if cooldown is over move
            if (moveCoolDown == 0) {
                moveCoolDown = 300;
                db.push({ type: "player-new-position", name: lgusr, positionx: e.clientX + camera[0] - 70, positiony: e.clientY + camera[1] - 100 });
            }
        }
    }

});

moveCoolDown = 300;

// gameclient.addEventListener('onmousemove', function (e) {
//     if (gamemode) {
//         // change where character is pointing at depending on mouse position
//         // 188 is X center, 300 is Y center. therefore, we give 20 pixels of center range
//         if( e.clientX >= 198 && e.clientX >= 178 && e.clientY <= 310 && e.clientY >= 290 ) {
//             // if completely center, face down
//         }
//     }
// });

function dead() {
    db.push({ type: "return-lobby", name: lgusr });
}

document.getElementById("itemS-1").onclick = function () {
    if (itemslot.length != 1) {
        itemslot.splice(0, 1);
    } else {
        itemslot = [];
    }
    updateSlots();
}
document.getElementById("itemS-2").onclick = function () {
    if (itemslot.length != 1) {
        itemslot.splice(1, 1);
    } else {
        itemslot = [];
    }
    updateSlots();
}
document.getElementById("itemS-3").onclick = function () {
    if (itemslot.length != 1) {
        itemslot.splice(2, 1);
    } else {
        itemslot = [];
    }
    updateSlots();
}

document.getElementById("itemS-4").onclick = function () {
    if (itemslot.length != 1) {
        itemslot.splice(3, 1);
    }
    updateSlots();
}

function updateSlots() {
    //clear all inventory
    for (i = 0; i < itemslot.length; i++) {
        document.getElementById("itemS-" + (i + 1)).style.backgroundImage = './assets/consume/noConsume.png';
    }

    if (itemslot.length != 0) {
        for (i = 0; i < itemslot.length; i++) {
            console.log(itemslot);
            if (itemslot[i].split("!")[0] == "s") {
                //scrolls
                document.getElementById("itemS-" + (i + 1)).style.backgroundImage = 'url("./assets/consume/scroll_t' + itemslot[i].split("!")[1] + '_inventory.png")';
            }
        }
    }
}