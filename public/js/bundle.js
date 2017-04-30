(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
console.log('ping');
const socketio = require('./io');
const yayornay = require('./yayornay');
console.log('pong');
},{"./io":2,"./yayornay":3}],2:[function(require,module,exports){
const socket = io();
const album = document.querySelector('.pics');

socket.on('newPic', (data) => {
	const newPics = data.image;
	album.innerHTML += `<img src="${newPics}"/>`;
});
},{}],3:[function(require,module,exports){
const photo = document.querySelectorAll('.pic img');
const counter = document.querySelectorAll('.pic p');
const bad = document.querySelectorAll('button:first-of-type');
const good = document.querySelectorAll('button:last-of-type');

function decreaseScore() {
	const thisParent = this.parentNode.parentNode
	let score = Number(thisParent.querySelector('p').textContent);

	if (score < 25) {
		thisParent.style.display = 'none';
	} else if (score < 50) {
		score -= 25;
	} else {
		score -= 25;
	}

	// this.parentNode.parentNode.querySelector('img').style.filter = `brightness(${score}%)`;
	thisParent.querySelector('img').style.filter = `brightness(${score}%)`;
	thisParent.querySelector('p').innerHTML = `${score}`;
};

function increaseScore() {
	const thisParent = this.parentNode.parentNode
	let score = Number(thisParent.querySelector('p').textContent);

	if (score > 75) {
		return
	} else {
		score += 25;
	}

	thisParent.querySelector('img').style.filter = `brightness(${score}%)`;
	thisParent.querySelector('p').innerHTML = `${score}`;
};

bad.forEach(btn => btn.addEventListener('click', decreaseScore));
good.forEach(btn => btn.addEventListener('click', increaseScore));

},{}]},{},[1]);
