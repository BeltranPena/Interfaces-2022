class Boton {
    constructor(posX, posY, ancho, alto, texto, fill) {
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.fill = fill;
        this.texto = texto;
        this.isClicked = false;
        this.imagen;
    }

    //dibuja el boton, si no se indica fill, se asigna por defecto el fill que se asignó en el constructor
    draw(ctx, fill = this.fill) {
        ctx.strokeStyle = "black";
        if (this.imagen) {
            ctx.beginPath();
            ctx.arc(this.posX + this.ancho / 2, this.posY + this.ancho / 2, this.ancho / 2, 0, Math.PI * 2);
            ctx.drawImage(this.imagen, this.posX, this.posY, this.ancho, this.alto);
            ctx.lineWidth = 3;
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.roundRect(this.posX, this.posY, this.ancho, this.alto, 5);
            ctx.fillStyle = fill;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.font = "24px lucida sans";
            ctx.textAlign = "center";
            ctx.fillText(this.texto, this.posX + this.ancho / 2, this.posY + ((this.alto + 12) / 2) );
        }


    }

    //indica si las coords x e y estan dentro del boton, usado para saber si se clickeo el boton o no
    isPointInside(x, y) {
        return x < this.posX + this.ancho && x > this.posX 
            && y < this.posY + this.alto && y > this.posY;
    }

    //limpia el estado de clickeado de un boton
    unclickButton(ctx) {
        this.isClicked = false;
        this.draw(ctx);
    }

    //settea isclicked a true y dibuja el boton con un nuevo fill para distinguirlo
    clickButton(ctx, fill) {
        this.isClicked = true;
        this.draw(ctx, fill);
    }
}