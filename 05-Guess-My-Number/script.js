'use strict';

let correctNum = Math.trunc(Math.random() * 20) + 1; // 随机生成一个数
let score = 20;
let highscore = 0;

const setTextContent = (e, msg) => {
	document.querySelector(e).textContent = msg;
};

const setValue = (e, value) => {
	document.querySelector(e).value = value;
};

const setStyleBackgroundColor = (e, color) => {
	document.querySelector(e).style.backgroundColor = color;
};

const setStyleWidth = (e, value) => {
	document.querySelector(e).style.width = value;
};

const getValue = e => {
	return Number(document.querySelector(e).value);
};

const judge = function () {
	const guessNum = getValue('.guess');
	// 当没有猜的数字时
	if (!guessNum) {
		setTextContent('.message', '❗️ No Number!');
	}
	// 当猜的数字不正确时
	else if (guessNum !== correctNum) {
		if (score > 1) {
			setTextContent('.message', guessNum > correctNum ? '❌ Too high!' : '❌ Too low!');
			score--;
			setTextContent('.score', score);
		} else {
			setTextContent('.message', '👊🏻 You lost the game!');
		}
	}
	// 当猜的数字正确时
	else {
		setTextContent('.message', '🎉 Correct Number!');
		setStyleBackgroundColor('body', '#60b347'); // 修改背景颜色
		setStyleWidth('.number', '30rem'); // 修改装数字的盒子的宽度
		setTextContent('.number', correctNum); // 显示正确的数
		if (score > highscore) {
			highscore = score;
			setTextContent('.highscore', highscore); // 显示最高分
		}
	}
};

const reset = function () {
	score = 20; // 恢复分数
	correctNum = Math.trunc(Math.random() * 20) + 1; // 重新生成数字

	setTextContent('.message', 'Start guessing...');
	setTextContent('.score', score);
	setTextContent('.number', '?');
	setValue('.guess', '');
	setStyleBackgroundColor('body', '#222');
	setStyleWidth('.number', '15rem');
};

// 为check按钮设置点击事件
document.querySelector('.check').addEventListener('click', judge);

// 为again按钮设置点击事件
document.querySelector('.again').addEventListener('click', reset);

// 添加Enter按键事件
document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') judge();
});
