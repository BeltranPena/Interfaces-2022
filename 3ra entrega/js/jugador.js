class Jugador{

    constructor(cantFichas, topeXSup, topeXInf, topeYSup, topeYInf, imagenFicha, nombre){ //clase que da estructura a los jugadores
        this.fichas = [];
        this.cantFichasJugador = cantFichas;
        this.topeXSup = topeXSup;
        this.topeXInf = topeXInf;
        this.topeYSup = topeYSup;
        this.topeYInf = topeYInf;
        this.imagenFicha = imagenFicha;
        this.turno = false;
        this.nombre = nombre;
    }
    
    addFichaJugador(){ //se encarga de agregar las fichas en el arreglo con su posicion incial random
        for(let i =0; i < this.cantFichasJugador; i++){
            let posRandomX = Math.floor( this.topeXSup);
            let posRandomY = Math.floor( this.topeYSup);
            this.fichas.push(new Ficha(80,80, this.imagenFicha)); //prueba para guardar las fichas
            this.fichas[i].setPosition(posRandomX, posRandomY-50);
        }  
    }

    getSize(){
        return this.fichas.length;
    }
    getFichas(){
        return this.fichas;
    }

    setTurno(turno){
        this.turno = turno;
    }
    
    getTurno(){
        return this.turno;
    } 
}