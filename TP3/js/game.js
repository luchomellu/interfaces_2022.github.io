class juego{
    constructor(){
        let jugador1 = new Jugador("Jugador 1");
        for (let index = 0; index < 21; index++) {
            new Ficha(ctx,Math.random() * ((100-50) + 50),Math.random() * ((100-50) + 50));
        }
        let jugador2 = new Jugador("Jugador 2");
        this.tablero = new this.tablero()
    }

    jugar(){
        let turno = "p";
        let win = false;
        while (win == false){
            turno = "j";
        }
    }


}

