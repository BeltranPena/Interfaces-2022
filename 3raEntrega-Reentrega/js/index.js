window.addEventListener('DOMContentLoaded', () => { 

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    mostrarMenuInicio();

    function mostrarMenuInicio() {
        clearCanvas();
        canvas.addEventListener('mousedown', mouseDown);
        drawMenuInicio();
        let botones = [];
        let boton_fill = "#22CCFF";
        let boton_fill_clicked ="#177b99"; //#DD3333
        let boton_jugar;
        let modo_seleccionado;
        let fichas_j1 = [];
        let fichas_j2 = [];


        let ficha_j1_seleccionada;
        let ficha_j2_seleccionada;

        //Dibuja el menu de inicio incluyendo el fondo, titulo, text, fichas, etc
        function drawMenuInicio() {
            let fondo = new Image();
            fondo.src = "../images/juego/sombrero.png";
            fondo.onload = function() {
                ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
                ctx.filter = 'none';
                crearBotones();
                dibujarTexto()
                dibujarSeleccionFichas();
                ficha_j1_seleccionada = fichas_j1[0].imagen;
                ficha_j2_seleccionada = fichas_j2[0].imagen;
            }
        }

        //Carga los distintos tipos de fichas a variables para mostrarlas luego de que carguen
        function dibujarSeleccionFichas() {
            let gryffindor = new Image();
            gryffindor.src = "../images/juego/ficha-gryffindor.png";
            let ravenclaw = new Image();
            ravenclaw.src = "../images/juego/ficha-ravenclaw.png";
            let slytherin = new Image();
            slytherin.src = "../images/juego/ficha-slytherin.png";
            let hufflepuff = new Image();
            hufflepuff.src =  "../images/juego/ficha-hufflepuff.png";
            let ficha_muestra1 = new Ficha(gryffindor, "red", 110, canvas.height / 2, 26);
            let ficha_muestra2 = new Ficha(ravenclaw, "red", 110 + 30 * 2, canvas.height / 2, 26);
            let ficha_muestra3 = new Ficha(slytherin, "blue", canvas.width - 110 , canvas.height / 2, 26);
            let ficha_muestra4 = new Ficha(hufflepuff, "blue", canvas.width - 110 - 30 * 2, canvas.height / 2, 26);
            gryffindor.onload = function() {ficha_muestra1.draw(ctx);}
            ravenclaw.onload = function() {ficha_muestra2.draw(ctx);}
            slytherin.onload = function() {ficha_muestra3.draw(ctx);}
            hufflepuff.onload = function() {ficha_muestra4.draw(ctx);}

            fichas_j1.push(ficha_muestra1);
            fichas_j1.push(ficha_muestra2);
            fichas_j2.push(ficha_muestra3);
            fichas_j2.push(ficha_muestra4);

        }

        //Muestra el texto del titulo y jugadores
        function dibujarTexto() {
            ctx.lineWidth = 8;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.font = "48px monospace";
            ctx.strokeText("Cuatro casas", canvas.width / 2, 50);
            ctx.fillText("Cuatro casas", canvas.width / 2, 50);
            ctx.strokeText("En linea", canvas.width / 2, canvas.offsetTop + 48 + 56);
            ctx.fillText("En linea", canvas.width / 2, canvas.offsetTop + 48 + 56);

            ctx.textAlign = "left";
            ctx.font = "36px monospace";
            ctx.strokeText("Luz", 80, canvas.offsetTop + 48 * 4);
            ctx.fillText("Luz", 80, canvas.offsetTop + 48 * 4);

            ctx.textAlign = "right";
            ctx.strokeText("Oscuridad", canvas.width - 80, canvas.offsetTop + 48 * 4);
            ctx.fillText("Oscuridad", canvas.width - 80, canvas.offsetTop + 48 * 4);
        }

        //Crea los botones que se usaran para seleccionar los distintos modos de tablero
        function crearBotones() { 
            let h_boton_t = canvas.height / 10;
            let w_boton_t = (canvas.width / 12) * 2;
            let posX_base = (canvas.width - w_boton_t) / 4;
            let posY = canvas.height - canvas.offsetTop - h_boton_t;
            boton_jugar = 
                new Boton((canvas.width - (canvas.width / 4)) / 2, (posY - h_boton_t * 1.5) - 20, canvas.width / 4, h_boton_t + 10, "Jugar", "#70F437");  
            let boton_tablero_4 = new Boton(posX_base - 100, posY - 20, w_boton_t, h_boton_t, "4 en Linea", boton_fill);
            let boton_tablero_5 = new Boton(posX_base * 2 - 100, posY - 20, w_boton_t, h_boton_t, "5 en Linea", boton_fill);
            let boton_tablero_6 = new Boton(posX_base * 3 - 100, posY - 20, w_boton_t, h_boton_t, "6 en Linea", boton_fill);
            let boton_tablero_7 = new Boton(posX_base * 4 - 100, posY - 20, w_boton_t, h_boton_t, "7 en Linea", boton_fill);

            botones.push(boton_tablero_4);
            botones.push(boton_tablero_5);
            botones.push(boton_tablero_6);
            botones.push(boton_tablero_7);

            for(let boton of botones) {
                boton.draw(ctx);
            }

            modo_seleccionado = botones[0]; //Default 4 en linea;
            botones[0].clickButton(ctx, boton_fill_clicked);
            boton_jugar.texto = "Jugar " + botones[0].texto;
            boton_jugar.draw(ctx);
        }

        //Crea el tablero segun el tipo de boton clickeado
        function crearTablero() {
            switch (modo_seleccionado) {
                case botones[0]:
                    return new Tablero(7, 6, 4, canvas.width, canvas.height);
                case botones[1]:
                    return new Tablero(8, 7, 5, canvas.width, canvas.height);
                case botones[2]:
                    return new Tablero(9, 8, 6, canvas.width, canvas.height);
                case botones[3]:
                    return new Tablero(10, 9, 7, canvas.width, canvas.height);
                default:
                    return new Tablero(7, 6, 4, canvas.width, canvas.height);
            }
        }

        //evento mouseDown para trackear clicks en fichas y botones
        function mouseDown(e) {
            let x = e.layerX - e.target.offsetLeft;
            let y = e.layerY - e.target.offsetTop;     
            if (boton_jugar.isPointInside(x,y) && modo_seleccionado) {
                canvas.removeEventListener('mousedown', mouseDown);
                initGame(crearTablero(), ficha_j1_seleccionada, ficha_j2_seleccionada);
            }
            for (let i = 0; i < botones.length; i++) {
                if (botones[i].isPointInside(x,y)) {
                    botones[i].clickButton(ctx, boton_fill_clicked);
                    modo_seleccionado = botones[i];
                    boton_jugar.texto = "Jugar " + botones[i].texto;
                    boton_jugar.draw(ctx);
                }
                else 
                    botones[i].unclickButton(ctx);
            }
            for (let f_j1 of fichas_j1) {
                if(f_j1.isSelected(x,y))
                    ficha_j1_seleccionada = f_j1.imagen;
            }
            for (let f_j2 of fichas_j2) {
                if(f_j2.isSelected(x,y))
                    ficha_j2_seleccionada = f_j2.imagen;
            }
        }

        //para limpiar la pantalla cuando se vuelve al inicio despues de una partida
        function clearCanvas() {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    //Se encarga del juego en si, logica de eventos y logica de juego en algunos casos como trackear el tiempo
    function initGame(tablero, ficha_j1, ficha_j2) {
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mouseup', mouseUp);
        canvas.addEventListener('mousemove', mouseMove);

        let img_reiniciar = new Image();
        img_reiniciar.src = "../images/juego/restart2.jpg";
        let img_menu = new Image();
        img_menu.src = "../images/juego/home2.png";
        let fondo = new Image();
        fondo.src = "../images/juego/fondotablero.jpg";
        let fondo_gameover = new Image();
        fondo_gameover.src = "../images/juego/fondotablero.jpg";
        let fondo_gameover_oscuridad = new Image();
        fondo_gameover_oscuridad.src = "../images/juego/fondo_oscuridad.jpg";

        let boton_menu = new Boton(canvas.width - 60, canvas.height - 60, 50, 50, "M", "#11FF11");
        let boton_reiniciar = new Boton(canvas.width - 120, canvas.height - 60, 50, 50, "R", "#FF1111");
        img_reiniciar.onload = function() {boton_reiniciar.imagen = img_reiniciar};
        img_menu.onload = function() {boton_menu.imagen = img_menu};

        let botones = [];
        botones.push(boton_reiniciar);
        botones.push(boton_menu);

        let cantFichas = (tablero.ancho * tablero.alto);

        let sizeFichas = tablero.getSizeFichas();

        let jugador1 = new Jugador("Luz", ficha_j1, cantFichas / 2, ctx, "red", 0, canvas.offsetHeight, sizeFichas, "green");
        let jugador2 = new Jugador("Oscuridad", ficha_j2, cantFichas / 2, ctx, "blue", canvas.offsetWidth - 150, canvas.offsetHeight, sizeFichas, "yellow");

        tablero.jugadores.push(jugador1);
        tablero.jugadores.push(jugador2);

        //Selecciono el jugador actual como el 1ero en el arreglo
        tablero.jugadorActual = tablero.jugadores[0];
        tablero.jugadorActual.iniciarReloj();
        
        let fichaClickeada = null;
        let coordOriginalFichaX;
        let coordOriginalFichaY;
        let isMouseDown = false; //Click izquierdo presionado
        let interval_id;

        //Inicia el ciclo de reDraw luego de cargar la imagen de fondo
        fondo.onload = function() {
            interval_id = setInterval(() => {
                clearCanvas();                
                ctx.filter = 'blur(6px)';
                ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
                ctx.filter = 'none';
                reDraw();
                gameOverScreen();
            }, 1    );
        }

        //Evento mouseDown para seleccionar fichas y botones
        //Checkea que la partida no haya terminado y selecciona y guarda la pos original de la ficha clickeada
        function mouseDown(e) {
            let x = e.layerX - e.target.offsetLeft;
            let y = e.layerY - e.target.offsetTop;
            for (let i = 0; i < tablero.jugadorActual.fichas.length; i++) {
                if (tablero.jugadorActual.fichas[i].isSelected(x, y) && tablero.jugadorActual.tiempo > 0
                    && tablero.juegoEnCurso) {
                    fichaClickeada = tablero.jugadorActual.fichas[i];
                    indiceFicha = i;
                    isMouseDown = true;
                    coordOriginalFichaX = fichaClickeada.posXFicha;
                    coordOriginalFichaY = fichaClickeada.posYFicha;
                }
            }
            if (boton_menu.isPointInside(x,y)) {
                irAlMenu();
            }
            if (boton_reiniciar.isPointInside(x,y)) {
                reiniciarJuego();
            }
        }

        //evento mouseUp que se encarga de checkear que las fichas se suelten en el lugar indicado
        //de lo contrario las devuelve a su lugar original
        function mouseUp(e) {
            isMouseDown = false;
            if (fichaClickeada != null) {
                let x = e.layerX - e.target.offsetLeft;
                let y = e.layerY - e.target.offsetTop;
                for(let i = 0; i < tablero.ancho; i++) {
                    if (tablero.indicadores[i].isPointInside(x,y) && tablero.jugadorActual.tiempo > 0 
                        && tablero.juegoEnCurso) {
                        tablero.colocarFicha(fichaClickeada, i);
                        if (tablero.jugadores[0].fichas.includes(fichaClickeada))
                            tablero.jugadores[0].fichas.splice(tablero.jugadores[0].fichas.indexOf(fichaClickeada), 1);
                        else
                            tablero.jugadores[1].fichas.splice(tablero.jugadores[1].fichas.indexOf(fichaClickeada), 1); 
                    } else {
                        fichaClickeada.posXFicha = coordOriginalFichaX;
                        fichaClickeada.posYFicha = coordOriginalFichaY;
                    }
                }
                fichaClickeada = null;
            }
        }

        //evento mouseMove que se encarga de habilitar el draggeo de fichas
        //si la ficha se trata de sacar del canvas, la devuelve a su posicion original
        function mouseMove(e) {   
            if (isMouseDown && fichaClickeada != null) {               
                let x = e.layerX - e.target.offsetLeft;
                let y = e.layerY - e.target.offsetTop;
                fichaClickeada.setPos(x, y);
                if (y > canvas.height || x > canvas.width || y < canvas.offsetTop || x < canvas.offsetLeft) {
                    fichaClickeada.setPos(coordOriginalFichaX, coordOriginalFichaY);
                    isMouseDown = false;
                }
            }        
        }
            
        //vuelve al menu principal
        function irAlMenu() {
            clearInterval(interval_id);
            limpiarEventos();
            mostrarMenuInicio();
        }

        //reinicia con el tamaño de tablero actual
        function reiniciarJuego() {
            clearInterval(interval_id);
            limpiarEventos();
            initGame(new Tablero(tablero.ancho, tablero.alto, tablero.fichas_en_linea, tablero.cW, tablero.cH), ficha_j1, ficha_j2);
        }

        //elimina los eventListeners luego de reiniciar o ir al menu para que no se pueda interactuar con el viejo estado
        //del canvas
        function limpiarEventos() {
            canvas.removeEventListener('mousedown', mouseDown);
            canvas.removeEventListener('mouseup', mouseUp);
            canvas.removeEventListener('mousemove', mouseMove);
        }

        //llama a las funciones draw del tablero, de los jugadores y de los botones
        function reDraw() {
            tablero.draw(ctx);
            tablero.jugadores[0].draw();
            tablero.jugadores[1].draw();     
            for(let boton of botones) {
                boton.draw(ctx);
            }
        }
        
        //muestra la pantalla de fin de juego cuando se cumplen las condiciones
        function gameOverScreen() {
            if (!tablero.juegoEnCurso || tablero.jugadorActual.tiempo == 0) {
                clearInterval(interval_id);
                clearCanvas();
                if(tablero.jugadorActual.nombre == 'Luz') {
                    ctx.drawImage(fondo_gameover, 0, 0, canvas.width, canvas.height);
                } else {
                    ctx.drawImage(fondo_gameover_oscuridad, 0, 0, canvas.width, canvas.height);
                }
                ctx.filter = 'none';
                mostrarTextoGameOver();
                
                for(let i = 0; i < botones.length; i++) {
                    if (i == 0)
                        botones[i].posX = (canvas.width / 2) - botones[i].ancho * 2;
                    else
                        botones[i].posX = (canvas.width / 2) + botones[i].ancho;
                    botones[i].posY = canvas.height / 2 + botones[i].alto / 2;
                    botones[i].draw(ctx);
                }
            }

        }

        //muestra el texto correspondiente segun el jugador ganador
        function mostrarTextoGameOver() {
            ctx.lineWidth = 8;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "48px monospace";
            ctx.strokeStyle = "white";
            if (tablero.jugadorActual.tiempo == 0) {
                ctx.strokeText("¡Se termino el tiempo " + tablero.jugadorActual.nombre + "!"
                , canvas.width / 2, canvas.height / 2 - canvas.height / 10);
                ctx.fillText("¡Se termino el tiempo " + tablero.jugadorActual.nombre + "!"
                    , canvas.width / 2, canvas.height / 2 - canvas.height / 10);
                tablero.cambiarTurnoJugador();
            }
            ctx.strokeText("Ganador: " + tablero.jugadorActual.nombre, canvas.width / 2, canvas.height / 2);
            ctx.fillText("Ganador: " + tablero.jugadorActual.nombre, canvas.width / 2, canvas.height / 2);
        }

        //borra el canvas
        function clearCanvas() {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

        }

    }


    
});