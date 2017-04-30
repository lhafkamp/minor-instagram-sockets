const socket = io();
const addNewPic = document.querySelector('.pic div');

socket.on('newPic', (data) => {
	const newPics = data.image;
	addNewPic.innerHTML += `<img src="${newPics}"/>`;
});