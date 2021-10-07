function init(){
  // console.log('JS Connected')

  const grid = document.querySelector('.grid')
  // console.log('grid:', grid)

  const width = 10
  const squareCount = width * width
  const squares = []

  const coinClass = 'coin'
  const marioClass = 'mario'
  const marioStartingPosition = 32
  let marioCurrentPosition = 32

  function createGrid(){
    for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      // console.log('SQUARE:', square)
      square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
    addMario(marioStartingPosition)
  }

  function addMario(marioPosition){
    // console.log('square[marioPosition]', squares[marioPosition])
    squares[marioPosition].classList.add(marioClass)
  }
  function removeMario(position){
    squares[position].classList.remove(marioClass)
  }
  function addCoin(){
    
  }



  createGrid()

}
window.addEventListener('DOMContentLoaded', init)