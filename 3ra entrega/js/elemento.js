class Elemento {

    constructor(ancho, alto, src){
        this.ancho = ancho;
        this.alto = alto;       
        this.src = src;
        this.imagen = null;
    }

    drawElemento(posX, posY, ctx){
        let img = new Image();
        img.src = this.src;
        img.onload = function(){
            ctx.drawImage(this, posX, posY);
        }
        this.imagen = img;        
    }
    
    cargarElemento(posX, posY, ctx){
        ctx.drawImage(this.imagen, posX, posY);
    }
    
    
    //getters y setters
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getSrc(){
        return this.src;
    }
    setSrc(src){
        this.src = src;
    }
    getPosition(){
        return {
            x: this.getX(),
            y: this.getY()
        }
    }
    setPosition(posX, posY){
        this.x = posX;
        this.y = posY;
    }    
}