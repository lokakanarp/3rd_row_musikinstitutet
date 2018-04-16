//global variables



searchButton.addEventListener('click', function(event){
    event.preventDefault();
    contentElement.innerHTML = '';
    getDataFromSearch();
});
