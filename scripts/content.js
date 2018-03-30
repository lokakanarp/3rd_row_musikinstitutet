const contentElement = document.getElementById('content');


fetch('https://folksa.ga/api/artists?order=asc&key=flat_eric')
  .then((response) => response.json())
  .then((artists) => {
//    console.log(artists);
    
    for(let artist of artists){
        
        let artistId = artist._id;
        let albumArray = artist.albums;
//        console.log(albumArray);
        
        for(let albumId of albumArray){
//            console.log(albumId);
            getAlbum(albumId)
        }
        
        
//        console.log(artist.name.substr(0,1));
//        if(artist.name.substr(0,1) == 'T'){ // byt enskild bokstav till variabel
//            
//        }
        
    }
//    let artist.id = artist._id;

  });


function getAlbum(albumId){
    fetch('https://folksa.ga/api/albums?key=flat_eric&' + albumId)
      .then((response) => response.json())
      .then((albums) => {
        console.log(albums);
        
        
        for(let album of albums){
            
            let albumId = album._id;
            console.log(albumId);
            console.log(album.title);
        }
      });
}

