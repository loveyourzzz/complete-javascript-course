'use strict';

// 获取元素
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNes = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer; // 当前活动玩家
let dice; // 骰子
let scores; // 总分
let currentScore; // 当前分数

// 初始化
const init = function () {
	activePlayer = 0;
	scores = [0, 0];
	currentScore = 0;
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	diceEl.classList.add('hidden');
	btnRoll.classList.remove('hidden');
	btnHold.classList.remove('hidden');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
};

// 展示骰子
const showDice = function () {
	dice = Math.trunc(Math.random() * 6) + 1;
	diceEl.src = `images/dice-${dice}.png`;
	diceEl.classList.remove('hidden');
};

// 更新当前分数
const updateCurrentScore = function (player) {
	currentScore += dice;
	document.querySelector(`#current--${player}`).textContent = currentScore;
};

// 更新当前总分
const updateScores = function (player) {
	scores[player] += currentScore;
	document.querySelector(`#score--${player}`).textContent = scores[player];
};

// 切换玩家
const switchPlayer = function () {
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 1 ? 0 : 1;
	currentScore = 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

// 展示赢家
const showWinner = function (player) {
	document.querySelector(`.player--${player}`).classList.add('player--winner');
	document.querySelector(`.player--${player}`).classList.remove('player--active');
	diceEl.classList.add('hidden');
	btnRoll.classList.add('hidden');
	btnHold.classList.add('hidden');
};

// NEW GAME
btnNes.addEventListener('click', function () {
	init(); //初始化
});

// ROLL DICE
btnRoll.addEventListener('click', function () {
	showDice(); // 展示骰子
	if (dice === 1) {
		switchPlayer(); // 切换玩家
	} else {
		updateCurrentScore(activePlayer); // 刷新当前分数
	}
});

// HOLD
btnHold.addEventListener('click', function () {
	updateScores(activePlayer); // 更新当前总分
	if (scores[activePlayer] < 100) {
		switchPlayer(); // 切换玩家
	} else {
		showWinner(activePlayer); // 展示赢家
	}
});

// 初始化
init();
