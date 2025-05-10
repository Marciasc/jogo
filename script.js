const emojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🦁'];
let cards = [...emojis, ...emojis];
cards.sort(() => 0.5 - Math.random());

const game = document.querySelector('.memory-game');
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;

// Timer
let seconds = 0;
let timerInterval = setInterval(() => {
  document.getElementById('timer').textContent = seconds;
  seconds++;
}, 1000);

// Criar cartas
cards.forEach(emoji => {
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
  if (lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    const match =
      first.querySelector('.back').textContent ===
      second.querySelector('.back').textContent;

    if (match) {
      matchedPairs++;
      flippedCards = [];
      lockBoard = false;

      if (matchedPairs === emojis.length) {
        clearInterval(timerInterval);
        alert(Parabéns! Você venceu em ${seconds - 1} segundos!);
      }

    } else {
      setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}