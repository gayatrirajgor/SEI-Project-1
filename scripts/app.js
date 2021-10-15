function init(){
  const grid = document.querySelector('.grid')
  const rules = document.querySelector('.rules')
  const startScreen = document.querySelector('.startScreen')
  const button = document.querySelector('button')
  const scoreCount = document.getElementById('score')
  const livesCount = document.getElementById('lives')
  const munchSound = document.getElementById('munch')
  const winSound = document.getElementById('win')
  const dogCrySound = document.getElementById('dogCry')
  const startGameSound = document.getElementById('start-game')
  let lives = 3
  let score = 0

  // * Grid
  const width = 10
  const squareCount = width * width
  const squares = []

  // * Maze tiles
  const mazeTiles = [0, 1, 2, 3, 4, 6, 7, 8, 10, 13, 14, 15, 16, 19, 23, 24, 25, 26, 28, 29, 30, 31, 36, 37, 38, 40, 41, 42, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 64, 65, 67, 70, 71, 72, 77, 78, 79, 81, 82, 83, 84, 85, 86, 88, 89, 91, 93, 94, 96, 97, 98]

  // * Treats
  const treatClass = 'treat'
  const treats = []
  const treatPositions = [1, 2, 4, 6, 7, 8, 10, 13, 14, 15, 16, 19, 23, 24, 25, 26, 28, 29, 30, 31, 36, 37, 38, 40, 41, 42, 46, 47, 48, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 64, 65, 70, 71, 72, 77, 78, 79, 81, 82, 83, 84, 85, 86, 88, 89, 91, 94, 96, 97, 98]
  let treatCount = 60

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
  const hooverStartingPositions = [90, 9, 45] 
  const hoovers = []
  let hoover1CurrentPosition = 90
  let hoover2CurrentPosition = 9
  let hoover3CurrentPosition = 45

  const hoover1 = {
    startingPosition: 90,
    currentPosition: 90,
    class: 'hoover',
    previousPositions: []
  }
  const hoover2 = {
    startingPosition: 9,
    currentPosition: 9,
    class: 'hoover',
    previousPositions: []
  }
  const hoover3 = {
    startingPosition: 45,
    currentPosition: 45,
    class: 'hoover',
    previousPositions: []
  }

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
      // square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
    addDog(dogStartingPosition)
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
    treatPositions.forEach((treat) => {
      squares[treat].classList.add(treatClass)
      treats.push(treat) //pushes individual treat into an array of treats
    })
  }

  function removeTreat(){
    if (squares[dogCurrentPosition].classList.contains(treatClass)){
      squares[dogCurrentPosition].classList.remove(treatClass)
      treatCount -= 1
      console.log('TREAT COUNT:', treatCount)
      score += 20
      scoreCount.innerText = score
      munchSound.src = './sounds/munch.mp3'
      munchSound.play()
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
      score += 50
      scoreCount.innerText = score
      ballFound(hoover1)
      ballFound(hoover2)
      ballFound(hoover3)
    }
  }

  // * HOOVER FUNCTIONS
  function addHoover(){
    hooverStartingPositions.forEach((hoover) => {
      squares[hoover].classList.add(hooverClass)
      hoovers.push(hoover)
    })
  }

  function hooverDirection(hoover){
    hoover.moveInterval = setInterval(() => {
      squares[hoover.currentPosition].classList.remove(hooverClass)
      let direction = Math.floor(Math.random() * 4) // selects random element
    
      // hoover.previousPositions.push(hoover.currentPosition)
      if (direction === 0 && squares[hoover.currentPosition + 1].classList.contains('fence') === Boolean(false) && squares[hoover.currentPosition + 1].classList.contains(ballClass) === Boolean(false) && squares[hoover.previousPositions[hoover.previousPositions.length - 2]] !== squares[hoover.currentPosition + 1]){
        hoover.currentPosition++
      } else if (direction === 1 && squares[hoover1CurrentPosition - 1].classList.contains('fence') === Boolean(false) && squares[hoover.currentPosition + 1].classList.contains(ballClass) === Boolean(false) && squares[hoover.previousPositions[hoover.previousPositions.length - 2]] !== squares[hoover.currentPosition - 1]){
        hoover.currentPosition--
      } else if (direction === 2 && hoover.currentPosition + width <= width * width - 1 && squares[hoover.currentPosition + width].classList.contains('fence') === Boolean(false) && squares[hoover.currentPosition + 1].classList.contains(ballClass) === Boolean(false) && squares[hoover.previousPositions[hoover.previousPositions.length - 2]] !== squares[hoover.currentPosition]){
        hoover.currentPosition += width
      } else if (direction === 3 && hoover.currentPosition >= width && squares[hoover.currentPosition - width].classList.contains('fence') === Boolean(false) && squares[hoover.currentPosition + 1].classList.contains(ballClass) === Boolean(false) && squares[hoover.previousPositions[hoover.previousPositions.length - 2]] !== squares[hoover.currentPosition]){
        hoover.currentPosition -= width
      }

      hoover.previousPositions.push(hoover.currentPosition)
      squares[hoover.currentPosition].classList.add(hooverClass)
      console.log('direction 1', direction)
      console.log('HOOVER 1 POS =>', hoover1.currentPosition)
      console.log('HOOVER 2 POS =>', hoover2.currentPosition)
      console.log('HOOVER 3 POS =>', hoover3.currentPosition)
      console.log((squares[hoover.currentPosition + 1].classList.contains(fenceClass)))

      if ((squares[dogCurrentPosition] === squares[hoover1.currentPosition]) || (squares[dogCurrentPosition] === squares[hoover2.currentPosition]) || (squares[dogCurrentPosition] === squares[hoover3.currentPosition])){
        detectCollision()
      }
    }, 500)
  }

  // * COLLISION
  // if collision is detected then dog position is reset to starting position and lives - 1
  function detectCollision(){
    dogCrySound.src = './sounds/dog_cry.mp3'
    dogCrySound.play()
    squares[dogCurrentPosition].classList.remove(dogClass)
    dogCurrentPosition = 0
    squares[dogCurrentPosition].classList.add(dogClass)
    lives -= 1
    livesCount.innerText = lives
    console.log('LIVES:', lives)
    checkForLives()
  }

  //this function will reset the location of the hoovers 
  // if ball is found, ghosts cannot get dog for certain amount of time
  function ballFound(hoover) {
    squares[hoover.currentPosition].classList.remove(hoover.class)
    hoover.currentPosition = hoover.startingPosition
    squares[hoover.currentPosition].classList.add(hoover.class)
    squares[hoover.currentPosition].classList.add(blinkClass)
    clearInterval(hoover.moveInterval)
    setTimeout(() => {
      hooverDirection(hoover)
      squares[hoover.currentPosition].classList.remove(blinkClass)
    }, 10000)
  }

  function checkForLives(){
    if (lives === 0) {
      alert(`Oh no! The hoover got to Jojo! Well done for trying! Your final score: ${score}`)
      restartGame()
    } 
  }

  function checkWin(){
    if (treatCount === 0){
      winSound.src = './sounds/who_let_dogs_out.mp3'
      winSound.play()
      squares[hoover1.currentPosition].classList.remove(hooverClass)
      squares[hoover2.currentPosition].classList.remove(hooverClass)
      squares[hoover3.currentPosition].classList.remove(hooverClass)
      alert(`YOU WON!!!! Thank you getting all those treats for Jojo! Your final score is: ${score}`)
      // restartGame()
    }
  }

  function restartGame(){
    window.location.reload()
  }

  // * Overlay 
  function on(){ // to turn overlay on
    grid.classList.add('overlay')
    rules.classList.add('overlay')
    grid.style.display = 'none'
    rules.style.display = 'none'
  }
  
  function off(){ // to turn overlay off
    grid.classList.remove('overlay')
    rules.classList.remove('overlay')
    startScreen.classList.add('overlay')
    startScreen.style.display = 'none'
    grid.style.display = 'flex'
    rules.style.display = 'inline-block'
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
    checkWin()

    if ((squares[dogCurrentPosition] === squares[hoover1.currentPosition]) || (squares[dogCurrentPosition] === squares[hoover2.currentPosition]) || (squares[dogCurrentPosition] === squares[hoover3.currentPosition])){
      detectCollision()
    }
  }

  function startGame(){
    off()
    hooverDirection(hoover1)
    hooverDirection(hoover2)
    hooverDirection(hoover3)

    startGameSound.src = './sounds/start-pacman.mp3'
    startGameSound.play()
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
