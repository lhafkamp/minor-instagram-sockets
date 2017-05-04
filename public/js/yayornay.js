const socket = io();
const photo = document.querySelectorAll('.pic img');
const counter = document.querySelectorAll('.pic p');
const bad = document.querySelectorAll('button:first-of-type');
const good = document.querySelectorAll('button:last-of-type');

const allImages = document.querySelectorAll('.pics .pic div img');
let newUser = '';

socket.on('hidingButton', (imageWithRights) => {
	allImages.forEach(img => {
		if (img.src === imageWithRights) {
			img.parentNode.parentNode.querySelectorAll('div button').forEach(btn => btn.style.display = 'none');
		}
	})
});


socket.on('newUser', (userId) => {
	newUser = userId;
});

function scoreCounter(e) {
	const thisParent = e.target.parentNode.parentNode
	let score = Number(thisParent.querySelector('p').textContent);

	if (e.target.tagName === 'BUTTON') {
		const imageSrc = thisParent.querySelector('img').src;

		const voteObj = {
			user: newUser,
			img: imageSrc
		}

		socket.emit('rights', (voteObj));
		socket.on('disableButton', () => {
			thisParent.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
		});
	}

	if (e.target.textContent === 'bad') {
		if (score < 25) {
			thisParent.style.opacity = .2;
			const deadImage = thisParent.querySelector('img').src;
			socket.emit('remove', deadImage);
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

socket.on('disconnect', () => {
	alert('server disconnected, buttons are disabled until the server is back up (try to refresh)');
	bad.forEach(btn => btn.disabled = true);
	good.forEach(btn => btn.disabled = true);
});

const addNewPic = document.querySelector('.pics');
const allImages = document.querySelectorAll('.pics .pic div img');

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
