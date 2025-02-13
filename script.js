function GameBoard(){
    const board = [];
    const rows = 3;
    const columns = 3;

    // for(let i=0; i<rows; i++){
    //     board[i] = [];
    //     for(let j=0; j<columns; j++){
    //         board[i].push(Square());
    //     }
    // }

    for(let i=0; i<rows; i++){
        board[i] = [];
        for(let j=0; j<columns; j++){
            if(i == 1){
                board[i].push(Square(j+4));
            }
            else if(i == 2){
                board[i].push(Square(j+7));
            }
            else{
                board[i].push(Square(j+1));
            }
        }
    }

    const getBoard = ()=> board;

    const selectSquare = (square, player) => {
        // if(board[row][column].getValue() != 0){
        //     return;
        // }
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
    
}


function Square(num){
    let value = num;

    const addMark = (player) =>{value = player};

    const getValue = ()=> value;

    return {addMark, getValue};
}


const GameController = (function (p1Name = "Player 1", p2Name = "Player 2"){
    const board = GameBoard();
    const choices = [[], []];

    const players = [
        {
            name: p1Name,
            token: 'X'
        },
        {
            name: p2Name,
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
            choices[0].push(square);
            if(choices[0].length >= 3 && winPatterns.some((pattern)=>pattern.every((item)=>choices[0].includes(item)))){
                return true
            }
        }
        else{
            choices[1].push(square);
            if(choices[1].length >= 3 && winPatterns.some((pattern)=>pattern.every((item)=>choices[1].includes(item)))){
                return true
            }
        }
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (square) => {
        console.log(`Putting ${getActivePlayer().name}'s mark...`);
        board.selectSquare(square, getActivePlayer().token);

        if(checkWin(square)){
            console.log(`The winner is ${getActivePlayer().name}`)
            return;
        }
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return{
        playRound, getActivePlayer
    }
})();
