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
        board[row][column].addMark(player);
    }

    return {getBoard, selectSquare};
    
}


function Square(){
    let value = 0;

    const addMark = (player) =>{value = player};

    const getValue = ()=>{value};

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
}