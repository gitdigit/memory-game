const emojis = ["😀", "😂", "❤️", "🌟", "😊", "🥳", "👍", "🔥"];
let emojiCells = document.querySelectorAll('.cell');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let hasFlippedCard = false;

function getShuffledArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function fillEmojis() {
    const selectedEmojis = getShuffledArray(emojis).slice(0, emojiCells.length / 2);
    const emojiPairs = [...selectedEmojis, ...selectedEmojis];
    const shuffledEmojis = getShuffledArray(emojiPairs);

    emojiCells.forEach((cell, index) => {
        cell.querySelector('.front').textContent = shuffledEmojis[index];
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
