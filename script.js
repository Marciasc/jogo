const emojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🦁'];
const cardsArray = [...emojis, ...emojis].sort(() => 0.5 - Math.random());

const game = document.getElementById('memory-game');
let flippedCards = [];
let matchedPairs = 0;
let seconds = 0;

// Iniciar cronômetro
const timer = document.getElementById('timer');
const interval = setInterval(() => {
  seconds++;
  timer.textContent = seconds;
}, 1000);

// Criar cartas
cardsArray.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');

  const front = document.createElement('div');
  front.classList.add('face', 'front');
  front.textContent = '?';

  const back = document.createElement('div');
  back.classList.add('face', 'back');
  back.textContent = emoji;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => flipCard(card));
  game.appendChild(card);
});

function flipCard(card) {
  if (card.classList.contains('flip') || flippedCards.length === 2) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    const emoji1 = first.querySelector('.back').textContent;
    const emoji2 = second.querySelector('.back').textContent;

    if (emoji1 === emoji2) {
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === emojis.length) {
        clearInterval(interval);
        setTimeout(() => {
          alert(Parabéns! Você venceu em ${seconds} segundos!);
        }, 500);
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        flippedCards = [];
      }, 1000);
    }
  }
}