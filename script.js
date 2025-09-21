const cardsArray = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍍", "🍉", "🍓"];
let gameBoard = document.getElementById("gameBoard");
let statusText = document.getElementById("status");

let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create board
function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(cards).forEach((emoji) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (this.classList.contains("flipped") || this.classList.contains("matched")) return;

    this.textContent = this.dataset.emoji;
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        statusText.textContent = `Moves: ${moves}`;
        checkMatch();
    }
}

// Check match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === cards.length) {
            setTimeout(() => {
                alert(`🎉 You won in ${moves} moves!`);
            }, 300);
        }
    } else {
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 800);
    }
}

// Restart game
function restartGame() {
    moves = 0;
    matchedCards = 0;
    flippedCards = [];
    statusText.textContent = "Moves: 0";
    createBoard();
}

// Start game
createBoard();
