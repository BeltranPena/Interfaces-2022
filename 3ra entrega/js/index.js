let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let seMueve = false;
let ultimaClickeada = null;
let estaEnZona = false;
let jugador = null;
let primeraRonda = true;
let gano = false;

let menuJ1 = document.getElementById("menu-jugador-1");
let menuJ2 = document.getElementById("menu-jugador-2");
let menuJuego = document.getElementById("menu-cant-objetivo");

let showTimer = document.getElementById('timer');

const mitadFicha = 40;

const CANT_FICHAS = 21; //fichas que va a tener cada jugador para jugar
let objetivo = 4; // objetivo de fichas a alinear para ganar el juego

/* Rangos para dibujar fichas de jugadores aleatoriamente*/
let j1topeXSup = 1170;
let j1topeXInf = 1270;
let j1topeYSup = 100;
let j1topeYInf = 300;

let j2topeXSup = 1170;
let j2topeXInf = 1270;
let j2topeYSup = 500;
let j2topeYInf = 500;

/* Variables de las imágenes de cada jugador*/
let imgJ1;
let imgJ2;

/* Jugadores, tablero y timer */
let j1;
let j2;
let tablero;
let timer;

/* Imagen del turno del jugador, gif cuando está a punto de ganar algún jugador e indicador de turno*/
let imgJugadorConTurno = document.getElementById('img-player-actual');
let gifCasiGana = document.getElementById('gif-emotion');
let indicadorTurno = document.getElementById("turno");

/* Inicio de página con los tres menús -> selección de ficha de cada jugador y fichas a alinear */

mostrarMenuJugador1();
mostrarMenuJugador2();
seleccionarObjetivo();

/* Función para selecionar la cantidad de fichas a alinear */
function seleccionarObjetivo(){
    document.getElementById("click-objetivo-juego").addEventListener("click", function(e){        
        objetivo= parseInt(document.getElementById("objetivo-juego").value); // objetivo de fichas a alinear para ganar el juego
        menuJuego.style.display="none"; // oculta el menú de objetivos
        c.style.display="inline-block"; // muestra el canvas luego de elegir el objetivo
        let primerTurno = Math.round(Math.random() * (2 - 1) + 1); // elije aleatoriamente quién empieza, si j1 o j2
        if (primerTurno == 1){ // indicamos quién tiene el primer turno de todo el juego
            j1.setTurno(true);
            indicadorTurno.innerHTML = "Tiene el turno el " + j1.nombre;
            imgJugadorConTurno.src = j1.imagenFicha;
        }else{
            j2.setTurno(true);
            indicadorTurno.innerHTML = "Tiene el turno el " + j2.nombre;
            imgJugadorConTurno.src = j2.imagenFicha;
            
        }
        primeraRonda = false; // termina la primera ronda
        // creamos el tablero
        tablero = new Tablero(180,50, objetivo ,ctx);
        tablero.crearMatriz();
        tablero.setCarga(false);
        // creamos el timer
        // if(objetivo == 4){
        //     timer = new Timer(100, 0);
        // }else if(objetivo == 6){
        //     timer = new Timer(150, 0);
        // }else if(objetivo == 7){
        //     timer = new Timer(200, 0);
        // }else if(objetivo == 8){
        //     timer = new Timer(250, 0);
        // }
        // timer.contarSegundos();
        // jugador vacío por si nadie gana y tiene que mostrar resultados si nadie ganó
        //let jugadorVacio = new Jugador(0, 0,0, 0,  0, 0, "nada");
        // chequeamos si termina el juego
        //finalizoElJuego(jugadorVacio);
    })
    
}

/* Menú para elegir la ficha del j1 */
function mostrarMenuJugador1(){
    document.getElementById("ficha-jugador-1").addEventListener("click", function(e){   
        let imagenSeleccionada = document.getElementById("select-image-player-1").value;
          switch (imagenSeleccionada) {
              case "gryffindor":              
                  imgJ1 = "../images/juego/ficha-gryffindor.png";
                   break;
              case "ravenclaw":
                  imgJ1 = "../images/juego/ficha-ravenclaw.png";
                   break;
              case "slytherin":
                  imgJ1 = "../images/juego/ficha-slytherin.png";
               break;
              case "hufflepuff":
                  imgJ1 = "../images/juego/ficha-hufflepuff.png";
                  break;
          }
    // Creamos instancia del j2, dibujamos las fichas y las agregamos al arreglo de fichas
    j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf, imgJ1, "Jugador 1"); 
    j1.addFichaJugador();
    dibujarFichasJugador(j1);
    // Ocultamos los divs correspondientes para sólo mostrar el canvas, el turno y el timer
    menuJ1.style.display="none";
    menuJ2.style.display="inline-block"; 
    })
    
}

/* Menú para elegir la ficha del j2 */
function mostrarMenuJugador2(){
    document.getElementById("ficha-jugador-2").addEventListener("click", function(e){   
        let imagenSeleccionada = document.getElementById("select-image-player-2").value;
        let mismaFicha = document.getElementById('misma-ficha');
            switch (imagenSeleccionada) {
                case "gryffindor":              
                imgJ2 = "../images/juego/ficha-gryffindor.png";
                    break;
            case "ravenclaw":
                imgJ2 = "../images/juego/ficha-ravenclaw.png";
                    break;
            case "slytherin":
                imgJ2 = "../images/juego/ficha-slytherin.png";
                break;
            case "hufflepuff":
                imgJ2 = "../images/juego/ficha-hufflepuff.png";
                break;
          }
          if (imgJ1 === imgJ2){ // si el jugador 2 elije la misma ficha que el 1, se le informa
             alert('Tu fichas son iguales a las del Jugador 1, por favor volvé a elegir');
            mostrarMenuJugador2();
          }else{
                // Creamos instancia del j2, dibujamos las fichas y las agregamos al arreglo de fichas
                j2 = new Jugador(CANT_FICHAS, j2topeXSup,j2topeXInf, j2topeYSup,  j2topeYInf, imgJ2, "Jugador 2");
                j2.addFichaJugador();
                dibujarFichasJugador(j2);
                // Ocultamos los divs correspondientes para sólo mostrar el canvas, el turno y el timer
                menuJ2.style.display="none"; 
                menuJuego.style.display="inline-block"; 
                mismaFicha.style.display="none";
          }
         
    })
    
}

//EVENTOS MOUSE
c.addEventListener("mousedown", function(e){
    if(j1.getTurno()){
        jugador = j1;
        mouseDown(e, jugador);
    }else{
        jugador = j2;
        mouseDown(e, jugador);
    }
});
c.addEventListener("mousemove", function(e){
    mouseMove(e)
});
c.addEventListener("mouseup", function(e){
    mouseUp(e, jugador)
});

// FUNCIONES EVENTOS
function mouseDown(e, jugador){
    seMueve = true;
    if(ultimaClickeada != null){
        ultimaClickeada = null;
    }
    
    // Obtenemos la última clickeada y la ponemos como activa para moverse
    let clickFig = fichaClickeada(e.layerX-60, e.layerY, jugador); //+140
    if(clickFig != null && clickFig.isMovible()){
        ultimaClickeada = clickFig;
    }
}

// Movemos la ficha con el mouse y a medida que esto ocurre vamos dibujando todo el canvas de nuevo para actualizar la posición de la ficha
function mouseMove(e){
    if(seMueve && ultimaClickeada != null){
        ultimaClickeada.setPosition(e.layerX-100,e.layerY);
        actualizarDisplay();
    }
    
}

// Al levantar la tecla del mouse verificamos si la fecha está sobre el tablero para ser tirada
function mouseUp(e, jugador){
    seMueve = false;
    if(ultimaClickeada != null){
        if(estaSobreElTablero(e.layerX,e.layerY)){
            ultimaClickeada.setPosition((objetivo + 5) * 80, e.layerY);
            actualizarDisplay();
        }
        
        let columnaX = zonaTirarFicha(e.layerX, e.layerY); // es la coord X donde la suelta
        let columnaY = verificarColumna(columnaX, ultimaClickeada); // es la coord Y donde la suelta
        console.table(tablero.matriz);
        verificaVictoria(columnaX, columnaY, tablero, jugador); // verificamos si luego de soltar la ficha el jugador ganó
    }
}

// FUNCIONES 
// Dibujamos la ficha del jugador dentro del tablero
function dibujarFichasJugador(jugador){
    for(let i = 0; i < jugador.getSize(); i++){
        let x = jugador.fichas[i].getPosition().x;
        let y = jugador.fichas[i].getPosition().y;
        if(primeraRonda){ // Para no cargar constantemente imágenes con onload
            jugador.fichas[i].drawFicha(x,y,ctx); //carga y dibuja la ficha
        } else{
            jugador.fichas[i].cargarFicha(x, y, ctx); //solo dibuja la ficha
        }
    }
}


// Nos devuelve la ficha que selecciono el usuario
function fichaClickeada(x, y, jugador){ 
    for(let i = 0; i < jugador.getSize(); i++){
        let ficha = jugador.fichas[i];
        if(ficha.isPointInside(x, y)){
            return ficha;  // devuelve la figura que clickeamos
        }
    }
    return null;
}


// Dibujamos el canvas en blanco, luego el tablero actualizado y las fichas de cada jugador
function actualizarDisplay(){
    ctx.fillStyle = "rgba(217, 217, 217)";
    ctx.fillRect(0,0, c.width, c.height); 
    tablero.drawTablero();
    dibujarFichasJugador(j1);
    dibujarFichasJugador(j2);
}

// Verificamos si el jugador tiene la ficha por encima del tablero (dentro del tablero)
function estaSobreElTablero(posX, posY){
    let inicioTablero = 100; 
    let topePosTableroY = (objetivo + 2) * 80 + 100;
    let topePosTableroX = (objetivo + 3) * 80 + 100;
    if (( posY <= topePosTableroY && posY >= inicioTablero) && (posX >= inicioTablero && posX <= topePosTableroX)){
        return true;
    }
    return false;
}


//FUNCIONES PARA CORROBORAR Y DIBUJAR DENTRO DE LA MATRIZ Y TABLERO
function zonaTirarFicha(posX, posY){ //la posicion que recibe es de la ficha que entro en la zona habilitada para tirar
    let inicioTablero = 180; 
    let posXenTablero = posX - inicioTablero;
    let topePosTablero = (objetivo + 3) * 80;   
    if(posY < inicioTablero){//corrobora que la ficha en la posicion Y este dentro del rango de tirada ----> entre 0 y 100
        if(posXenTablero >= 0 && posXenTablero <= topePosTablero){//corroboro que la ficha en posicion X este en el rango del tablero ---> 100 y 660
            estaEnZona = true;
            return Math.trunc(posXenTablero / 80);
        }
    }    
}


function verificarColumna(x, ficha){ //recibe posicion en x que me retorna zonaTirarFicha y ademas recibe la ficha clickeada 
    let y = 0;
    if(estaEnZona){        
        while(y < objetivo + 2 && tablero.matriz[x][y] == 0 ){ // OBJETIVO + 2  -> largo del tablero
            y++
        }
        y--;
        if(y >= 0){
            if (j1.getTurno()){
                tablero.matriz[x][y] = 1;
                j1.setTurno(false);
                j2.setTurno(true);
                imgJugadorConTurno.src = j2.imagenFicha;
                indicadorTurno.innerHTML = "Tiene el turno el " + j2.nombre;
            }else{
                tablero.matriz[x][y] = 2;
                j2.setTurno(false);
                j1.setTurno(true);
                imgJugadorConTurno.src = j1.imagenFicha;
                indicadorTurno.innerHTML = "Tiene el turno el " + j1.nombre;
            }            
            x = x * 80 + 150 + mitadFicha;
            y = y * 80 + 20 + mitadFicha;
            ficha.setPosition(x, y);
            actualizarDisplay();
            ficha.setMovible(false);
        } 
    }
    return Math.floor((y-100)/80);
}

// Verificamos si el jugador ganó, obteniendo a través de su nombre el valor de la matriz que representa estructuralmente al tablero, para corroborar
// 1 = Jugador 1
// 2 = Jugador 2
function verificaVictoria(x, y, tablero, jugador){        
        let valorJugadorMatriz;
        if (jugador.nombre == "Jugador 1"){
            valorJugadorMatriz = 1;
        }else{
            valorJugadorMatriz = 2;
        }
        // Chequeamos si por alguna de las posibilidades gana -> siempre tomando como partida la última ficha arrojada
        if ((checkHorizontales(tablero, valorJugadorMatriz))){
            gano = true;
        }else if (checkVerticales(tablero, valorJugadorMatriz)) {
            gano = true;
        }else if (checkDiagonales(tablero, valorJugadorMatriz)) {
            gano = true;
        }
        // Verificamos el timer
        finalizoElJuego(jugador);               
}

// Chequea si ganó de forma vertical
function checkVerticales(tablero, valorJugadorMatriz){
    let i = 0;
    while(i < objetivo + 3){
        let j = 0;
        let cantFichasSeguidas = 0;
        while(j < objetivo + 2){
            if(tablero.matriz[i][j] == valorJugadorMatriz){
                cantFichasSeguidas++;
                j++;
        }
        else{
            cantFichasSeguidas = 0;
            j++;
            }
        if(cantFichasSeguidas == objetivo){
            return true;
        }
        }       
        i++;
    }
    return false;   
}
// Chequea si ganó de forma horizontal
function checkHorizontales(tablero, valorJugadorMatriz){
    let j = 0;
    while(j < objetivo + 2){
        let i = 0;
        let cantFichasSeguidas = 0;
        while(i < objetivo + 3){
            if(tablero.matriz[i][j] == valorJugadorMatriz){
                cantFichasSeguidas++;
                i++;
        }
        else{
            cantFichasSeguidas = 0;
            i++;
            }
        if(cantFichasSeguidas == objetivo){
            return true;
        }
        }       
        j++;
    }
    return false;
 }

// Chequea si ganó por sobre alguna de las diagonales
 function checkDiagonales(tablero, valorJugadorMatriz){
    console.log("valorJugador: " + valorJugadorMatriz);
    let i = 0;
    let cantFichasSeguidas = 0;
    while(i < 3){
        let j = 0;
        while(j < 2){
            for(let iterable = 0; iterable < objetivo; iterable++){
                if(tablero.matriz[i + iterable][j + iterable] == valorJugadorMatriz){
                            cantFichasSeguidas++;
                            console.log("1: " + cantFichasSeguidas);
                            if(cantFichasSeguidas == objetivo){
                                return true;
                            }
                }else{
                    cantFichasSeguidas = 0;
                }
            }
            j++;
        }
        i++;
    }

    i = objetivo + 2;
    cantFichasSeguidas = 0;
    while(i > 3){
        let j = objetivo + 3;
        while(j > 2){
            for(let iterable = 0; iterable < objetivo; iterable++){
                if(tablero.matriz[i - iterable][j - iterable] == valorJugadorMatriz){
                        cantFichasSeguidas++;
                        console.log("2: " + cantFichasSeguidas);
                        if(cantFichasSeguidas == objetivo){
                            return true;
                        }
                }else{
                    cantFichasSeguidas = 0;
                }
            }
            j--;
        }
        i--;
    }
    return false;
    
}

// Botón para reiniciar el juego
//let botonReset = document.getElementById('button-reset-game').addEventListener("click", loadPage);

// Verificamos si ganó el juego ya sea porque se terminó el tiempo o porque alguien ganó
function finalizoElJuego(jugador){
    if (gano){
        alert("gano " + jugador.nombre);
        pararJuego(j1);
        pararJuego(j2);
    }
//     if(timer.contador == 0){
//         pararJuego(j1);
//         pararJuego(j2);
//         resetJuego();
//     }
//             // Paramos el timer
//             timer.stop();
//             // Mostramos el resultado
//             mostrarResultados(jugador);
//             // Mostramos botón para resetear el juego
//             resetJuego();
//         }
//     }    
}
    
function pararJuego(jugador){
    for(let i = 0; i < jugador.getSize(); i++){
        jugador.fichas[i].setMovible(false); // Anulamos las fichas
    }
}

// Mostramos el div donde está el botón de reset
function resetJuego(){
    let botonReset = document.getElementById('reset');
    botonReset.style.display="inline-block";    
}

// Recargamos la página
function loadPage(){
    location.reload();
}