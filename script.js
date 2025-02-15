const GameBoard = () => {
    const board = [];
    const rows = 3;
    const columns = 3;

    for(let i=0; i<rows; i++){
        board[i] = [];
        for(let j=0; j<columns; j++){
            if(i == 0){
                //Numbers from 1-3 for row 1
                board[i].push(Square(j+1));
            }
            else if(i == 1){
                //Numbers from 4-6 for row 2
                board[i].push(Square(j+4));
            }
            else{
                //Numbers from 7-9 for row 3
                board[i].push(Square(j+7));
            }
        }
    }

    const getBoard = ()=> board;

    const selectSquare = (square, player) => {
        if(square > 0 && square < 4){
            const row = 0;
            const column = square - 1;
            if(board[row][column].getValue() == 'X' || board[row][column].getValue() == 'O'){
                return;
            }
            board[row][column].addMark(player);
        }
        else if(square > 3 && square < 7){
            const row = 1;
            const column = square - 4;
            if(board[row][column].getValue() == 'X' || board[row][column].getValue() == 'O'){
                return;
            }
            board[row][column].addMark(player);
        }
        else{
            const row = 2;
            const column = square - 7;
            if(board[row][column].getValue() == 'X' || board[row][column].getValue() == 'O'){
                return;
            }
            board[row][column].addMark(player);
        }
    }

    const printBoard = ()=>{
        const boardWithValues = board.map((row) => row.map((cell)=> cell.getValue()));
        console.log(boardWithValues);
    }


    return {getBoard, selectSquare, printBoard};
    
};

let board = GameBoard();


function Square(num){
    let value = num;

    const addMark = (player) =>{value = player};

    const getValue = ()=> value;

    return {addMark, getValue};
}


const displayController = (() => {
    const container = document.querySelector(".container");

    for(let i = 0; i<9; i++){
        const square = document.createElement('div');
        square.classList.add('square', `num-${i+1}`);
        square.innerHTML = "";
        container.appendChild(square);
    }

    const squares = document.querySelectorAll('.square');
    squares.forEach((square)=>{
        square.addEventListener('click', ()=>{
            const selected = square.className.slice(-1);
            if(typeof game == 'string'){
                document.querySelector('.display-paragraph').innerHTML = "Please press the play button";
                return;
            }
            game.playRound(parseInt(selected));
        })
    })


    const displaySquare = () => {
        const gameboard = board.getBoard();

        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach((square)=>{
            square.innerHTML = "";
        });

        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                if(typeof gameboard[i][j].getValue() == 'string'){
                    if(i == 0){
                        var selectedSquare = document.querySelector(`.num-${j+1}`);
                    }
                    else if(i == 1){
                        var selectedSquare = document.querySelector(`.num-${j+4}`);
                    }
                    else{
                        var selectedSquare = document.querySelector(`.num-${j+7}`);
                    }
                    selectedSquare.innerHTML = gameboard[i][j].getValue();
                }
            }
        }
    }
    return {displaySquare};
})();

const scores = [0, 0];

const Game = (name1 = "Player 1", name2 = "Player 2") => {
    const choices = [[], []];


    const players = [
        {
            name: name1,
            token: 'X'
        },
        {
            name: name2,
            token: 'O'
        }
    ]

    let activePlayer = players[0];
    
    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = ()=> activePlayer;

    const checkWin = (square) => {

        const winPatterns = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        
        if(getActivePlayer().token == 'X'){
            if(!choices[0].includes(square)){
                choices[0].push(square);
            }

            if(winPatterns.some((pattern)=>pattern.every((item)=>choices[0].includes(item)))){
                return true
            }
        }
        else{
            if(!choices[1].includes(square)){
                choices[1].push(square);
            }
            
            if(winPatterns.some((pattern)=>pattern.every((item)=>choices[1].includes(item)))){
                return true
            }
        }
    }

    const checkTie = () => {
        if(choices.flat().length == 9){
            return true;
        }
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
        document.querySelector('.display-paragraph').innerHTML = `${getActivePlayer().name}'s turn`;
    }

    const displayScoreBoard = () => {
        const scoreboard = document.querySelector('.scoreboard');
        scoreboard.style.border = "2px solid black";
        const player1 = players[0].name;
        const player2 = players[1].name;

        document.querySelector('.label1').innerHTML = player1;
        document.querySelector('.score1').innerHTML = scores[0]
        document.querySelector('.label2').innerHTML = player2;
        document.querySelector('.score2').innerHTML = scores[1];
    }
    

    const playRound = (square) => {
        console.log(`Putting ${getActivePlayer().name}'s mark...`);
        board.selectSquare(square, getActivePlayer().token);

        if(checkWin(square)){
            document.querySelector('.display-paragraph').innerHTML = `The winner is ${getActivePlayer().name}`;
            playButton.removeEventListener('click', startGame);

            if(getActivePlayer().token == 'X'){
                scores[0]++;
            }
            else{
                scores[1]++;
            }
            displayScoreBoard();
            return;
        }
        else if(checkTie()){
            document.querySelector('.display-paragraph').innerHTML = "It's a tie!";
            playButton.removeEventListener('click', startGame);
            return;
        }
        switchPlayerTurn();
        printNewRound();
        displayController.displaySquare();
    }
    printNewRound();
    displayScoreBoard();
    displayController.displaySquare();
    
   

    return{
        playRound, getActivePlayer
    }
};

const startGame = () => {
    const input1 = document.querySelector('#p1Name');
        const input2 = document.querySelector('#p2Name');
        if(input1.value.trim() !== "" && input2.value.trim() !== ""){
            game = Game(input1.value, input2.value)
            return;
        }
        game = Game();
}
let game = '';
const playButton = document.querySelector('.playButton');
const resetButton = document.querySelector('.resetButton');
playButton.addEventListener('click', startGame);

resetButton.addEventListener('click', () => {
    board = GameBoard();
    startGame();
})


