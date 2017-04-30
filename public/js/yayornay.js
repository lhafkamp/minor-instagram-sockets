const photo = document.querySelectorAll('.pic img');
const bad = document.querySelectorAll('button:first-of-type');
const good = document.querySelectorAll('button:last-of-type');

let score = 100;

function decreaseScore() {
	if (score < 25) {
		return
	} else {
		score -= 25;
	}
	this.parentNode.parentNode.querySelector('img').style.filter = `brightness(${score}%)`;
	console.log('the current score is', score);
};

function increaseScore() {
	if (score > 75) {
		return
	} else {
		score += 25;
	}
	this.parentNode.parentNode.querySelector('img').style.filter = `brightness(${score}%)`;
	console.log('the current score is', score);
};

bad.forEach(btn => btn.addEventListener('click', decreaseScore));
good.forEach(btn => btn.addEventListener('click', increaseScore));