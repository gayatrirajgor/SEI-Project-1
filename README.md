# Run Jojo Run - A PacMan Game 🎮

This game was deployed via GitHub pages and works best on a desktop with a keyboard. [Play the game here!](https://gayatrirajgor.github.io/SEI-Project-1/)

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
JavaScript and DOM manipulation were used to create the game’s grid. 

```javascript
for (let i = 0; i < squareCount; i++){
      const square = document.createElement('div')
      square.classList.add('square')
      // square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
```
