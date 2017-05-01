const socket = io();
const addNewPic = document.querySelector('.pics');

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
