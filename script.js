const emojis = ["😀", "😂", "❤️", "🌟", "😊", "🥳", "👍", "🔥"];
let emojiCells = document.querySelectorAll('.cell');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let hasFlippedCard = false;

function getRandomEmoji() {
    const indexEmoji = Math.floor(Math.random() * emojis.length);
    return emojis[indexEmoji]; 
}

function fillEmojis() {
    const selectedEmojis = [];
    
    for (let i = 0; i < emojiCells.length / 2; i++) {
        const emoji = getRandomEmoji();
        selectedEmojis.push(emoji, emoji);
    }
    
    for (let i = selectedEmojis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedEmojis[i], selectedEmojis[j]] = [selectedEmojis[j], selectedEmojis[i]];
    }
    
    emojiCells.forEach((cell, index) => {
        cell.querySelector('.front').textContent = selectedEmojis[index];
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('show');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.addEventListener('DOMContentLoaded', () => {
    fillEmojis();

    emojiCells.forEach(cell => {
        cell.addEventListener('click', flipCard);
    });
});
