class Ficha {
    constructor(imagen, fill, posXFicha, posYFicha, rad) {
        this.imagen = imagen;
        this.rad = rad;
        this.fill = fill;
        this.posXFicha = posXFicha;
        this.posYFicha = posYFicha;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.posXFicha, this.posYFicha, this.rad, 0, 2 * Math.PI);
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.fill;
        ctx.fill();
        ctx.stroke();
        ctx.drawImage(this.imagen, this.posXFicha-this.rad, this.posYFicha-this.rad, this.rad*2, this.rad*2);
        ctx.closePath();
    }

    //devuelve si las coords x e y estan dentro de la ficha, se usa para saber si se clickeo la ficha
    isSelected(x, y) {
        let _x = this.posXFicha - x;
        let _y = this.posYFicha - y;
        return Math.sqrt(_x * _x + _y * _y) < this.rad;
    }

    //asigna un nuevo par de coordenadas a la ficha
    setPos(x, y) {
        this.posXFicha = x;
        this.posYFicha = y;
    }
}