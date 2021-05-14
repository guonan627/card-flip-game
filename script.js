// css class for different card image
const CARD_TECHS = [
  'html5',
  'css3',
  'js',
  'sass',
  'nodejs',
  'react',
  'linkedin',
  'heroku',
  'github',
  'aws'
];

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: 60,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  // and much more
  startButton: document.querySelector('.game-stats__button'),
  gameBoard: document.querySelector('.game-board'),
  cardFlippedCount: 0,
  // card: document.querySelectorAll('.card'),
  timerBar: document.querySelector('.game-timer__bar'),
  succeededPair: 0,
};

setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  startGame();
}

function hack() {
  document.querySelectorAll('.card').forEach( (card)=> {card.classList.add('card--flipped')})
}

function startGame() {
  const { startButton } = game;
  startButton.addEventListener('click', () => {
    // console.log('game started');
    if(startButton.innerHTML === 'End Game') {
      handleGameOver();
      clearInterval(game.timerInterval);
      game.succeededPair = 0;
      startButton.innerHTML = 'Start Game';
    }
    else {  
      // console.log(level);
      // console.log(score);
      startButton.innerHTML = 'End Game'
      game.cardFlippedCount = 0;
      firstLevel();
      handleCardFlip();
      updateTimerDisplay();
    }
  })
};

function restartGame() {
  const { startButton } = game;
  clearInterval(game.timerInterval);
  game.succeededPair = 0;
  startButton.innerHTML = 'Start Game';
  resetGameStats();
  firstLevel();
}

function handleCardFlip() {
  let card = document.querySelectorAll('.card');
  card.forEach((card) => {
    card.addEventListener('click', () => {
      // console.log(100, cardFlippedCount)
      // console.log(200, game.cardFlippedCount)
      if(game.cardFlippedCount < 2) {
        if(card.classList.contains('card--flipped') && !card.classList.contains('succeeded')) {
          card.classList.remove('card--flipped');
          game.cardFlippedCount -= 1;
          // console.log(cardFlippedCount);
        } else {
          card.classList.add('card--flipped');
          game.cardFlippedCount += 1;
          // console.log(cardFlippedCount);
          // console.log('you flip this card');
          let cardArray = [];
          document.querySelectorAll('.card--flipped').forEach( (card) => {
            // console.log(1,card)
            // console.log(2, card.getAttribute('data-tech'))
            cardArray.push(card);
            if(cardArray.length>1) {
              // console.log(cardArray);
              // console.log(1, cardArray[0].classList[1])
              // console.log(2, cardArray[1].classList[1])
              if(cardArray[0].classList[1] === cardArray[1].classList[1]) {
                // console.log('you success one pair of card, try the rest');
                updateScore();
                game.succeededPair += 1;
                jumpLevel();
                // console.log(game.succeededPair);
                // console.log(cardArray[0]);
                // console.log(cardArray[1]);
                cardArray[0].classList.add('succeeded');
                cardArray[1].classList.add('succeeded');
                cardArray[0].classList.remove('card--flipped');
                cardArray[1].classList.remove('card--flipped');
                   /* -------------------------------------------
                -- Because I did not use KeyBind function,  --
                -- So I could not using removeEventListener --
                -- method at this stage to stop card flip   --
                --------------------------------------------*/

                // console.log(`you got ${score} points`);
                // console.log(`current score is ${game.score}`);
                // console.log(`current level is ${game.level}`);
                // console.log(`time left is ${game.timerDisplay}S`);
                game.cardFlippedCount = 0;
                cardArray = [];
                // console.log(1,cardArray)
              }
              else {
                // console.log(3, cardArray[0])
                // console.log(4, cardArray[1])
                let card1 = cardArray[0]
                let card2 = cardArray[1]
                let cardReFlipTimer = setTimeout(() => {
                  card1.classList.remove('card--flipped');
                  card2.classList.remove('card--flipped');
                  game.cardFlippedCount = 0;
                }, 1000)
                cardArray = [];
                // clearInterval(cardReFlipTimer);
              }
            }
          })
        }
      } else {
        // console.log('reached max card flip number')
        if(card.classList.contains('card--flipped')) {
          card.classList.remove('card--flipped');
          game.cardFlippedCount -= 1;
          // console.log(cardFlippedCount);
        }
      }
    })
  })
};

function createCards(className) {
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.classList.add(`${className}`);
  newCard.setAttribute('data-tech', `${className}`);
  let newCardFront = document.createElement('div')
  newCardFront.classList.add('card__face');
  newCardFront.classList.add('card__face--front');
  let newCardBack = document.createElement('div');
  newCardBack.classList.add('card__face');
  newCardBack.classList.add('card__face--back');
  newCard.append(newCardFront, newCardBack);
  return newCard;
}

function cloneExistCard() {
  const { gameBoard } = game;
  gameBoard.childNodes.forEach(
    (card) => {
      cardClone = card.cloneNode(true);
      gameBoard.append(cardClone);
    }
  )
}

function nextLevel(succeededPair) {
  if(succeededPair === 0) {
    firstLevel();
    updateLevel();
  }
  else if(succeededPair === 2) {
    secondLevel();
    updateLevel();
  } else if(succeededPair === 10) {
    thirdLevel();
    updateLevel();
  }
  handleCardFlip();
  updateTimerDisplay();
}

function jumpLevel() {
  if(game.succeededPair === 2 || game.succeededPair === 10) {
    setTimeout(() => {
      nextLevel(game.succeededPair);
    }, 1500);
  }
}


function firstLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: 1fr 1fr;'
  gameBoard.innerHTML = null;
  gameBoard.append(
    createCards('css3'),
    createCards('html5'),
  )
  cloneExistCard();
  randomCards();
}

function secondLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: repeat(4, 1fr);'
  gameBoard.innerHTML = null;
  gameBoard.append(
    createCards('css3'),
    createCards('nodejs'),
    createCards('html5'),
    createCards('react'),
    createCards('heroku'),
    createCards('sass'),
    createCards('js'),
    createCards('linkedin'),
  )
  cloneExistCard();
  randomCards();
}

function thirdLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: repeat(6, 1fr);'
  gameBoard.innerHTML = null;
  gameBoard.append(
    createCards('css3'), 
    createCards('nodejs'),
    createCards('html5'),
    createCards('react'),
    createCards('heroku'),
    createCards('sass'),
    createCards('js'),
    createCards('linkedin'),
    createCards('aws'),
    createCards('github'),
    createCards('css3'), 
    createCards('nodejs'),
    createCards('html5'),
    createCards('react'),
    createCards('heroku'),
    createCards('sass'),
    createCards('js'),
    createCards('aws'),
  )
  cloneExistCard();
  randomCards();
}

function handleGameOver() {
  let { score, level } =game;
  alert(`your score is ${game.score} and you failed on level ${game.level}`);
  game.score = 0;
  game.level = 1;
  game.cardFlippedCount = 2;
  resetGameStats();
}

function randomCards() {
  const { gameBoard } = game;
  let cards = document.querySelectorAll('.card');
  let randomNumber = () => {
    return Math.random() > 0.5 ? -1 : 1
  };
  let gameBoardArray = [];
  for (let i = 0; i < cards.length; i++) {
    gameBoardArray.push(cards[i]);
  }
  gameBoardArray.sort(randomNumber);
  for(let j = 0; j < gameBoardArray.length; j++) {
    gameBoard.appendChild(gameBoardArray[j]);
  }
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {
  let{ score } = game;
  score = game.level * game.timerDisplay;
  game.score += score;
  let scoreBoard = document.querySelector('.game-stats__score--value');
  scoreBoard.innerHTML = game.score;
}

function updateLevel() {
  let levelDisplay = document.querySelector('.game-stats__level--value');
  levelDisplay.innerHTML = game.level += 1;
}

function resetGameStats() {
  let scoreBoard = document.querySelector('.game-stats__score--value');
  scoreBoard.innerHTML = game.score;
  let levelDisplay = document.querySelector('.game-stats__level--value');
  levelDisplay.innerHTML = game.level;
}

function updateTimerDisplay() {
  let { timer,  timerBar,} = game;
  clearInterval(game.timerInterval)
  game.timerInterval = setInterval(() => {
    if(timer > 0) {
      timer -= 1;
      // console.log(`${timer/60*100}`);
      timerBar.style = `width: ${timer/60*100}%`;
      timerBar.innerHTML = `${timer}S`;
      game.timerDisplay = timer;
    } else {
      restartGame();
      handleGameOver();
      // nextLevel();
    }
  }, 1000);
  
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {}

function unBindCardClick(card) {}

function bindCardClick() {}
