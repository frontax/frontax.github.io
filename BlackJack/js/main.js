'use strict';

{
  // 定数・変数 -----------------------------------------------------------------------------
  const cards = []; // トランプオブジェクトの格納先の配列
  const dealer = document.getElementById('dealer');
  const player = document.getElementById('player');
  const dScore = document.getElementById('dScore');
  const pScore = document.getElementById('pScore');
  const startBtn = document.getElementById('startBtn');
  const hitBtn = document.getElementById('hitBtn');
  const stayBtn = document.getElementById('stayBtn');
  const result = document.getElementById('result');
  
  let dealerScore;     // Dealerのスコア
  let playerScore;     // Playerのスコア
  let isFirstCard;     // Dealerの1枚目か否か
  let dealerFirstCard; // Dealerの1枚目のカード
  let dealerAceCnt;    // DealerのAce枚数
  let playerAceCnt;    // PlayerのAce枚数
  let timeoutId;       // setTimeoutのID

  // カードクラス
  class Card {
    constructor(suit, num) {
      this.suit = suit;
      this.num = num;
    }
  }

  // sleep関数 -----------------------------------------------------------------------------
  function sleep(waitSec) {
    return new Promise(function (resolve) {
      setTimeout(function() { resolve() }, waitSec);
    });
  } 

  // ゲームのセットアップ -----------------------------------------------------------------------------
  function setup() {    
    // 52枚分のトランプオブジェクトを作成し配列に入れる
    for (let i = 1; i <= 13 ; i++) {
      cards.push(new Card('s', i)); // spade
      cards.push(new Card('c', i)); // club
      cards.push(new Card('d', i)); // diamond
      cards.push(new Card('h', i)); // heart
    }
  
    // 配列の中身（山札）をシャッフルする
    function shuffle(arr) {
      for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
      return arr;
    }

    shuffle(cards);
    
    // ボタンの初期化
    startBtn.classList.remove('inactive');
    hitBtn.classList.add('inactive');
    stayBtn.classList.add('inactive');
  }
  
  // 山札からカードを１枚ずつ配る -----------------------------------------------------------------------------
  function deal(isDealer) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const card = cards.splice(0, 1);

    // Dealerの1枚目のカードは裏返す
    if (isFirstCard) {
      dealerFirstCard = `img/${card[0].suit}-${card[0].num}.png`;
      img.src = `img/back.png`;
    } else {
      img.src = `img/${card[0].suit}-${card[0].num}.png`;
    }
    isFirstCard = false;

    li.appendChild(img);
    
    // Dealerのスコアをカウント
    if (isDealer) {
      dealer.appendChild(li);
      if (card[0].num === 1) {
        dealerAceCnt ++;
        if (dealerScore <= 10) {
          dealerScore += 11;
        } else {
          dealerScore += 1;
        }
      } else if (card[0].num > 10) {
        dealerScore += 10;
      } else {
        dealerScore += card[0].num;
      }

    // Playerのスコアをカウント
    } else {
      player.appendChild(li);
      if (card[0].num === 1) {
        playerAceCnt ++;
        if (playerScore <= 10) {
          playerScore += 11;
        } else {
          playerScore += 1;
        }
      } else if (card[0].num > 10) {
        playerScore += 10;
      } else {
        playerScore += card[0].num;
      }
      pScore.textContent = playerScore;
    }
  }

  // スコアが17以上になるまでカードを取得
  function score17Check() {
    if (dealerScore < 17) {
      deal(true);
  
      // BustしてAceがある場合は1とカウントする
      if (dealerScore > 21 && dealerAceCnt > 0) {
        dealerScore -= 10;
        dealerAceCnt -- ;
      }
      dScore.textContent = dealerScore;

      timeoutId = setTimeout(() => {
        if (dealerScore >= 17) {
          clearTimeout(timeoutId);
          return;
        }
        score17Check();
      }, 500);
    }
  }

  // Dealerが山札からカードを取得 -----------------------------------------------------------------------------
  function dealerTurn() {
    sleep(1000)
      .then(function() {
        // Dealerの1枚目のカードを表にする
        dealer.firstElementChild.querySelector('img').src = dealerFirstCard;
        return sleep(200);
      })
      .then(function() {
        dScore.textContent = dealerScore;
        return sleep(500);
      })
      .then(function() {
        score17Check();   // スコアが17以上になるまでカードを取得
      })
      .then(function() {
        checkResult();    // 勝敗の判定
        setup();          // ゲームの再セットアップ
      });
  }
  
  // 勝敗を判定する -----------------------------------------------------------------------------
  function checkResult() {
    if ((playerScore < dealerScore && dealerScore <= 21) || (dealerScore <= 21 && playerScore > 21)) {
      result.textContent = 'You lose';
    } else if (dealerScore < playerScore && playerScore <= 21 || (playerScore <= 21 && dealerScore > 21)) {
      result.textContent = 'You win !';
    } else {
      result.textContent = 'Draw';
    }
  }
  
  // ゲームをスタートする -----------------------------------------------------------------------------
  startBtn.addEventListener('click', () => {
    if (startBtn.classList.contains('inactive')) {
      return;
    }

    // スコアの初期化
    dealerScore = 0;
    playerScore = 0;
    dScore.textContent = '0';
    pScore.textContent = '0';
    
    // Ace枚数の初期化
    dealerAceCnt = 0;
    playerAceCnt = 0;

    // 手札の初期化
    while (dealer.firstChild) {
      dealer.removeChild(dealer.firstChild);
    }
    while (player.firstChild) {
      player.removeChild(player.firstChild);
    }

    // 結果の初期化
    result.textContent = '';

    startBtn.classList.add('inactive');
    hitBtn.classList.remove('inactive');
    stayBtn.classList.remove('inactive');

    isFirstCard = true;    // Dealerの1枚目か否か

    sleep(500)
      .then(function() {
        deal(true);        // Dealerの1枚目のカード
        return sleep(500);
      })
      .then(function() {
        deal(false);       // Playerの1枚目のカード
        return sleep(500);
      })
      .then(function() {
        deal(true);        // Dealerの2枚目のカード
        return sleep(500);
      })
      .then(function() {
        deal(false);       // Playerの2枚目のカード
        return sleep(1000);
      })
      .then(function() {
        // Black jackの場合 はDealerの番へ
        if (playerScore === 21) {
          hitBtn.classList.add('inactive');
          stayBtn.classList.add('inactive');
          dealerTurn();
        }
    });
  });
  
  // Playerのカードを追加する（HIT） -----------------------------------------------------------------------------
  hitBtn.addEventListener('click', () => {
    if (hitBtn.classList.contains('inactive')) {
      return;
    }
    
    deal(false);

    // Aceがある場合はBustせず Aceを1とカウントする
    if (playerScore > 21 && playerAceCnt > 0) {
      playerScore -= 10;
      playerAceCnt -- ;
      pScore.textContent = playerScore;

    // Bustした場合 または 21の場合 はDealerの番へ
    } else if ((playerScore > 21 && playerAceCnt === 0) || playerScore === 21) {
      hitBtn.classList.add('inactive');
      stayBtn.classList.add('inactive');
      dealerTurn();
    }
  });
  
  // Playerのカード追加を止める（STAY） -----------------------------------------------------------------------------
  stayBtn.addEventListener('click', () => {
    if (stayBtn.classList.contains('inactive')) {
      return;
    }

    hitBtn.classList.add('inactive');
    stayBtn.classList.add('inactive');
    dealerTurn();
  });
  
  setup(); // ゲームの初期セットアップ
}
