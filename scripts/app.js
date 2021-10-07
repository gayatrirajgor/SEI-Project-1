function init(){
  // console.log('JS Connected')

  const grid = document.querySelector('.grid')
  const button = document.querySelector('button')
  // console.log('grid:', grid)

  const width = 10
  const squareCount = width * width
  const squares = []

  const treats = []
  const treatClass = 'treat'
  const treatPositions = 11

  const dogClass = 'dog'
  const dogStartingPosition = 32
  let dogCurrentPosition = 32


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
  }

  function addDog(dogPosition){
    // console.log('square[marioPosition]', squares[marioPosition])
    squares[dogPosition].classList.add(dogClass)
  }

  function removeDog(position){
    squares[position].classList.remove(dogClass)
  }

  function addTreat(treatPosition){
    // console.log('square[coinPosition]', squares[coinPosition])
    squares[treatPosition].classList.add(treatClass)
  }

  function removeTreat(position){

  }

  // function addEnemy(){

  // }


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
  }

  function handleClick(){

  }

  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('click', handleClick)
  createGrid()

}
window.addEventListener('DOMContentLoaded', init)