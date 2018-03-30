const contentElement = document.getElementById('content');

 getArtist();

function getArtist(){
    fetch('https://folksa.ga/api/artists?key=flat_eric')
      .then((response) => response.json())
      .then((artists) => {
        
//        console.log(artists);
        
        
        
        
            for(let i = 0; i < artists.length; i++){
                let artistId = artists[i]._id;
                let artistName = artists[i].name;
                
                
                let albumsArray = artists[i].albums;
//                console.log(albumsArray);
                
                for(let i = 0; i < albumsArray.length; i++){
                    console.log(albumsArray[i]);
                    let albumId = albumsArray[i];
                    
                    getAlbum(artistName, albumId);
                    
                }
            
                
                //displayCardArtist(artistName);
                
//                for(let i = 0; i < numberOfAlbums; i++){
//                    console.log(artists[i].albums[i]);
//                    let albumId = artists[i].albums[i];
//                    console.log(albumId);
//                }
                
                
//                console.log('artist id: ', artistId);
//                console.log('artist namn:', artistName);
                
//                console.log('test: ', artists[i].albums)
//                let albumId = artists[i].albums;
//                console.log('testlängd: ', artists[i].albums.length)
                
                console.log('artisttestlängd: ', artists.length)
                
//                 for(let i = 0; i < artists[i].length; i++){
//                     for(let j = 0; j < artists[i].albums.length; j++){
//                    console.log(j);  
//                      console.log('test enskilt: ', artists[i].albums[j])  
//                    }
//                 }
                
//                for(let i = 0; i < artists[i].albums[i].length; i++){
//                let albumId = artists[i].albums[i];
//                console.log('album id i getartists: ', albumId);
//                
               //getAlbum(albumId, numberOfAlbums);
//                }
            }
            
            
//            }

            
//            console.log(artistId);
//            console.log(artistName);
//            console.log(albumArray);
            
//            let numberOfAlbums = albumArray.length;
            

            
//            for(let i = 0; i < numberOfAlbums; i++){
////                console.log(artist.albums[i])
//                let albumId = artist.albums[i];
//                console.log(albumId)
//                
//                getAlbum(artistName, albumId, numberOfAlbums);
//            }

//
//            for(let albumIdArray of albumArray){
//                console.log(albumIdArray);
//                let albumIds = albumIdArray;
//                let numberOfAlbums = albumArray.length;
//                console.log(numberOfAlbums);
//                
//                getAlbum(artistName, albumId, numberOfAlbums);
//            
//            }
            


    //        console.log(artist.name.substr(0,1));
    //        if(artist.name.substr(0,1) == 'T'){ // byt enskild bokstav till variabel
    //            
    //        }


      });
}


function getAlbum(artistName, albumId){
//    console.log('id inom fetch: ', albumId);
    
//    fetch(`https://folksa.ga/api/albums?${albumId}&key=flat_eric`)
    fetch('https://folksa.ga/api/albums/' + albumId + '?key=flat_eric')
//    fetch('https://folksa.ga/api/albums/5abe82c8f6e25413a2407fe2?key=flat_eric')
      .then((response) => response.json())
      .then((albums) => {
      console.log(albums);
        
        let albumTitle = albums.title; 
        console.log(albumTitle);
        
        //displayCardAlbum(albumTitle);
        
        displayCard(artistName, albumTitle);

        

         
    
        
//        for(let i = 0; i < numberOfAlbums; i++){
//            console.log(albums[i]._id);
//            console.log('looking for; ', albums[i].tracks[i]);
//            let trackId = albums[i].tracks[i];
//            let albumTitle = albums[i].title; 
//            console.log('hej: ', albumTitle)
//            
//            
//            //getTrack(artistName, albumTitle, trackId);
//        }
        
        
//        let albumTitle = albums.title; 
//        console.log(albumTitle);
//        let albumId = album._id;
        
    });
    
    
}


//    fetch('https://folksa.ga/api/albums/5aae2dd4b9791d0344d8f719&key=flat_eric')
//  .then((response) => response.json());
//  .then((album) => {
//    console.log(album);
//  });
    
    //console.log(albumId);
//    fetch(`https://folksa.ga/api/albums?${albumId}&key=flat_eric`)
    
//    fetch('https://folksa.ga/api/albums?5aae2dd4b9791d0344d8f719&key=flat_eric')
//      .then((response) => response.json())
//      .then((albums) => {
//      console.log(albums);
//        
//                let albumTitle = albums.title; 
//        //console.log(albumTitle);
//                let albumId = albums._id;
//                let tracksArray = albums.tracks;
        
        
//        console.log(albumId);
        
//        let hej = albums.length;
//        console.log(hej);
        
//        for(let i = 0; i < numberOfAlbums; i++){
            
//                let albumTitle = albums[i].title; 
//                let albumId = albums[i]._id;
//                let tracksArray = albums[i].tracks;
            
//            for(let album of albums){

//                let albumTitle = album.title; 
//                let albumId = album._id;
//                let tracksArray = album.tracks;
            
//            console.log(tracksArray);
//            console.log('albumtitle: ', albumTitle);
    
 //displayCard(artistName, albumTitle);


//                for(let track of tracksArray){
//                    let trackId = track;
//                    //getTrack(artistName, albumTitle, trackId);
//
//                }
//                
//
////            }
//            
////        }
//       
//        
//                
//                    
//      });
//}

function getTrack(artistName, albumTitle, trackId){
    console.log(trackId);
//    fetch('https://folksa.ga/api/tracks?key=flat_eric&' + trackId)
    fetch(`https://folksa.ga/api/tracks?${trackId}&key=flat_eric`)
  .then((response) => response.json())
  .then((tracks) => {
        
//        console.log(tracks)
        
        let numberOfTracksOnAlbum = tracks.length;
        console.log(numberOfTracksOnAlbum);
        
        for(let i = 0; i < numberOfTracksOnAlbum; i++){
            console.log(tracks[i].title);
            
        
        }

    
        
//        console.log('artist: ', artistName);
//        console.log('album: ', albumTitle);
        
        
//        const cardTracklistElement = document.createElement('div');
//        for(let track of tracks){
//            let trackTitle = track.title;
//            console.log(trackTitle);
//            
//            
//            let tracklistRow = `
//            Song: ${trackTitle}
//            `
//            cardTracklistElement.insertAdjacentHTML('beforeend', tracklistRow); 
//            
//        }
        
        
  });
}



function displayCard(artistName, albumTitle){
    const cardWrapperElement = document.createElement('div');
    cardWrapperElement.classList.add('cardWrapper');
    //const cardAlbumImgElement = document.createElement('div');
    const cardArtistNameElement = document.createElement('div');
    const cardAlbumTitleElement = document.createElement('div');
    
    cardArtistNameElement.innerHTML = artistName;
    cardAlbumTitleElement.innerHTML = albumTitle;
    
    cardWrapperElement.appendChild(cardArtistNameElement);
    cardWrapperElement.appendChild(cardAlbumTitleElement);
    contentElement.appendChild(cardWrapperElement);
    
    //const cardTracklistElement = document.createElement('div');


    //cardArtistNameElement.insertAdjacentHTML('beforeend', artistName);  
}


    const cardWrapperElement = document.createElement('div');
    cardWrapperElement.classList.add('cardWrapper');


function displayCardArtist(artistName){
    const cardArtistNameElement = document.createElement('div');
    cardArtistNameElement.innerHTML = artistName;
    cardWrapperElement.appendChild(cardArtistNameElement);
    contentElement.appendChild(cardWrapperElement);
//    cardWrapperElement.insertAdjacentHTML('beforeend', cardArtistNameElement)
    
}

function displayCardAlbum(albumTitle){
//    const cardAlbumTitleElement = document.getElementById('cardAlbumTitle');
//    cardArtistNameElement.insertAdjacentHTML('beforeend', albumTitle);
//    
//    const cardWrapperElement = document.createElement('div');
//    cardWrapperElement.classList.add('cardWrapper');
//    const cardArtistNameElement = document.createElement('div');
//    cardArtistNameElement.innerHTML = artistName;
//    
//    cardWrapperElement.appendChild(cardArtistNameElement);
//    contentElement.appendChild(cardWrapperElement);
    
    const cardAlbumTitleElement = document.createElement('div');
    cardAlbumTitleElement.innerHTML = albumTitle;
    cardWrapperElement.appendChild(cardAlbumTitleElement);
    contentElement.appendChild(cardWrapperElement);
    
 //   cardWrapperElement.insertAdjacentHTML('beforeend', cardAlbumTitleElement)
}

function appendWrapperToDOM(){
    contentElement.appendChild(cardWrapperElement);
}
