class Tablero{
    constructor(ctx,numero){
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
        let yOrigen = 240 - ((35*this.row)/2);
        let tab = new Array(this.row);
        console.log(tab);
        for (let i = 0; i < this.row; i++) {
            let y = yOrigen + (i*35);
            tab[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                let x = xOrigen + (j*35);
                console.log(x);
                tab[i][j] = new Casillero(ctx,x,y);
            }
        }
        //this.drawTablero();
        return tab;
    }

    colocarFicha(col, ficha){
        if (this.isFull(col) == false){
            let i = this.row-1;
            while (tab[i][col] != null){
                i--;
            }
            tab[i][col].setFicha(ficha);
        }
    }

    isFull(col){
        if (tab[0][col] == null){
            return false;
        } else {
            return true;
        }
    }

    checkWin(){
         // horizontal
        for (let r = row-1; r <= 0 ; r--){
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
            for (let r = 0; r < row-2; r++){
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

/*
    for (r = 3; r < rows; r++){
        for (ro = r; ro >= 0; ro- ) <-- nonsense
        let tope = false;
        let index = r;
        while (tope == false){
            if (tab[i][].ficha =)
        }
    }
    */
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

    /*
    drawTablero(){
        
        for (let index = 0; index < row; index++) {
            for (let index = 0; index < array.col; index++) {
                
                
            }
            
        }
    }
    */
}