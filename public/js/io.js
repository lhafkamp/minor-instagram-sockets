const socket = io();
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
