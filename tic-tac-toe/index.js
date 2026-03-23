let statusText = document.getElementById('status')
let restartBtn = document.getElementById('restartBtn')
let tiles = document.querySelectorAll('.tiles')

let options = ['','','','','','','','','']
let currentPlayer = 'X'
let GameRunning = true

let conditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

initiallise()

function initiallise(){
    tiles.forEach(tile=> tile.addEventListener('click', tileClicked))
    restartBtn.addEventListener('click',restartGame)
    statusText.textContent = `${currentPlayer}'s Turn`
}

function tileClicked(){
    let cellIndex = this.getAttribute('data-index')
    if(options[cellIndex]!='' || !GameRunning){
        return ;
    }
    options[cellIndex] = currentPlayer
    this.textContent = currentPlayer
    this.classList.add(currentPlayer=='X'?'PlayerX' : 'PlayerO')
    checkWinner()
}


function checkWinner(){
    let roundWon = false;
    for(let i=0;i<conditions.length;i++){
        let a = options[conditions[i][0]]
        let b = options[conditions[i][1]]
        let c = options[conditions[i][2]]

        if(a=='' || b=='' || c==''){
            continue;
        }
        if(a==b && b==c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer}'s wins!`
        GameRunning = false
    }
    else if(!options.includes('')){
        statusText.textContent = 'Draw'
        GameRunning = false
    }
    else{
        changePlayer()
    }
}

function changePlayer(){
    if(currentPlayer=='X') currentPlayer = 'O';
    else currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s Turn`
}

function restartGame(){
    GameRunning = true;
    currentPlayer = 'X';
    options = ['','','','','','','','','']
    statusText.textContent = `${currentPlayer}'s Turn`

    tiles.forEach(tile => {
        tile.textContent = ''
        tile.classList.remove('PlayerX', 'PlayerO');
    });
}
