class Casilla {
    constructor(size) {
        this.ficha = null;
        this.size = size;
    }        

    draw(ctx, x, y, canvasWidth, canvasHeight, columna, fila) {
        //Dibuja el cuadrado de la casilla
        ctx.beginPath();
        let posXrect = x + ((canvasWidth - columna) / 2);
        let posYrect = y + (this.size / 2) + ((canvasHeight - fila) / 2);
        ctx.rect(posXrect, posYrect, this.size, this.size);
        ctx.fillStyle = "#783305"
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        //Dibuja el circulo de la casilla
        ctx.beginPath();
        let posXcirc = posXrect + this.size / 2;
        let posYcirc = posYrect + this.size / 2;
        ctx.arc(posXcirc, posYcirc, this.size/2, 0, 2 * Math.PI);   
        
        //Si la casilla no tiene ficha pinta un circulo blanco, de lo contrario pinta el circulo con los datos de la ficha
        if (this.ficha == null) {
            ctx.fillStyle = "white";
            ctx.fill();
        }
        else {
            this.ficha.posXFicha = posXcirc;
            this.ficha.posYFicha = posYcirc;
            this.ficha.draw(ctx);
        }
        ctx.stroke();
        ctx.closePath();
    }
}