//Global variables


const displayArtistFormLink = document.getElementById('displayArtistFormLink');
displayArtistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	clearElement(contentElement);
	displayArtistForm();
})

function addEventListenerToButton(button, callback) {
button.addEventListener('click', function(event){
	event.preventDefault();
	callback();
	})
}







