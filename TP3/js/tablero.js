class Tablero{
    constructor(col, row, win){
        this.col = col;
        this.row = row;
        this.win = win;
        this.tab = setTablero();
    }

    setTablero(){
        let tab = new Array(this.row);
        for (let i = 0; i < this.row; i++) {
            tab[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                a[i][j] = 0;
            }
        }
        return tab;
    }

    colocarFicha(col){
        if (this.isFull(col) == false){
            let i = this.row;
            while (tab[i][col] != 0){
                i--;
            }
            tab[i][col] = 1;
        }
    }

    isFull(col){
        for (let i = 0; i < this.row; i++){
            if (tab[i][col] == 0){
                return false;
            }
        }
        return true;
    }

    checkWin(){
         // horizontal
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
            }
        }

        // vertical
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 3; r++) {
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                        setWinner(r, c);
                        return;
                    }
                }
            }
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
}