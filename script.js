const gameBoard = document.getElementById("gameBoard");

// Emoji set (duplicated for pairs)
const emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥭", "🍒"];
let cards = [...emojis, ...emojis];

// Shuffle function
cards.sort(() => 0.5 - Math.random());

// Game state
let firstCard, secondCard;
let lockBoard = false;

// Create cards
cards.forEach(emoji => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.textContent = "?";
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.textContent = "?";
    secondCard.textContent = "?";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
