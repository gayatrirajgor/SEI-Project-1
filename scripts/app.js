function init(){
  // console.log('JS Connected')

  const grid = document.querySelector('.grid')
  // console.log('grid:', grid)
  const button = document.querySelector('button')
  const scoreCount = document.getElementById('score')
  // console.log(scoreCount)
  const livesCount = document.getElementById('lives')
  // console.log(livesCount)

  // * Grid
  const width = 10
  const squareCount = width * width
  const squares = []

  // * Treats
  const treats = []
  const treatClass = 'treat'
  const treatPositions = 11

  // * Dog
  const dogClass = 'dog'
  const dogStartingPosition = 32
  let dogCurrentPosition = 32

  // * Hoover
  const hooverClass = 'hoover'
  const hooverStartingPosition = 90
  let hooverCurrentPosition = 90

  // * Score

  function createGrid(){
    for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      // console.log('SQUARE:', square)
      square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
    addDog(dogStartingPosition)
    addTreat(treatPositions)
    addHoover(hooverStartingPosition)
  }

  function addDog(dogPosition){
    // console.log('square[dogPosition]', squares[dogPosition])
    squares[dogPosition].classList.add(dogClass)
  }

  function removeDog(position){
    squares[position].classList.remove(dogClass)
  }

  function addTreat(treatPosition){
    // console.log('square[treatPosition]', squares[treatPosition])
    squares[treatPosition].classList.add(treatClass)
  }

  function removeTreat(position){
    if (squares[position].classList.contains(dogClass)) {
      squares[position].classList.remove(treatClass)
      scoreCount.innerText = Number(scoreCount.innerText) + 20
    }
  }

  function addHoover(hooverPosition){
    // console.log('square[hooverPosition]', squares[hooverPosition])
    squares[hooverPosition].classList.add(hooverClass)
  }


  function handleKeyUp(event){
    const key = event.keyCode
    removeDog(dogCurrentPosition)
    
    if (key === 39){
      dogCurrentPosition++
    } else if (key === 37){
      dogCurrentPosition--
    } else if (key === 38 && dogCurrentPosition >= width){
      dogCurrentPosition -= width
    } else if (key === 40 && dogCurrentPosition + width <= width * width - 1){
      dogCurrentPosition += width
    } else {
      console.log('INVALID KEY PRESSED')
    }
    
    addDog(dogCurrentPosition)
    removeTreat(treatPositions)
  }

  function handleClick(){

  }

  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('click', handleClick)
  createGrid()

}
window.addEventListener('DOMContentLoaded', init)