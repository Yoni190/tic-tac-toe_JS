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

    // const selectSquare = (row, column, player) => {

    // }

    return {getBoard};
    
}


function Square(){
    let value = 0;

    const addMark = (player) =>{value = player};

    const getValue = ()=>{value};

    return {addMark, getValue};
}

function GameController(){

}

const gb = GameBoard();
console.log(gb.getBoard());