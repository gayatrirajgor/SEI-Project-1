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
  const treatPositions = [14, 18, 21, 31, 41, 42, 43, 53, 54, 61, 62, 63, 64, 71]
  const treats = []

  // * Dog
  const dogClass = 'dog'
  const dogStartingPosition = 32
  let dogCurrentPosition = 32

  // * Fence
  const fenceClass = 'fence'
  const fencesPosition = [11, 12, 13, 45, 51, 52, 55, 65, 72, 73, 74, 75, 76] 
  const fences = []

  // * Hoover
  const hooverClass = 'hoover'
  const hooverStartingPositions = [90, 9, 35]
  let hooverCurrentPosition = 90

  // * Ball
  const ballClass = 'ball'
  const ballPositions = [3, 50, 66, 93]

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
    // addHoover(hooverStartingPositions)
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

  function addHoover(){
    // console.log('square[hooverPosition]', squares[hooverPosition])
    hooverStartingPositions.forEach((hoover) => {
      squares[hoover].classList.add(hooverClass)
    })
  }

  function addBall(){
    ballPositions.forEach((ball) => {
      squares[ball].classList.add(ballClass)
    })
  }

  function handleKeyUp(event){
    const key = event.keyCode
    removeDog(dogCurrentPosition)
    
    //moving right
    if (key === 39 && !squares[dogCurrentPosition].classList.contains(fenceClass)){
      dogCurrentPosition++
    } else if (key === 37 && !squares[dogCurrentPosition].classList.contains(fenceClass)){ //moving left
      dogCurrentPosition--
    } else if (key === 38 && dogCurrentPosition >= width && !squares[dogCurrentPosition].classList.contains(fenceClass)){ //moving up
      dogCurrentPosition -= width
    } else if (key === 40 && dogCurrentPosition + width <= width * width - 1 && !squares[dogCurrentPosition].classList.contains(fenceClass)){ //moving down
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
  addHoover()
  addBall()
}
window.addEventListener('DOMContentLoaded', init)