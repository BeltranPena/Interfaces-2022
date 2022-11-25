class Tablero {
    constructor(ancho, alto, fichas_en_linea, cW, cH) {
        this.ancho = ancho; //Cant columnas
        this.alto = alto;   //Cant filas
        this.cW = cW; // Canvas Width
        this.cH = cH; // Canvas height

        this.sizeFicha = cW / (fichas_en_linea*3.2);

        this.tablero = [];
        this.indicadores = [];

        this.tamanioColumnas = (this.ancho * this.sizeFicha);
        this.tamanioFilas = (this.alto * this.sizeFicha);

        for(let j = 0; j < alto; j++) { //de 0 a cantidad de filas
            let fila = [];  // instancio una fila
            for(let i = 0; i < ancho; i++) {   //de 0 a cantidad de columnas
                if (j == 0) {   //si estoy en el primer ciclo
                    this.indicadores.push(new Indicador(i * this.sizeFicha, this.sizeFicha, this.cW, this.cH, this.tamanioColumnas, this.tamanioFilas));   //Creo indicador donde tirar como cant de columnas
                }
                fila.push(new Casilla(this.sizeFicha)); //Instancio cantidad de casillas como columnas
            }
            this.tablero.push(fila); // Agrego la fila generada al tablero y repito
        }
        this.fichas_en_linea = fichas_en_linea; //genero x cantidad de ficha
        this.jugadores = [];    //Creo el arreglo de jugadores
        this.jugadorActual = null;  //El jugador inicial esta vacio
        this.juegoEnCurso = true;
    }

    getSizeFichas(){
        return this.sizeFicha/2;
    }

    //Coloca una nueva ficha en el tablero, checkeando donde debe caer teniendo en cuenta las fichas debajo de la ficha
    //a colocar
    colocarFicha(nueva, columna) {
        //Compruebo que el primer lugar de la columna no este ocupado
        if (this.tablero[0][columna].ficha == null) {
            for(let i = 0; i < this.alto; i++) {
                if (this.tablero[i + 1] == undefined || this.tablero[i + 1][columna].ficha != null) {
                    this.tablero[i][columna].ficha = nueva;
                    return this.jugadaGanadora(i, columna);
                }
            }
        }
    }

    //Checkea si una jugada es una jugada ganadora o no
    //en caso de serlo setea la variable juegoEnCurso en false para que desde juego.js se pueda avanzar a la pantalla
    //de gameOver. Caso contrario cambia de jugador y continua el juego
    jugadaGanadora(fila, columna) {
        if (this.checkHorizontal(fila, columna) || this.checkVertical(fila, columna) 
            || this.checkDiagonales(fila, columna)) {
                console.log("Jugador ganador: " + this.jugadorActual.nombre);
                this.jugadorActual.detenerReloj();
                this.juegoEnCurso = false;
                return true;
        }
        this.cambiarTurnoJugador();
        return false;
    }

    //Cambia el jugadorActual e inicia su reloj
    cambiarTurnoJugador() {
        this.jugadorActual.detenerReloj();
        if (this.jugadorActual == this.jugadores[0]) 
            this.jugadorActual = this.jugadores[1];
        else {
            this.jugadorActual = this.jugadores[0];
        }
        this.jugadorActual.iniciarReloj();
    }

    //Checkeo horizontal de fichas
    checkHorizontal(fila, columna) {
        let pos = columna - 1;
        let sumaFichas = 1;
        let contiguo = true;
        //Check izq
        while (pos >= 0 && contiguo) {  
            if (this.casillaTieneFichaJugadorAct(fila, pos)) {
                sumaFichas++;
                pos--;
            } else
            contiguo = false;
        }
        //Check der
        pos = columna + 1;
        contiguo = true;
        while (pos < this.ancho && contiguo) {
            if (this.casillaTieneFichaJugadorAct(fila, pos)) {
                sumaFichas++;
                pos++;
            } else
                contiguo = false;
        }
        return sumaFichas >= this.fichas_en_linea;
    }

    //Checkeo vertical de fichas
    checkVertical(fila, columna) {
        let pos = fila - 1;
        let sumaFichas = 1;
        let contiguo = true;
        //Check arriba
        while (pos >= 0 && contiguo) {
            if (this.casillaTieneFichaJugadorAct(pos, columna)) {
                sumaFichas++;
                pos--;
            } else
                contiguo = false;
        }
        pos = fila + 1;
        contiguo = true;
        //Check abajo
        while (pos < this.alto && contiguo) {
           if (this.casillaTieneFichaJugadorAct(pos, columna)) {
                sumaFichas++;
                pos++;
           } else
            contiguo = false;
        }
        return sumaFichas >= this.fichas_en_linea;
    }

    //Se utiliza junto con los checkeos direccionales para saber si la casilla contiene una ficha del jugador actual o no
    casillaTieneFichaJugadorAct(fila, columna) {
        let tipo_ficha = this.jugadorActual.imgFicha;

        if (this.tablero[fila][columna].ficha != null) {
            if (this.tablero[fila][columna].ficha.imagen.src == tipo_ficha.src)
                return true;
        }
        return false;
    }

    //Retorna true si algunas de las diagonales dio true
    checkDiagonales(fila, columna) {
        return (this.checkDiagonalIzq(fila, columna) || this.checkDiagonalDer(fila, columna));

    }

    //Diagonal que va desde la esq sup izq hasta la esq inf der '\' 
    checkDiagonalIzq(fila, columna) { 
        let posX = columna - 1;
        let posY = fila - 1;
        let sumaFichas = 1;
        let contiguo = true;
        while (posX >= 0 && posY >= 0 && contiguo) {
            if (this.casillaTieneFichaJugadorAct(posY, posX)) {
                sumaFichas++;
                posX--;
                posY--;
            } else
                contiguo = false;
        }
        contiguo = true;
        posX = columna + 1;
        posY = fila + 1;
        while (posX < this.ancho && posY < this.alto && contiguo) {
            if (this.casillaTieneFichaJugadorAct(posY, posX)) {
                sumaFichas++;
                posX++;
                posY++;
            } else
                contiguo = false;
        }
        return sumaFichas >= this.fichas_en_linea;

    }

    //Diagonal que va desde la esq sup der hasta la esq inf izq '/'
    checkDiagonalDer(fila, columna) {
        let posX = columna + 1;
        let posY = fila - 1;
        let sumaFichas = 1;
        let contiguo = true;
        while(posX < this.ancho && posY >= 0 && contiguo) {
            if (this.casillaTieneFichaJugadorAct(posY, posX)) {
                sumaFichas++;
                posX++;
                posY--;
            } else
                contiguo = false;
        }
        contiguo = true;
        posX = columna - 1;
        posY = fila + 1;
        while(posX >= 0 && posY < this.alto && contiguo) {
            if (this.casillaTieneFichaJugadorAct(posY, posX)) {
                sumaFichas++;
                posX--;
                posY++;
            } else
                contiguo = false;
        }
        return sumaFichas >= this.fichas_en_linea;

    }

    draw(ctx) {
        for(let i = 0; i < this.alto; i++) {    //De 0 a cantidad de filas
            for(let j = 0; j < this.ancho; j++) {   //De 0 a cantidad de columnas
                if (i == 0) {
                    this.indicadores[j].draw(ctx);  //Dibujo el indicador en el contexto
                }
                this.tablero[i][j].draw(ctx, this.sizeFicha * j, this.sizeFicha * i, this.cW, this.cH, this.tamanioColumnas, this.tamanioFilas);
                //Accedo a la pos i del tablero, que me va a devolver una FILA, y accedo a la pos J de la fila y la dibujo 
            }
        }
    }

    
}