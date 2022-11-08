class Juego{

    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
    }

    getFill(){
        return this.fill;
    }

    setFill(fill){
        this.fill = fill;
    }

    getPosition(){
        return {
            x:this.getPosX(),
            y:this.getPosY()
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    draw(){
        this.context.fillStyle = this.getFill();
    }

    isPointInside(x,y){
     
    }
}