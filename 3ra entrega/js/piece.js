class Piece extends Element {

    constructor(x, y, fill, context, radious) {
        super(x, y, fill, context);
        this.radious = radious;
    }

    getRadious() {return this.radious;}

    setRadious(radious) {this.radious = radious;}

    draw() {
        this.cxt.beginPath();
        this.cxt.arc(this.x, this.y, this.radious, 0, 2 * Math.PI);
        this.cxt.stroke();

        // if(this.resaltado === true) {
        //     this.cxt.strokeStyle = this.resaltadoStyle;
        //     this.cxt.lineWidth = 5;
        //     this.cxt.stroke();
        // }

        this.cxt.closePath();
    }

    isPointInside(x, y) {
        let _x = this.x - x;
        let _y = this.y - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radious;
    }
}