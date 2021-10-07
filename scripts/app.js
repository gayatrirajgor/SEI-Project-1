function init(){
  // console.log('JS Connected')

  const grid = document.querySelector('.grid')
  // console.log('grid:', grid)

  const width = 10
  const squareCount = width * width
  const squares = []

  const coins = []
  const coinClass = 'coin'
  const coinsPosition = 11

  const marioClass = 'mario'
  const marioStartingPosition = 32
  let marioCurrentPosition = 32

  function createGrid(){
    for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      // console.log('SQUARE:', square)
      // square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
    addMario(marioStartingPosition)
    addCoin(coinsPosition)
  }

  function addMario(marioPosition){
    // console.log('square[marioPosition]', squares[marioPosition])
    squares[marioPosition].classList.add(marioClass)
  }

  function removeMario(position){
    squares[position].classList.remove(marioClass)
  }

  function addCoin(coinPosition){
    // console.log('square[coinPosition]', squares[coinPosition])
    squares[coinPosition].classList.add(coinClass)
  }

  function addEnemy(){

  }


  function handleKeyUp(event){
    const key = event.keyCode
    removeMario(marioCurrentPosition)

    if (key === 39){
      marioCurrentPosition++
    } else if (key === 37){
      marioCurrentPosition--
    } else if (key === 38 && marioCurrentPosition >= width){
      marioCurrentPosition -= width
    } else if (key === 40 && marioCurrentPosition + width <= width * width - 1){
      marioCurrentPosition += width
    } else {
      console.log('INVALID KEY PRESSED')
    }

    addMario(marioCurrentPosition)
  }
  
  // function removeCoin(){

  // }


  document.addEventListener('keyup', handleKeyUp)
  createGrid()

}
window.addEventListener('DOMContentLoaded', init)