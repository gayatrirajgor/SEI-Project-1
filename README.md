# Run Jojo Run - A PacMan Game 🎮

This game was deployed via GitHub pages and works best on a desktop with a keyboard. [Play the game here!](https://gayatrirajgor.github.io/SEI-Project-1/) 🐶

![homepage](assets/homepage.png)

## Brief 📃
* Render a game in the browser
* Include separate HTML, CSS, JavaScript files
* Design logic for winning & visually display which player won
* Use **KISS (Keep it Simple Stupid)** & **DRY (Don’t Repeat Yourself)** principles 
* Use JavaScript for DOM manipulation 
* Deploy your game online 
* Use semantic markup for HTML and CSS

## Technologies 💻
* HTML5
* CSS3
* JavaScript
* Git, GitHub & GitHub Pages

## Approach 
### Grid 
JavaScript and DOM manipulation were used to create the game’s grid. Using a for loop, I created new divs that were appended as children to the parent div.

```javascript
for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      square.classList.add('square')
      grid.appendChild(square)
      squares.push(square)
    }
```

![grid](assets/grid.png)

### Player Movements
The player is able to move Jojo using the arrow keys, however they cannot enter a square where a fence is located. 

```javascript
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
```

### Future Ideas
* Mobile compatability
* Adding a scoreboard
* Add difficult levels
