class Tablero{
    constructor(ctx,numero,imagenCasillero){
        this.imagenCasillero = imagenCasillero;
        this.ctx = ctx;
        this.numero = numero;
        //dependiendo el numero seteamos el tamanio del tablero
        switch (this.numero != null) {
            case (this.numero == 4):
                this.col = 7;
                this.row = 6;
                break;
            case (this.numero == 5):
                this.col = 8;
                this.row = 7;
                break;
            case (this.numero == 6):
                this.col = 9;
                this.row = 8;
                break;
            case (this.numero == 7):
                this.col = 10;
                this.row = 9;
                break;
            default:
                break;
        }
        this.tab = this.setTablero();
    }

    setTablero(){
        let xOrigen = 475 - ((35*this.col)/2);
        let yOrigen = 255 - ((35*(this.row + 1))/2);//calculo el x e y de donde se empieza a dibujar el tablero
        let tab = new Array(this.row + 1);//creo un array de filas (una de ellas es una fila de dropboxes)
        for (let i = 0; i < this.row + 1; i++) {
            let y = yOrigen + (i*35);
            tab[i] = new Array(this.col);//creo array de columnas
            for (let j = 0; j < this.col; j++) {
                let x = xOrigen + (j*35);
                if(i == 0){//si es la primera fila creo los dropboxes
                    tab[i][j] = new DropBox(ctx,x,y,this.imagenCasillero);
                }
                else{//despues creo los casilleros
                    console.log(x);
                    tab[i][j] = new Casillero(ctx,x,y,this.imagenCasillero);
                }
            }
        }
        return tab;
    }

    colocarFicha(col, ficha){
        if (this.isFull(col) == false){//pregunto si la columna esta llena, si lo esta no se coloca la ficha
            let i = 1;
            while ((this.tab[i][col].tieneFicha() == false) && (i < this.row)){//itero para encontrar el ultimo casillero disponible
                i++;
            }
            if((this.tab[i][col].tieneFicha() == true)){//controlo cuando la ficha esta en la ultima posicion, sino se rompe la funcion
                this.tab[i - 1][col].setFicha(ficha);
                return true;
            }else{
                this.tab[i][col].setFicha(ficha);//seteo la ficha en el casillero
                return true;
            }
        }
        return false;
    }

    isFull(col){
        if (this.tab[1][col].tieneFicha() == false){//si en la primera fila dada una columna hay una ficha, es que la columna esta llena
            return false;
        } else {
            return true;
        }
    }

    isAllFull(){
        for (let index = 0; index < this.col; index++) {//itero todas las columnas para ver si estan llenas
            if (this.tab[1][index].tieneFicha() == false){
                return false;//si una columna no esta llena, corta el recorrido
            }
        }
        return true;
    }

    checkWin(nombre){
         //checkeo horizontal en todo el tablero
        for (let r = this.row; r > 0 ; r--){
            let cont = 1;
            for (let c = 0; c < this.col-1; c++){
                if(this.tab[r][c].getFicha() != null && this.tab[r][c+1].getFicha() != null){ //primero checkeo que el casillero donde estoy parado y el siguiente tenga una ficha
                    if (this.tab[r][c].getFicha().getJugador() == this.tab[r][c+1].getFicha().getJugador()){//despues checkeo si el casillero donde estoy parado tiene la misma ficha que el casillero siguiente
                        cont++;
                    } else {
                        cont = 1;
                    }
                    if (cont == this.numero){//si encuentro x numero de fichas seguidas iguales, donde x es la cantidad de fichas deseadas para ganar el juego, gana el jugador de turno (ya que nunca al poner una ficha puede ganar el jugador contrario)
                        return true;
                    }
                }
                else{
                    cont = 1;
                }
            }
        }
        //checkeo vertical en todo el tablero
        for (let c = 0; c < this.col ; c++){
            let cont = 1;
            for (let r = this.row; r > 1; r--){
                if(this.tab[r][c].getFicha() != null && this.tab[r-1][c].getFicha() != null){//primero checkeo que el casillero donde estoy parado y el siguiente tenga una ficha
                    if (this.tab[r][c].getFicha().getJugador() == this.tab[r-1][c].getFicha().getJugador()){//despues checkeo si el casillero donde estoy parado tiene la misma ficha que el casillero anterior
                        cont++;
                    } else {
                        cont = 1;
                    }
                    if (cont == this.numero){//si encuentro x numero de fichas seguidas iguales, donde x es la cantidad de fichas deseadas para ganar el juego, gana el jugador de turno (ya que nunca al poner una ficha puede ganar el jugador contrario)
                        return true;
                    }
                }
                else{
                    cont = 1;
                }
            }
        }
        //checkeo diagonales en todo el tablero
        
        for (let rowStart = 1; rowStart < this.row - 2; rowStart++){
            let count = 0;
            let r;
            let c;
            for (r = rowStart, c = 0; r <= this.row && c < this.col; r++, c++ ){
                if(this.tab[r][c].getFicha() != null){//checkeo que donde estoy parado tenga ficha
                    if (this.tab[r][c].getFicha().getJugador().getNombre() == nombre){//checkeo que el casillero tenga ficha del jugador de turno
                        count++;
                        if (count >= this.numero) return true;//si encuentro x numero de fichas seguidas iguales, donde x es la cantidad de fichas deseadas para ganar el juego, gana el jugador de turno (ya que nunca al poner una ficha puede ganar el jugador contrario)
                    }
                    else {
                        count = 0;
                    }
                }
                else{
                    count = 0;
                }
            }
            //YA FUNCIONA NO TOCAR
        }
        
        for (let colStart = 1; colStart < this.col - 3; colStart++){
            let count = 0;
            let r;
            let c;
            for (r = 1, c = colStart; r < this.row + 1 && c < this.col; r++, c++ ){
                if(this.tab[r][c].getFicha() != null){//checkeo que donde estoy parado tenga ficha
                    if(this.tab[r][c].getFicha().getJugador().getNombre() == nombre){//checkeo que el casillero tenga ficha del jugador de turno
                        count++;
                        if(count >= this.numero) return true;//gana alguien
                    }
                    else {
                        count = 0;
                    }
                }
                else{
                    count = 0;
                }
            }
            //FUNCIONA NO TOCAR
        }
        
        //checkeo anti diagonales en todo el tablero
        for (let rowStart = 1; rowStart < this.row - 1; rowStart++){
            let count = 0;
            let r;
            let c;
            for (r = rowStart, c = this.col-1; r < this.row + 1&& c >= 0; r++, c--){
                if(this.tab[r][c].getFicha() != null){//checkeo que donde estoy parado tenga ficha
                    if (this.tab[r][c].getFicha().getJugador().getNombre() == nombre){//checkeo que el casillero tenga ficha del jugador de turno
                        count++;
                        if (count >= this.numero) return true;//gana alguien
                    }
                    else {
                        count = 0;
                    }
                } else {
                    count = 0;
                }
            }
        }

        for (let colStart = this.col-2; colStart > 2; colStart--){
            let count = 0;
            let r;
            let c;
            for (r = 1, c = colStart; r < this.row+1 && c >= 0; r++, c--){
                console.log("check anti-diagonal roja: " +r+","+c)
                if(this.tab[r][c].getFicha() != null){//checkeo que donde estoy parado tenga ficha
                    if(this.tab[r][c].getFicha().getJugador().getNombre() == nombre){//checkeo que el casillero tenga ficha del jugador de turno
                        count++;
                        console.log(count);
                        if(count >= this.numero) return true;//gana alguien
                    }
                    else {
                        count = 0;
                    }
                } else {
                    count = 0;
                }
            }
        }
        
        return false;
    }

    
    drawTablero(){
        for (let i = 0; i < this.row + 1; i++) {
            for (let j = 0; j < this.col; j++) {
                if(i == 0){
                    this.tab[i][j].drawDropBox();
                }
                else{
                    this.tab[i][j].drawCasillero();
                }
            }
        }
    }

    checkPosValida(x,y){
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < this.col; j++) {
                if(this.tab[i][j].checkPos(x,y)){//checkeo si se quiere tirar una ficha a un dropbox
                    return true;
                }
            }
        }
        return false;
    }
    
    getCol(x,y){
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < this.col; j++) {
                if(this.tab[i][j].checkPos(x,y)){//devuelvo la columna dada un x e y
                    return j;
                }
            }
        }
        return false;
    }
    
}