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
    
}


function Square(){
    let value = 0;

    const addMark = (player) =>{value = player};

    const getValue = ()=>{value};

    return {addMark, getValue};
}

function GameController(){

}
