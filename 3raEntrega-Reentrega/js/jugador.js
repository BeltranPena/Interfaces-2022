class Jugador {
    constructor(nombre, imgFicha, cantidadFichas, ctx, fill, posX, posY, sizeFicha) {
        this.nombre = nombre;
        this.imgFicha = imgFicha;        
        this.ctx = ctx;
        this.fill = fill;
        this.cantidadFichas = cantidadFichas;
        this.tiempo = 150;
        this.interval_id;
        this.sizeFicha = sizeFicha;        
        this.posX = posX;
        this.posY = posY;
        this.fichas = this.generarFichas();

    }

    //Genera las fichas del jugador en 2 columnas y las agrega al arreglo de fichas
    generarFichas() {
        let fichas = [];
        let fila = this.posX + 50;
        for (let i = 0; i < this.cantidadFichas; i++) {
            if (i % 2 == 0) {
                fichas.push(new Ficha(this.imgFicha, this.fill, fila + 50, this.posY / 3 + ((i - 1) / 2) * 12, this.sizeFicha));
            } else {
                fichas.push(new Ficha(this.imgFicha, this.fill, fila, this.posY / 3 + (i / 2) * 12, this.sizeFicha));
            }
            fichas[i].draw(this.ctx);
        }
        return fichas;
    }

    //comienza a descontar segundos del reloj del jugador
    iniciarReloj() {
        this.interval_id = setInterval(() => {
            if (this.tiempo > 0)
                this.tiempo--;
        }, 1000);
    }

    //detiene el reloj del jugador, se llama cuando el jugador ha terminado su turno
    detenerReloj() {
        clearInterval(this.interval_id);
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.font = '48px serif';
        let minutos = Math.floor(this.tiempo / 60);
        let segundos = (this.tiempo % 60);
        if (segundos < 10) {
            segundos = '0' + segundos;
        };
        this.ctx.fillText(minutos + ":" + segundos, this.posX + 36*2, 50);
        this.ctx.fillStyle = "black";
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].draw(this.ctx);
        }
    }
}