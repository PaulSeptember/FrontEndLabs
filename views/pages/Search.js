import Utils        from './../../services/Utils.js'

async function getSongs(){
    const snapshot = await firebase.database().ref('/songs');
    return snapshot;
}

let Search = {
    render : async () => {
        let request = Utils.parseRequestURL()
        let query = request.id;
        
        return /*html*/`
            <section class = "search-results-section">
                <h2 id="section-search-h2" class="sections-text" id="genres-title">Search results</h2>
                <div class="description-text">Founded songs across all uploaded... </div>
                <ol id="search-results-ol" class="playlist-ol">
                </ol> 
            </section>
            `
    }
    , after_render: async () => {
        let request = Utils.parseRequestURL()
        let query = request.id;
        const h2 =  document.getElementById('section-search-h2');

        h2.innerHTML = "Search results for "+query;
        const searchContainer = document.getElementById('search-results-ol');

        const snapshot = await firebase.database().ref('/songs');
        snapshot.on("value", function(snapshot) {
            let songsList = snapshot.val();
            songsList.forEach(function(itemRef){
                if (itemRef.name.toLowerCase().includes(query) || itemRef.author.toLowerCase().includes(query)){
                let songLI = document.createElement('LI');
                songLI.className = 'playlist-song-item';
                songLI.innerHTML = `<div class="song-div">
                                        <div class="image-song-div">
                                            <a class="image-song-a" href="#"><img class="image-song" src="assets/images/AddPlaylist.png" alt="Cover"/>
                                                <div class="middle"><img class="song-play-image" src="assets/icon/Play.png" alt="Cover"/></div>
                                            </a>
                                        </div>
                                    <p class="song-name">${itemRef.name}</p>
                                    <a class="song-author" href="#">${itemRef.author}</a>
                                    </div>
                                    <div class="duration-div">
                                        <p class="duration">2:22</p>
                                    </div>
                                    `;
                searchContainer.appendChild(songLI);
                }
            console.log(itemRef.author);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
}

export default Search;