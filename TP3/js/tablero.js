class Tablero{
    constructor(ctx,numero,imagenCasillero){
        //this.imagenCasillero = new Image();
        //this.imagenCasillero.onload = function(){return};
        //this.imagenCasillero.src = "./images/casillero.jpg";
        this.imagenCasillero = imagenCasillero;
        this.ctx = ctx;
        this.numero = numero;
        console.log(this.numero);
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
        
        //this.col = 14;
        //this.row = 13;
        //this.win = win;
        this.tab = this.setTablero();
    }

    setTablero(){
        let xOrigen = 460 - ((35*this.col)/2);
        let yOrigen = 240 - ((35*(this.row + 1))/2);
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
            let i = this.row + 1;
            while ((this.tab[i][col].tieneFicha() != null)&&(i != 0)){
                i--;
            }
            tab[i][col].setFicha(ficha);
            return true;
        }
        return false;
    }

    isFull(col){
        if (this.tab[1][col].tieneFicha() == null){
            return false;
        } else {
            return true;
        }
    }

    checkWin(){
         // horizontal
        for (let r = row-1; r < 0 ; r--){
            let cont = 1;
            for (let c = 0; c < col-2; c++){
                if (tab[r][c].ficha == tab[r][c+1].ficha){
                    cont++;
                } else {
                    cont = 1;
                }
                if (cont = numero){
                    return ganador;
                }
            }
        }
        // vertical
        for (let c = 0; c < col ; c--){
            let cont = 1;
            for (let r = row-1; r < 1; r++){
                if (tab[r][c].ficha == tab[r+1][c].ficha){
                    cont++;
                } else {
                    cont = 1;
                }
                if (cont = numero){
                    return ganador;
                }
            }
        }

        for (r = 4; r < rows; r++){
            let cont = 1;
            for (c = 0; c < r-1; c++ ) 
            while (tope == false){
               if (tab[r-c][c].ficha == tab[r-c-1][c+1].ficha){
                cont++
               } else {
                cont = 1;
               }
               if (cont = numero){
                return ganador;
               }
            }
        /*for (c = 1; c < col; c++ ){
            let cont = 1;
            for (r = ){
                if (tab[rows-1-c][c].ficha == tab[rows-1-c-1][c+1]){
                    cont++
                } else {
                    cont = 1; LEE BIEN Y TESTEA, TIENE SENTIDO MIRA FOTO
                }
                if (cont = numero){
                    return ganador;
                }
            }
        }
        */
        }

        // anti diagonal
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                        setWinner(r, c);
                        return;
                    }
                }
            }
        }

        // diagonal
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                        setWinner(r, c);
                        return;
                    }
                }
            }
        }
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