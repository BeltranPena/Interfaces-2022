"use strict";

/*----------------------- Share pop up ----------------------*/
let popUp = document.querySelector("#share-pop-up");
let openPopUpBtn = document.querySelector("#share-btn");
let popUpOverlay = document.querySelector("#overlay");

openPopUpBtn.addEventListener("click", () => {
    popUp.classList.toggle("visible");
    document.querySelector("#close-pop-up").addEventListener("click", () => {
        popUp.classList.remove("visible");
    });
});

document.querySelector("#comment-input").addEventListener("click", () => {
    document.querySelector(".comment-btns").classList.toggle("visible");
    document.querySelector("#cancel-comment-btn").addEventListener("click", () => {
        document.querySelector(".comment-btns").classList.remove("visible");
    });
});



/*------------------------- Game functionality ----------------------------*/
let pieces = 21;
let lines = 4;
let player1;
let player2;

/*--------- Pieces buttons settings -------*/

function showErrorMsg(msg) {
    //Muestra el mensaje...
    let section = document.querySelector(".piece-settings");
    let el = document.createElement("h5");
    el.innerHTML = msg;
    section.appendChild(el);

    setTimeout(() => {
        //Elimina el mensaje...
        section.removeChild(el);
    }, 2000);
}

function selectPiece(selectedBtn, btnsContainer, player) {
    //Por cada botón, quita la selección...
    for (const btn of btnsContainer.children) {
        btn.classList.remove("piece-settings-btn-active");
    }
    //Selecciona el correcto...
    selectedBtn.classList.add("piece-settings-btn-active");
    //Guarda los valores...
    if(player == 1) player1 = selectedBtn.value;
    else player2 = selectedBtn.value;
    //Si coinciden, muestra el error...
    if(player1 == player2) {
        showErrorMsg("Selecciona una casa distinta a la de tu oponente!");
         //Des-selecciona los botones...
        for (const btn of btnsContainer.children) {
            btn.classList.remove("piece-settings-btn-active");
        }
        //Des-guarda los valores...
        if(player == 1) player1 = null;
        else player2 = null;
    }
}

//Setea los eventos que permiten seleccionar las fichas, chequeando que sean difeentes entre sí, y el botón de jugar...
function setFormBtnsEvents() {
    let btnsContainer = document.querySelector("#player-1-piece-btns");
    for (const btn of btnsContainer.children) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            selectPiece(btn, btnsContainer, 1)});
    }

    let ScndBtnsContainer = document.querySelector("#player-2-piece-btns");
    for (const btn of ScndBtnsContainer.children) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            selectPiece(btn, ScndBtnsContainer, 2)});
    }

    let startGameBtn = document.querySelector("#play-settings-btn");
    startGameBtn.addEventListener("click", startGame);
}


/*------------------------- Start game settings ----------------------------*/
const settingsView = document.querySelector("#game-settings");
const gameBox = document.querySelector("#game-box");

let restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", () => {
    startGame(true);
});

let closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
    location.href = "../html/cuatroEnLinea.html";
});


function checkSettings() {
    //Chequea que se hayan seleccionado las fichas de los jugadores...
    if(player1 == null || player2 == null) {
        showErrorMsg("Debes seleccionar un oponente!");
        return false;
    } 
    //Guarda el tablero elegido...
    let radioInputs = document.querySelectorAll("input");
    radioInputs.forEach((input) => {
        if(input.checked) lines = input.value;
    });
    return true;  
}

function startGame(restart = null) {
    if(restart == true || checkSettings()) {
       
        //Prints settings...
        console.log("Lines: " + lines + " | Player 1: " + player1 + " | Player 2: " + player2);

        //Changes view and refresh timer...
        settingsView.style.display = "none";
        gameBox.classList.add("game-box");
        new Timer(document.querySelector(".timer"));

        //Load player 1 pieces...
        let canvas1 = document.querySelector("#pieces-box-one");
        loadPieces(canvas1, player1);
        //Load player 2 pieces...
        let canvas2 = document.querySelector("#pieces-box-two");
        loadPieces(canvas2, player2);
        //Show board...

    }

}

function loadPieces(canvas, player) {
    let ctx = canvas.getContext("2d");
    for (let i = 0; i < pieces; i++) {
        let piece = createPiece(ctx, canvas, player);
        piece.draw();
    }
}


function createPiece(ctx, c, player) {
    let x = Math.round(Math.random() * c.width);
    let y = Math.round(Math.random() * c.height);
    let radious = 20;
    let fill = "../images/juego/" + player + ".png";
    let piece = new Piece(x, y, fill, ctx, radious);
    return piece;
}

/*------------------------  Onload: Change view -------------------------------*/
function load() {
    let desktopView = document.querySelector("#desktop-first-view");
    let mobileView = document.querySelector("#mobile-first-view");
    if(window.innerWidth > 600) {
        mobileView.style.display = "none";
        desktopView.style.display = "flex";
        setFormBtnsEvents();
    } else {
        desktopView.style.display = "none";
        mobileView.style.display = "flex";
    }   
}

window.onload = load();


