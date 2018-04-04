/******* DOM ELEMENTS ******/

const contentElement = document.getElementById('content');

/*
const menuAButton = document.getElementById('menuA');
const menuBButton = document.getElementById('menuB');
const menuCButton = document.getElementById('menuC');
const menuDButton = document.getElementById('menuD');
const menuEButton = document.getElementById('menuE');
const menuFButton = document.getElementById('menuF');
const menuGButton = document.getElementById('menuG');
const menuHButton = document.getElementById('menuH');
const menuIButton = document.getElementById('menuI');
const menuJButton = document.getElementById('menuJ');
const menuKButton = document.getElementById('menuK');
const menuLButton = document.getElementById('menuL');
const menuMButton = document.getElementById('menuM');
const menuNButton = document.getElementById('menuN');
const menuOButton = document.getElementById('menuO');
const menuPButton = document.getElementById('menuP');
const menuQButton = document.getElementById('menuQ');
const menuRButton = document.getElementById('menuR');
const menuSButton = document.getElementById('menuS');
const menuTButton = document.getElementById('menuT');
const menuUButton = document.getElementById('menuU');
const menuVButton = document.getElementById('menuV');
const menuWButton = document.getElementById('menuW');
const menuXButton = document.getElementById('menuX');
const menuYButton = document.getElementById('menuY');
const menuZButton = document.getElementById('menuZ');
const menuÅButton = document.getElementById('menuÅ');
const menuÄButton = document.getElementById('menuÄ');
const menuÖButton = document.getElementById('menuÖ');

*/

addEventlistenersToAlphabet();

function addEventlistenersToAlphabet(){
let alphabetLetters = document.getElementsByClassName("aphabeticalMenu");
		for(let letter of alphabetLetters) {
			letter.addEventListener('click', function () {
				const specificLetter = this.id;
                //console.log(this.id);
                handlingAlphabeticalMenuClick(specificLetter);
			})
		}
}






/******* ALPHABETICAL MENU EVENT LISTENERS ******/

/*
menuAButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('A');
});
menuBButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('B');
});
menuCButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('C');
});
menuDButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('D');
});
menuEButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('E');
});
menuFButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('F');
});
menuGButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('G');
});
menuHButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('H');
});
menuIButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('I');
});
menuJButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('J');
});
menuKButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('K');
});
menuLButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('L');
});
menuMButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('M');
});
menuNButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('N');
});
menuOButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('O');
});
menuPButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('P');
});
menuQButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('Q');
});
menuRButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('R');
});
menuSButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('S');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});
menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    handlingAlphabeticalMenuClick('T');
});

*/


/* byta ut avoidClickingSameLetterTwiceInMenu mot en funtion i eventListerner som tömmer elementet kanske är normalare...
Å andra sidan innebär det att innehållet måste laddas om, vilket är dumt? */

var avoidClickingSameLetterTwiceInMenu;
var isThereContentAlready;

function handlingAlphabeticalMenuClick(letter){
    if(!(avoidClickingSameLetterTwiceInMenu == letter)){
            getArtist(letter);
            /* Saves first letter of artist in variable to compare next time to avoid duplicate output: */
            avoidClickingSameLetterTwiceInMenu = letter;
    }       
}



 //getArtist();

function getArtist(letter){
    fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc&limit=200')
      .then((response) => response.json())
      .then((artists) => {
//        console.log(artists);
        
    if(isThereContentAlready){
        content.innerHTML = '';
    }

            for(let i = 0; i < artists.length; i++){
                let artistId = artists[i]._id;
                let artistName = artists[i].name;
//                console.log(artistName);
                let albumsArray = artists[i].albums;
                
                if(artistName.substr(0,1) == letter){ // nytt test
                    
                    for(let i = 0; i < albumsArray.length; i++){
                        let albumId = albumsArray[i];

                        getAlbum(artistName, albumId);

                    }
                    
                } //end nytt test
                

                
            }
      });
}


function getAlbum(artistName, albumId){
    fetch('https://folksa.ga/api/albums/' + albumId + '?key=flat_eric')
      .then((response) => response.json())
      .then((albums) => {
//      console.log(albums);
        
        let albumTitle = albums.title; 
        let albumCoverImage = albums.coverImage; 
//        console.log(albumCoverImage);

        let tracksArray = albums.tracks;
//        console.log(tracksArray);


        
        displayCard(artistName, albumTitle, albumCoverImage, tracksArray);
        
        
    });
    
    
}

function getTrack(artistName, albumTitle, trackId){
    fetch(`https://folksa.ga/api/tracks?${trackId}&key=flat_eric`)
  .then((response) => response.json())
  .then((tracks) => {
        
//        console.log(tracks)
        
        let numberOfTracksOnAlbum = tracks.length;
//        console.log(numberOfTracksOnAlbum);
        
        for(let i = 0; i < numberOfTracksOnAlbum; i++){
//            console.log(tracks[i].title);
            
        
        }
      
  });
}



function displayCard(artistName, albumTitle, albumCoverImage, tracksArray){
    

//    if(isThereContentAlready){
//        content.innerHTML = '';
//    }
    
        const cardWrapperElement = document.createElement('div');
        cardWrapperElement.classList.add('cardWrapper');

        const cardAlbumImgElement = document.createElement('div');
        cardAlbumImgElement.classList.add('cardAlbumImg');
    
        const cardArtistNameElement = document.createElement('div');
        cardArtistNameElement.classList.add('cardArtistName');
    
        const cardAlbumTitleElement = document.createElement('div');
        cardAlbumTitleElement.classList.add('cardAlbumTitle');
    
        const cardTrackListElement = document.createElement('div');
        cardTrackListElement.classList.add('cardTrackList');
    
    
        cardAlbumImgElement.innerHTML = '<img src="albumCoverImage">';
        cardArtistNameElement.innerHTML = artistName;
        cardAlbumTitleElement.innerHTML = albumTitle;


            for(let i = 0; i < tracksArray.length; i++){
//                console.log(tracksArray[i].title); 
//                console.log(tracksArray[i]._id);
                
                let trackId = tracksArray[i]._id;
                
                
                
//                const addTrackButton = document.createElement('button');
//                addTrackButton.setAttribute('id', trackId);
//                cardTrackListElement.appendChild(addTrackButton);
//                
                let tracklist = `
                    <button id="addTrackToPlaylist${trackId}" data-track="${trackId}">Add to playlist</button>
                    ${i+1}. ${tracksArray[i].title} <br>
                `;
                
                //sedan ta typ this.data-id när man skapar eventlistener och skickar vidare som argument till add-funktion???
                //activateAddFunction(trackId);
                
                cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);
                
                cardWrapperElement.appendChild(cardAlbumImgElement);
                cardWrapperElement.appendChild(cardArtistNameElement);
                cardWrapperElement.appendChild(cardAlbumTitleElement);
                cardWrapperElement.appendChild(cardTrackListElement);
                contentElement.appendChild(cardWrapperElement);
                
                const addTrack = document.getElementById(`addTrackToPlaylist${trackId}`);
                
                addTrack.addEventListener('click', function(event){
                event.preventDefault();
                    
                    console.log(this);

                        console.log(this.dataset.track);
                    
                    let trackId = this.dataset.track;
                    
                    // addTrackToPlaylist-function is to be found in playlist.js:
                    addTrackToPlaylist(trackId);
                    
               // console.log("hej");
            });
                
                

            }
    


//        cardAlbumImgElement.innerHTML = '<img src="albumCoverImage">';
//        cardArtistNameElement.innerHTML = artistName;
//        cardAlbumTitleElement.innerHTML = albumTitle;


//        cardWrapperElement.appendChild(cardAlbumImgElement);
//        cardWrapperElement.appendChild(cardArtistNameElement);
//        cardWrapperElement.appendChild(cardAlbumTitleElement);
//        cardWrapperElement.appendChild(cardTrackListElement);
//        contentElement.appendChild(cardWrapperElement);
    



    
    isThereContentAlready = true;
    
    
    //const cardTracklistElement = document.createElement('div');


    //cardArtistNameElement.insertAdjacentHTML('beforeend', artistName);  
}


function activateAddFunction(trackId){
    
//    console.log(trackId);
    
//        const trackId = document.getElementById('addTrackToPlaylist');
//
//        trackId.addEventListener('click', function(event){
//            event.preventDefault();
//
////            console.log(this.dataset.trackId);
//            console.log(trackId);
//        });

}

//
//    const cardWrapperElement = document.createElement('div');
//    cardWrapperElement.classList.add('cardWrapper');
//
//
//function displayCardArtist(artistName){
//    const cardArtistNameElement = document.createElement('div');
//    cardArtistNameElement.innerHTML = artistName;
//    cardWrapperElement.appendChild(cardArtistNameElement);
//    contentElement.appendChild(cardWrapperElement);
////    cardWrapperElement.insertAdjacentHTML('beforeend', cardArtistNameElement)
//    
//}
//
//function displayCardAlbum(albumTitle){
////    const cardAlbumTitleElement = document.getElementById('cardAlbumTitle');
////    cardArtistNameElement.insertAdjacentHTML('beforeend', albumTitle);
////    
////    const cardWrapperElement = document.createElement('div');
////    cardWrapperElement.classList.add('cardWrapper');
////    const cardArtistNameElement = document.createElement('div');
////    cardArtistNameElement.innerHTML = artistName;
////    
////    cardWrapperElement.appendChild(cardArtistNameElement);
////    contentElement.appendChild(cardWrapperElement);
//    
//    const cardAlbumTitleElement = document.createElement('div');
//    cardAlbumTitleElement.innerHTML = albumTitle;
//    cardWrapperElement.appendChild(cardAlbumTitleElement);
//    contentElement.appendChild(cardWrapperElement);
//    
// //   cardWrapperElement.insertAdjacentHTML('beforeend', cardAlbumTitleElement)
//}
//
//function appendWrapperToDOM(){
//    contentElement.appendChild(cardWrapperElement);
//}
