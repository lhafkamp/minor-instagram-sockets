const socket = io();

socket.on('imageData', data => {
	const imgCollection = data.images.thumbnail.url;
	const album = document.querySelector('.pics');
	console.log(imgCollection);

	album.innerHTML = `<img src="imgCollection" alt="new picture">`;

})