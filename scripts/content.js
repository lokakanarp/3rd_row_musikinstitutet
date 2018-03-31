const contentElement = document.getElementById('content');

 getArtist();

function getArtist(){
    fetch('https://folksa.ga/api/artists?key=flat_eric')
      .then((response) => response.json())
      .then((artists) => {

            for(let i = 0; i < artists.length; i++){
                let artistId = artists[i]._id;
                let artistName = artists[i].name;
                let albumsArray = artists[i].albums;
                
                for(let i = 0; i < albumsArray.length; i++){
//                    console.log(albumsArray[i]);
                    let albumId = albumsArray[i];
                    
                    getAlbum(artistName, albumId);
                    
                }
                
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
