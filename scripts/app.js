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

  // * Maze tiles

  // * Treats
  const treatClass = 'treat'
  const treatPositions = [11, 12, 13]
  const treats = []

  // * Dog
  const dogClass = 'dog'
  const dogStartingPosition = 32
  let dogCurrentPosition = 32

  // * Fence
  const fenceClass = 'fence'
  const fencesPosition = [36, 26, 45] 
  const fences = []

  // * Hoover
  const hooverClass = 'hoover'
  const hooverStartingPosition = 90
  let hooverCurrentPosition = 90

  function createGrid(){
    for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      square.classList.add('square')
      // console.log('SQUARE:', square)
      square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
    addDog(dogStartingPosition)
    // addTreat(treatPositions)
    addHoover(hooverStartingPosition)
  }

  // const cells = document.querySelectorAll('.square')
  function createFence(){
    fencesPosition.forEach((fence) => {
      squares[fence].classList.add(fenceClass)
      fences.push(fence) //pushes individual fence into an array of fences
      // console.log(fences)
    })
  }

  function addDog(dogPosition){
    // console.log('square[dogPosition]', squares[dogPosition])
    squares[dogPosition].classList.add(dogClass)
  }

  function removeDog(position){
    squares[position].classList.remove(dogClass)
  }

  function addTreat(){
    // console.log('square[treatPosition]', squares[treatPosition])
    treatPositions.forEach((treat) => {
      squares[treat].classList.add(treatClass)
      treats.push(treat) //pushes individual treat into an array of treats
      // console.log(treats)
    })
  }

  function removeTreat(){
    treatPositions.forEach((treat) => {
      if (squares[treat].classList.contains(dogClass)){
        squares[treat].classList.remove(treatClass)
        scoreCount.innerText = Number(scoreCount.innerText) + 20
      }
    })
  }

  function addHoover(hooverPosition){
    // console.log('square[hooverPosition]', squares[hooverPosition])
    squares[hooverPosition].classList.add(hooverClass)
  }

  function handleKeyUp(event){
    const key = event.keyCode
    removeDog(dogCurrentPosition)
    
    //moving right
    if (key === 39 && !squares[dogCurrentPosition].classList.contains(fenceClass)){
      dogCurrentPosition++
    } else if (key === 37){ //moving left
      dogCurrentPosition--
    } else if (key === 38 && dogCurrentPosition >= width){ //moving up
      dogCurrentPosition -= width
    } else if (key === 40 && dogCurrentPosition + width <= width * width - 1){ //moving down
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
  createFence()
  addTreat()
}
window.addEventListener('DOMContentLoaded', init)