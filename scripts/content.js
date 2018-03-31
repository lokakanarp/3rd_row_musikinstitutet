/******* DOM ELEMENTS ******/

const contentElement = document.getElementById('content');

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


var avoidTwice;

menuTButton.addEventListener('click', function(event){
    event.preventDefault();
    // funktion som bara hämtar artister som börjar på T
    
    if(!(avoidTwice == 'T')){
            getArtist('T');
    
            avoidTwice = 'T';
    }
    

    
//        menuTButton.removeEventListener('click', function(event){
//        event.preventDefault();
//           console.log("it's working");     
//        });


//        inactivateEventListener(menuTButton);
        
    
    
});

//function inactivateEventListener(toRemove){
//    toRemove.removeEventListener('click', myClick);
//}

 //getArtist();

function getArtist(letter){
    fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc')
      .then((response) => response.json())
      .then((artists) => {

            for(let i = 0; i < artists.length; i++){
                let artistId = artists[i]._id;
                let artistName = artists[i].name;
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
      console.log(albums);
        
        let albumTitle = albums.title; 
        let albumCoverImage = albums.coverImage; 
        console.log(albumCoverImage);

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
        console.log(numberOfTracksOnAlbum);
        
        for(let i = 0; i < numberOfTracksOnAlbum; i++){
            console.log(tracks[i].title);
            
        
        }
      
  });
}



function displayCard(artistName, albumTitle, albumCoverImage, tracksArray){
    const cardWrapperElement = document.createElement('div');
    cardWrapperElement.classList.add('cardWrapper');
    const cardAlbumImgElement = document.createElement('div');
    const cardArtistNameElement = document.createElement('div');
    const cardAlbumTitleElement = document.createElement('div');
    const cardTrackListElement = document.createElement('div');
    
    
        for(let i = 0; i < tracksArray.length; i++){
            console.log(tracksArray[i].title); 
            console.log(tracksArray[i]._id);
            
            let tracklist = `
                ${i+1}. ${tracksArray[i].title} <br>
            `;
            cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);
            
        }
    
    cardAlbumImgElement.innerHTML = '<img src="albumCoverImage">';
    cardArtistNameElement.innerHTML = artistName;
    cardAlbumTitleElement.innerHTML = albumTitle;
//    cardtrackListElement.innerHTML = trackList;
//    cardtrackListElement.appendChild(tracklist);
    
    cardWrapperElement.appendChild(cardAlbumImgElement);
    cardWrapperElement.appendChild(cardArtistNameElement);
    cardWrapperElement.appendChild(cardAlbumTitleElement);
    cardWrapperElement.appendChild(cardTrackListElement);
    contentElement.appendChild(cardWrapperElement);
    
    //const cardTracklistElement = document.createElement('div');


    //cardArtistNameElement.insertAdjacentHTML('beforeend', artistName);  
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
