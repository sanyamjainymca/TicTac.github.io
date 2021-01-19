let resultDiv = document.getElementById('winner');
let playerDiv = document.getElementById('PlayerStatus');
let block_0 = document.getElementById('block_0');
let block_1 = document.getElementById('block_1');
let block_2 = document.getElementById('block_2');
let block_3 = document.getElementById('block_3');
let block_4 = document.getElementById('block_4');
let block_5 = document.getElementById('block_5');
let block_6 = document.getElementById('block_6');
let block_7 = document.getElementById('block_7');
let block_8 = document.getElementById('block_8');
let resetButton = document.getElementById('btn-reset');


block_0.addEventListener('click', () => {
    game1.makeMove(1)
    //block_0.className += (" playerWin");
})
block_1.addEventListener('click', () => {
    game1.makeMove(2)
})
block_2.addEventListener('click', () => {
    game1.makeMove(3)
})
block_3.addEventListener('click', () => {
    game1.makeMove(4)
})
block_4.addEventListener('click', () => {
    game1.makeMove(5)
})
block_5.addEventListener('click', () => {
    game1.makeMove(6)
})
block_6.addEventListener('click', () => {
    game1.makeMove(7)
})
block_7.addEventListener('click', () => {
    game1.makeMove(8)
})
block_8.addEventListener('click', () => {
    game1.makeMove(9)
})
resetButton.addEventListener('click', () => {
    game1.resetGame()
})

class player {
    constructor(playerSymbol) {
        this.playerSymbol = playerSymbol;
    }
};

class Board{     
    constructor(){
        this.boardArray = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    }
    updateBoard(pos, player){
        pos -= 1;
        this.boardArray[Math.floor(pos/3)][pos%3] = player;
    }
    printBoard(){
        return String(this.boardArray[0][0]) + String(this.boardArray[0][1]) + String(this.boardArray[0][2]) + '\n' + String(this.boardArray[1][0]) + String(this.boardArray[1][1]) + String(this.boardArray[1][2]) + '\n' + String(this.boardArray[2][0]) + String(this.boardArray[2][1]) + String(this.boardArray[2][2]); 
    }
    resetBoard(){
        this.boardArray = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    }
    updateFront(mov, player){
        mov -=1;

        switch(mov){
            case 0:
                block_0.textContent = player;
                break;
            case 1:
                block_1.textContent = player;
                break;
            case 2:
                block_2.textContent = player;
                break;
            case 3:
                block_3.textContent = player;
                break;  
            case 4:
                block_4.textContent = player;
                break;
            case 5:
                block_5.textContent = player;
                break; 
            case 6:
                block_6.textContent = player;
                break;
            case 7:
                block_7.textContent = player;
                break;
            case 8:
                block_8.textContent = player;
                break;                
        }
    }

    updateAnswerFront(ansNumber, player){
        let classToAdd = player=='X' ? " playerWin" : " computerWin";
        switch(ansNumber){
            case 1:
                block_0.className += classToAdd;
                block_1.className +=  (classToAdd);
                block_2.className += (classToAdd);
                break;
            case 2:
                block_3.className += (classToAdd);
                block_4.className += (classToAdd);
                block_5.className += (classToAdd);
                break;
            case 3:
                block_6.className += (classToAdd);
                block_7.className += (classToAdd);
                block_8.className += (classToAdd);
                break;  
            case 4:
                block_0.className += (classToAdd);
                block_3.className += (classToAdd);
                block_6.className += (classToAdd);
                break;
            case 5:
                block_1.className += (classToAdd);
                block_4.className += (classToAdd);
                block_7.className += (classToAdd);
                break; 
            case 6:
                block_2.className += (classToAdd);
                block_5.className += (classToAdd);
                block_8.className += (classToAdd);
                break;
            case 7:
                block_0.className += (classToAdd);
                block_4.className += (classToAdd);
                block_8.className += (classToAdd);
                break;
            case 8:
                block_2.className += (classToAdd);
                block_4.className += (classToAdd);
                block_6.className += (classToAdd);
                break;                
        }
    }
};

class refree{
    constructor() {}
    
    matrix_pos(movPos) {
        movPos -= 1; 
        this.positionX = Math.floor(movPos/3);
        this.positionY = movPos%3;
    }
    rowChecker(symbol,board) {
        let row;
        for(row=0;row<3;row++)
        {
            if(symbol!=board[this.positionX][row])
            {
                return 0;
            }
        }
        return 1+this.positionX;
    }
    columnChecker(symbol,board) {
        let col;
        for(col=0;col<3;col++)
        {
            if(symbol!=board[col][this.positionY])
            {
                return 0;
            }
        }
        return 4+this.positionY;
    }
    diagonalChecker(symbol,board) {
        if(board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[1][1]===symbol) return 7;
        else if(board[2][0]===board[1][1] && board[1][1]===board[0][2] && board[1][1]===symbol) return 8;

        return 0;
    }

    legalMove(board, move) {   
        if(isNaN(move)) return false;
        if(move<=0 || move>=10) return false;
        this.matrix_pos(move);
        if(board[this.positionX][this.positionY] != '-') {
            return false;
        }
        return true;   
    }
    
    checkWin(board,move) {   
        let symbol = board[this.positionX][this.positionY];
        return (this.rowChecker(symbol,board) || this.columnChecker(symbol,board) || this.diagonalChecker(symbol,board));
    }
    
};

class TicTacToe {
    constructor() {
        this.moveCount = 9;
        this.movePos = -1;
        this.whichPlayerMove = 'X'; 
        this.rfre = new refree; 
        this.b = new Board();
        this.state = false;
        playerDiv.textContent = "X's Turn!";
        resultDiv.textContent = "";
    }

    
    
    makeMove(move){

        if(this.state==true){
            resultDiv.textContent = "Please Reset the game!";
            return;
        }

        if(this.moveCount===0){
            //draw
            playerDiv.textContent = "It's a Draw!";
            resultDiv.textContent = "Please Reset the game!";
            return;
        }

        move = Number(move);
        
        if(this.rfre.legalMove(this.b.boardArray, Number(move)) === false){
            resultDiv.textContent = "Invalid Move";
            return;
        }

        //back update
        this.b.updateBoard(Number(move), this.whichPlayerMove);

        //front update

        this.b.updateFront(Number(move), this.whichPlayerMove);
        
        resultDiv.textContent = "";
        
        let checkAnswer = this.rfre.checkWin(this.b.boardArray, move);
        if(checkAnswer>0){
            //update of answer front
            this.b.updateAnswerFront(checkAnswer, this.whichPlayerMove);
            playerDiv.textContent = "Player " + this.whichPlayerMove + " Won!";
            this.state = true;
            return;
        }

        this.whichPlayerMove = this.whichPlayerMove=='X' ? 'O' : 'X';

        this.moveCount -= 1;

        if(this.moveCount===0){
            //draw
            playerDiv.textContent = "It's a Draw!";
            resultDiv.textContent = "Please Reset the game!";
            block_0.classList.add("draw");
            block_1.classList.add("draw");
            block_2.classList.add("draw");
            block_3.classList.add("draw");
            block_4.classList.add("draw");
            block_5.classList.add("draw");
            block_6.classList.add("draw");
            block_7.classList.add("draw");
            block_8.classList.add("draw");         
            return;
        }
        resultDiv.textContent = "";
        playerDiv.textContent = this.whichPlayerMove + "'s Turn!";

    }

    resetGame() {
        this.b.resetBoard();
        this.moveCount = 9;
        this.movePos = -1;
        this.state = false;
        block_0.textContent = "";
        block_1.textContent = "";
        block_2.textContent = "";
        block_3.textContent = "";
        block_4.textContent = "";
        block_5.textContent = "";
        block_6.textContent = "";
        block_7.textContent = "";
        block_8.textContent = "";
        block_0.classList.remove("playerWin", "computerWin", "draw");
        block_1.classList.remove("playerWin", "computerWin", "draw");
        block_2.classList.remove("playerWin", "computerWin", "draw");
        block_3.classList.remove("playerWin", "computerWin", "draw");
        block_4.classList.remove("playerWin", "computerWin", "draw");
        block_5.classList.remove("playerWin", "computerWin", "draw");
        block_6.classList.remove("playerWin", "computerWin", "draw");
        block_7.classList.remove("playerWin", "computerWin", "draw");
        block_8.classList.remove("playerWin", "computerWin", "draw");

        this.whichPlayerMove = 'X';
        playerDiv.textContent = "X's Turn!";
        resultDiv.textContent = "";
    }
}

let game1 = new TicTacToe();

game1.resetGame();

function printer(mov){
    console.log("Button Pushed" + mov);
}

