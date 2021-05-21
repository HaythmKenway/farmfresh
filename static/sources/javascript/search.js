function search(){
    if(event.key == 'Enter')
        window.location = '/detail/'+ (document.getElementById('Search-box').value.toLowerCase());
}