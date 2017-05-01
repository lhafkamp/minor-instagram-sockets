(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
console.log('ping');
require('./yayornay');
require('./io');
console.log('pong');
},{"./io":2,"./yayornay":3}],2:[function(require,module,exports){
const socket = io();
const addNewPic = document.querySelector('.pics');
const allImages = document.querySelectorAll('.pics .pic div img');

// allImages.forEach(image => image.parentNode.parentNode);
// allImages.forEach(image => image.src);

socket.on('newPic', (data) => {
	const newPics = data.image;
	addNewPic.insertAdjacentHTML('beforeend', `
	<div class="pic">
		<div>
			<img src="${newPics}"/>
			<p>100</p>
		</div>
		<div>
			<button>bad</button>
			<button>good</button>
		</div>
	</div>
	`)
});

allImages.forEach(image => {
	socket.on('removeFromDOM', (data) => {
		if (data === image.src) {
			console.log('hierrr', image.src);
			image.parentNode.parentNode.remove();
			console.log('image deleted from the DOM');
		} else {
			console.log('image NOT deleted from the DOM');
		}
	});
})
},{}],3:[function(require,module,exports){
const socket = io();

const photo = document.querySelectorAll('.pic img');
const counter = document.querySelectorAll('.pic p');
const bad = document.querySelectorAll('button:first-of-type');
const good = document.querySelectorAll('button:last-of-type');

function scoreCounter(e) {
	const thisParent = e.target.parentNode.parentNode
	let score = Number(thisParent.querySelector('p').textContent);
	if (e.target.textContent === 'bad') {
		if (score < 25) {
			thisParent.style.opacity = .2;
			const deadImage = thisParent.querySelector('img').src;
			socket.emit('remove', deadImage);
			e.target.parentNode.parentNode.remove();
		} else {
			score -= 25;
		}

		thisParent.querySelector('img').style.filter = `brightness(${score}%)`;
		thisParent.querySelector('p').innerHTML = `${score}`;
	} else if (e.target.textContent === 'good') {
		if (score > 75) {
			return
		} else {
			score += 25;
		}

		thisParent.querySelector('img').style.filter = `brightness(${score}%)`;
		thisParent.querySelector('p').innerHTML = `${score}`;
	}
}

document.body.addEventListener('click', scoreCounter);


},{}]},{},[1]);
