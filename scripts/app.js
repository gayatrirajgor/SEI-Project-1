function init(){
  // console.log('JS Connected')

  const grid = document.querySelector('.grid')
  // console.log('grid:', grid)

  const width = 10
  const squareCount = width * width
  const squares = []



  function createGrid(){
    for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      // console.log('SQUARE:', square)
      square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  


  createGrid()

}
window.addEventListener('DOMContentLoaded', init)