function init(){
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
  const treatPositions = [1, 2, 4, 6, 7, 8, 10, 13, 14, 15, 16, 19, 23, 24, 25, 26, 28, 29, 30, 31, 36, 37, 38, 40, 41, 42, 45, 46, 47, 48, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 64, 65, 70, 71, 72, 77, 78, 79, 81, 82, 83, 84, 85, 86, 88, 89, 91, 94, 96, 97, 98]
  const treats = []

  // * Dog
  const dogClass = 'dog'
  const dogStartingPosition = 0
  let dogCurrentPosition = 0

  // * Fence
  const fenceClass = 'fence'
  const fencesPosition = [5, 11, 12, 17, 18, 20, 21, 22, 27, 32, 33, 34, 35, 39, 43, 44, 49, 60, 61, 63, 66, 68, 69, 73, 74, 75, 76, 80, 87, 92, 95, 99] 
  const fences = []

  // * Hoover
  const hooverClass = 'hoover'
  const blinkClass = 'blink'
  const hooverStartingPositions = [90, 9] //36]
  let hooverCurrentPosition 
  const hoovers = []

  // * Ball
  const ballClass = 'ball'
  const ballPositions = [3, 50, 67, 93]

  // * GRID
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
  // * FENCE
  function createFence(){
    fencesPosition.forEach((fence) => {
      squares[fence].classList.add(fenceClass)
      fences.push(fence) //pushes individual fence into an array of fences
      // console.log(fences)
    })
  }

  // * DOG FUNCTIONS
  function addDog(dogPosition){
    // console.log('square[dogPosition]', squares[dogPosition])
    squares[dogPosition].classList.add(dogClass)
  }

  function removeDog(position){
    squares[position].classList.remove(dogClass)
  }

  // * TREAT FUNCTIONS
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

  // * HOOVER FUNCTIONS
  function addHoover(){
    // console.log('square[hooverPosition]', squares[hooverPosition])
    hooverStartingPositions.forEach((hoover) => {
      squares[hoover].classList.add(hooverClass)
      hoovers.push(hoover)
      // console.log(hoovers)
    })
  }

  function moveHoover(){
    
  }

  // * BALL FUNCTIONS
  function addBall(){
    ballPositions.forEach((ball) => {
      squares[ball].classList.add(ballClass)
    })
  }

  function removeBall(){
    ballPositions.forEach((ball) => {
      if (squares[ball].classList.contains(dogClass)){
        squares[ball].classList.remove(ballClass)
        scoreCount.innerText = Number(scoreCount.innerText) + 50
        // squares[hoovers].classList.add(blinkClass)
        console.log(blinkClass)
      }
    })
  }

  function handleKeyUp(event){
    const key = event.keyCode
    removeDog(dogCurrentPosition)
    
    //moving right
    if (key === 39 && !(squares[dogCurrentPosition].classList.contains(fenceClass))){
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
    removeBall(ballPositions)
  }

  function handleClick(){
    moveHoover()
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