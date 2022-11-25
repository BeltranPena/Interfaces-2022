class Indicador {
    constructor(posX, size, cW, cH, tColumnas, tFilas){
        this.posX = posX;
        this.posY = 0;
        this.size = size;
        //Ancho de canvas - ancho de tablero dividido 2
        this.offsetX = (cW - tColumnas) / 2;
        //Alto de canvas - alto de tablero dividido 2
        this.offsetY = - 20 + (cH - tFilas) / 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.posX + this.offsetX, this.posY + this.offsetY, this.size, this.size);
        ctx.fillStyle = "#FFFFFF20";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    //indican si las coords x e y estan dentro del indicador, se usa para saber si se solto una ficha dentro del indicador
    isPointInside(x, y) {
        return x < this.posX + this.size + this.offsetX && x > this.posX + this.offsetX 
            && y < this.posY + this.size + this.offsetY && y > this.posY + this.offsetY;
    }
}