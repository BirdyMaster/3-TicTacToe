window.addEventListener('DOMContentLoaded', () => {
    let boardClasses = ['x', 'o'];
    board.classList.add (boardClasses[Math.floor(Math.random() * 2)]);
    startGame()

})

const board = document.querySelector('.board')
const cells = document.querySelectorAll('.cell')
const endScreen = document.querySelector('.endScreen')
const restartBtn = document.querySelector('button')
const endText = document.querySelector('.endText')


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
]

function handleEvent(e) {
    let clickedCell = e.target
    let currentBoardClass = board.classList[1]

    if (board.classList.contains('x')) {
            board.classList.remove('x')
            board.classList.add('o')
            clickedCell.classList.add ('x')

    } else if (board.classList.contains('o')) {
            board.classList.remove('o')
            board.classList.add('x')
            clickedCell.classList.add ('o')
    }

    if (checkForWin(currentBoardClass)) {
        endScreen.classList.add('show');
        endText.textContent = `"${currentBoardClass.toUpperCase()}" Laimejo`

    } else if (checkForDraw(currentBoardClass)) {
        endScreen.classList.add('show');
        endText.textContent = "Lygiosios"
    }
}


function checkForWin(chosenClass) {
    return winningCombos.some(combo => {
        return combo.every(x => {
            return cells[x].classList.contains(chosenClass)
})})}

function checkForDraw() {
    return  [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

function startGame() {
    endScreen.classList.remove('show')
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', handleEvent);
        cell.addEventListener('click', handleEvent, {once: true});

    })
}

restartBtn.addEventListener('click', () => {
    startGame()
})
