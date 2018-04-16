/******* DOM ELEMENTS ******/



addEventlistenersToAlphabet();

function addEventlistenersToAlphabet(){
let alphabetLetters = document.getElementsByClassName("aphabeticalMenu");
		for(let letter of alphabetLetters) {
			letter.addEventListener('click', function () {
                
                const letter = this.id;
                clearElement(contentElement);
                getAlbums(letter);
			})
		}
}


