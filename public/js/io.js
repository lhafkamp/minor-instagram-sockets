const socket = io();
const album = document.querySelector('.pics');

socket.on('newPic', (data) => {
	const newPics = data.image;
	album.innerHTML += `<img src="${newPics}"/>`;
});