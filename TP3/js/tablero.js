class Tablero{
    constructor(ctx,numero,imagenCasillero){
        this.imagenCasillero = imagenCasillero;
        this.ctx = ctx;
        this.numero = numero;
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
        //this.win = win;
        this.tab = this.setTablero();
    }

    setTablero(){
        let xOrigen = 475 - ((35*this.col)/2);
        let yOrigen = 255 - ((35*(this.row + 1))/2);
        let tab = new Array(this.row + 1);
        for (let i = 0; i < this.row + 1; i++) {
            let y = yOrigen + (i*35);
            tab[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                let x = xOrigen + (j*35);
                if(i == 0){
                    tab[i][j] = new DropBox(ctx,x,y,this.imagenCasillero);
                }
                else{
                    console.log(x);
                    tab[i][j] = new Casillero(ctx,x,y,this.imagenCasillero);
                }
            }
        }
        return tab;
    }

    colocarFicha(col, ficha){
        if (this.isFull(col) == false){
            let i = 1;
            while ((this.tab[i][col].tieneFicha() == false) && (i < this.row)){
                i++;
            }
            if((this.tab[i][col].tieneFicha() == true)){
                this.tab[i - 1][col].setFicha(ficha);
                return true;
            }else{
                this.tab[i][col].setFicha(ficha);
                return true;
            }
        }
        return false;
    }

    isFull(col){
        if (this.tab[1][col].tieneFicha() == false){
            return false;
        } else {
            return true;
        }
    }

    isAllFull(){
        for (let index = 0; index < this.col; index++) {
            if (this.tab[1][index].tieneFicha() == false){
                return false;
            }
        }
        return true;
    }

    checkWin(nombre){
         // horizontal
        for (let r = this.row; r > 0 ; r--){
            let cont = 1;
            for (let c = 0; c < this.col-1; c++){
                if(this.tab[r][c].getFicha() != null && this.tab[r][c+1].getFicha() != null){
                    if (this.tab[r][c].getFicha().getJugador() == this.tab[r][c+1].getFicha().getJugador()){
                        cont++;
                    } else {
                        cont = 1;
                    }
                    if (cont == this.numero){
                        return true;
                    }
                }
                else{
                    cont = 1;
                }
            }
        }
        // vertical
        for (let c = 0; c < this.col ; c++){
            let cont = 1;
            for (let r = this.row; r > 1; r--){
                if(this.tab[r][c].getFicha() != null && this.tab[r-1][c].getFicha() != null){
                    if (this.tab[r][c].getFicha().getJugador() == this.tab[r-1][c].getFicha().getJugador()){
                        cont++;
                    } else {
                        cont = 1;
                    }
                    if (cont == this.numero){
                        console.log("gano alguien")
                        return true;
                    }
                }
                else{
                    cont = 1;
                }
            }
        }
        //diagonales
        
        for (let rowStart = 1; rowStart < this.row - 2; rowStart++){
            let count = 0;
            let r;
            let c;
            for (r = rowStart, c = 0; r <= this.row && c < this.col; r++, c++ ){
                if(this.tab[r][c].getFicha() != null){
                    if (this.tab[r][c].getFicha().getJugador().getNombre() == nombre){
                        count++;
                        if (count >= this.numero) return true;
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
        
        // top-left to bottom-right - red diagonals
        for (let colStart = 1; colStart < this.col - 3; colStart++){
            let count = 0;
            let r;
            let c;
            for (r = 1, c = colStart; r < this.row + 1 && c < this.col; r++, c++ ){
                if(this.tab[r][c].getFicha() != null){
                    if(this.tab[r][c].getFicha().getJugador().getNombre() == nombre){
                        count++;
                        if(count >= this.numero) return true;
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
        
        // anti diagonal
        for (let rowStart = 1; rowStart < this.row - 1; rowStart++){
            let count = 0;
            let r;
            let c;
            for (r = rowStart, c = this.col-1; r < this.row + 1&& c >= 0; r++, c--){
                if(this.tab[r][c].getFicha() != null){
                    if (this.tab[r][c].getFicha().getJugador().getNombre() == nombre){
                        count++;
                        if (count >= this.numero) return true;
                    }
                    else {
                        count = 0;
                    }
                } else {
                    count = 0;
                }
            }
        }

        // top-left to bottom-right - red diagonals
        for (let colStart = this.col-2; colStart > 2; colStart--){
            let count = 0;
            let r;
            let c;
            for (r = 1, c = colStart; r < this.row+1 && c >= 0; r++, c--){
                console.log("check anti-diagonal roja: " +r+","+c)
                if(this.tab[r][c].getFicha() != null){
                    if(this.tab[r][c].getFicha().getJugador().getNombre() == nombre){
                        count++;
                        console.log(count);
                        if(count >= this.numero) return true;
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
                if(this.tab[i][j].checkPos(x,y)){
                    return true;
                }
            }
        }
        return false;
    }
    
    getCol(x,y){
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < this.col; j++) {
                if(this.tab[i][j].checkPos(x,y)){
                    return j;
                }
            }
        }
        return false;
    }
    
}