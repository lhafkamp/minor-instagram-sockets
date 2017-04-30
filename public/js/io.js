const socket = io();
const addNewPic = document.querySelector('.pics');

socket.on('newPic', (data) => {
	const newPics = data.image;
	console.log(newPics);
	// addNewPic.innerHTML += `
	// <div class="pic">
	// 	<div>
	// 		<img src="${newPics}"/>
	// 		<p>100</p>
	// 	</div>
	// 	<div>
	// 		<button>bad</button>
	// 		<button>good</button>
	// 	</div>
	// </div>
	// `;
});