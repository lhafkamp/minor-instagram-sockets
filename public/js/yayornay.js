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





	this.parentNode.parentNode.querySelector('img').style.filter = `brightness(${score}%)`;




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
