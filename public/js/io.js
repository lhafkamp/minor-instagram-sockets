const socket = io();
const album = document.querySelector('.pics');

socket.on('welcome', (data) => {
	const newPics = data.images.thumbnail.url;
	album.innerHTML += `<img src="${newPics}"/>`;
})