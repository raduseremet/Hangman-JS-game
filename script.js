const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['hello', 'wizard', 'programming', 'interface', 'masive', 'surface', 'brilliant', 'accurate' ,'advantage', 'agreement', 'behavior', 'barrier', 'chairman', 'cognitive', 'controversy', 'downtown', 'exposure', 'generate', 'highlight', 'however', 'injury', 'knee','landscape', 'link','manufacturing', 'myth', 'nor', 'opportunity', 'oven', 'otherwise', 'overall','phase', 'planning','port','prove','purchase', 'reflection', 'rhythm', 'schedule','satisfy', 'settle', 'surely', 'therapy', 'thought', 'tremendous','unlikely', 'watch', 'wipe', 'youth', 'yell', 'wrap'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];


// Show hidden word
function displayWord () {

  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(letter => 
      `<span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
        
      </span>`
      ).join('')}`;
  
  const innerWorld = wordEl.innerText.replace(/\n/g, '');
  
  if (innerWorld === selectedWord) {
    popup.style.display = 'flex';
    finalMessage.innerText = 'Congrats, Dănuța! You won! 😃';
  }

}


// update the wrong letters
function updateWrongLettersEl (){

  // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `; 

    // Display parts
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;

      if (index < errors){
        part.style.display = 'block';
      } else {
        part.style.display = 'none';
      }
    }); 

    // Check if lost
    if (wrongLetters.length === figureParts.length -1 ){
      popup.style.display = 'flex';
      finalMessage.innerText = 'You can do it better';
  
  
    }
 }


// Show notification
function showNotification (){
  notification.classList.add('show');

  setTimeout(()=> {
    notification.classList.remove('show');
  }, 2000)
}


// Key down letter press
window.addEventListener('keydown', e => {

  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});


// Play again
playAgainBtn.addEventListener('click', ()=> {

 selectedWord = words[Math.floor(Math.random() * words.length)];
  correctLetters.splice(0);
  wrongLetters.splice(0);


  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';

});



displayWord();