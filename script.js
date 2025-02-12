function GameBoard(){
    const board = [];
    const rows = 3;
    const columns = 3;

    for(let i=0; i<rows; i++){
        board[i] = [];
        for(let j=0; j<columns; j++){
            board[i].push(Square());
        }
    }

    const getBoard = ()=> board;

    const selectSquare = (row, column, player) => {
        if(board[row][column].getValue() != 0){
            return;
        }
        board[row][column].addMark(player);
    }

    const printBoard = ()=>{
        const boardWithValues = board.map((row) => row.map((cell)=> cell.getValue()));
        console.log(boardWithValues);
    }

    return {getBoard, selectSquare, printBoard};
    
}


function Square(){
    let value = 0;

    const addMark = (player) =>{value = player};

    const getValue = ()=> value;

    return {addMark, getValue};
}


function GameController(p1Name = "Player 1", p2Name = "Player 2"){
    const board = GameBoard();

    const players = [
        {
            name: p1Name,
            token: 1
        },
        {
            name: p2Name,
            token: 2
        }
    ]

    let activePlayer = players[0];
    
    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = ()=> activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column) => {
        console.log(`Putting ${getActivePlayer().name}'s mark...`);
        board.selectSquare(row, column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return{
        playRound, getActivePlayer
    }
}

const game = GameController();