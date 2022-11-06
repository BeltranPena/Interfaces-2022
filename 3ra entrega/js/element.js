class Element {

    constructor (x, y, fill, context) {
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.cxt = context;
        this.resaltado = false;
        this.resaltadoStyle = "red";
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition(x, y) {
        return {
            x: this.getX(),
            y: this.getY()
        }
    }

    setFill(fill) {this.fill = fill;}

    getFill() { return this.fill;}

    getX() { return this.x;}

    getY() { return this.y;}

    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    // isPointInside(x, y) {};
}