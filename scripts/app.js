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
  const mazeTiles = [0, 1, 2, 3, 4, 6, 7, 8, 10, 13, 14, 15, 16, 19, 23, 24, 25, 26, 28, 29, 30, 31, 36, 37, 38, 40, 41, 42, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 64, 65, 67, 70, 71, 72, 77, 78, 79, 81, 82, 83, 84, 85, 86, 88, 89, 91, 93, 94, 96, 97, 98]

  // * Treats
  const treatClass = 'treat'
  const treatPositions = [1, 2, 4, 6, 7, 8, 10, 13, 14, 15, 16, 19, 23, 24, 25, 26, 28, 29, 30, 31, 36, 37, 38, 40, 41, 42, 45, 46, 47, 48, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 64, 65, 70, 71, 72, 77, 78, 79, 81, 82, 83, 84, 85, 86, 88, 89, 91, 94, 96, 97, 98]
  const treats = []
  const munchSound = document.getElementById('munch')

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
  const hooverStartingPositions = [90, 9, 45] //36]
  let hoover1CurrentPosition = 90
  let hoover2CurrentPosition = 9
  let hoover3CurrentPosition = 45
  const hoovers = []

  // * Ball
  const ballClass = 'ball'
  const ballPositions = [3, 50, 67, 93]
  const balls = []

  let gameOver = true

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

  // * FENCE
  function createFence(){
    fencesPosition.forEach((fence) => {
      squares[fence].classList.add(fenceClass)
      fences.push(fence) //pushes individual fence into an array of fences
    })
  }

  // * DOG FUNCTIONS
  function addDog(dogPosition){
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
    })
  }

  function removeTreat(){
    if (squares[dogCurrentPosition].classList.contains(treatClass)){
      squares[dogCurrentPosition].classList.remove(treatClass)
      scoreCount.innerText = Number(scoreCount.innerText) + 20
      // munchSound.src = '../sounds/munch.mp3'
      // munchSound.play()
    }
  }

  // * BALL FUNCTIONS
  function addBall(){
    ballPositions.forEach((ball) => {
      squares[ball].classList.add(ballClass)
      balls.push(ball)
    })
  }
  
  function removeBall(){
    if (squares[dogCurrentPosition].classList.contains(ballClass)){
      squares[dogCurrentPosition].classList.remove(ballClass)
      scoreCount.innerText = Number(scoreCount.innerText) + 50
      // squares[ho].classList.add(blinkClass)
    }
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

  // let timer
  //need to make hoover skip fence classes
  function moveHoover(){
    if (hoover1CurrentPosition === 90 && !(squares[hoover1CurrentPosition - 1].classList.contains(fenceClass))){
      const leftInterval = setInterval(() => {
        squares[hoover1CurrentPosition].classList.remove(hooverClass)
        hoover1CurrentPosition -= 1
        squares[hoover1CurrentPosition].classList.add(hooverClass)
      }, 1000)
    }
    if (hoover2CurrentPosition === 9 && !(squares[hoover1CurrentPosition].classList.contains(fenceClass))){
      const rightInterval = setInterval(() => {
        squares[hoover2CurrentPosition].classList.remove(hooverClass)
        hoover2CurrentPosition += 1
        squares[hoover2CurrentPosition].classList.add(hooverClass)
      }, 2000)
    }
    // if (hoover3CurrentPosition === 45 && !(squares[hoover1CurrentPosition].classList.contains(fenceClass))){
    //   const 
    // }
    
  }

  // function fail(){
    
  // }

  // * COLLISION
  // function detectCollision(){
  //   // dogs collides the hoover 
    
  //   // hoover collides with treat - if 

  //   // 
  // }

  // * Overlay 
  // to turn overlay on
  function on(){
    grid.classList.add('overlay')
    grid.style.display = 'none'
  }
  // to turn overlay off
  function off(){
    grid.classList.remove('overlay')
    grid.style.display = 'flex'
  }

  // * KEY FUNCTIONS
  function handleKeyUp(event){
    const key = event.keyCode
    removeDog(dogCurrentPosition)
    
    //moving right
    if (key === 39 && !(squares[dogCurrentPosition + 1].classList.contains(fenceClass))){
      dogCurrentPosition++
    } else if (key === 37 && (!squares[dogCurrentPosition - 1].classList.contains(fenceClass))){ //moving left
      dogCurrentPosition--
    } else if (key === 38 && (dogCurrentPosition >= width) && (!squares[dogCurrentPosition - width].classList.contains(fenceClass))){ //moving up
      dogCurrentPosition -= width
    } else if (key === 40 && (dogCurrentPosition + width <= width * width - 1) && (!squares[dogCurrentPosition + width].classList.contains(fenceClass))){ //moving down
      dogCurrentPosition += width
    } else {
      console.log('INVALID KEY PRESSED')
    }
    
    addDog(dogCurrentPosition)
    removeTreat(treatPositions)
    removeBall(ballPositions)
  }

  const startGameSound = document.getElementById('start-game')

  function startGame(){
    moveHoover()
    off()
    // startGameSound.src = '../sounds/start-pacman.mp3'
    // startGameSound.play()
  }

  document.addEventListener('keyup', handleKeyUp)
  button.addEventListener('click', startGame)

  createGrid()
  createFence()
  addTreat()
  addHoover()
  addBall()
  on()
}
window.addEventListener('DOMContentLoaded', init)