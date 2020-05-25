import Utils   from './../../services/Utils.js'
import * as DBGet from './../../services/DBGet.js'


let Search = {
    render : async () => {
        let request = Utils.parseRequestURL()
        let query = decodeURIComponent(request.id);
        
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
        let query = decodeURIComponent(request.id);
        const h2 =  document.getElementById('section-search-h2');

        h2.innerHTML = "Search results for "+query;
        const searchContainer = document.getElementById('search-results-ol');

        const snapshot = await firebase.database().ref('/songs');
        snapshot.on("value", async function(snapshot) {
            let songsList = snapshot.val();
            songsList.forEach(async function(itemRef, index){
                if (itemRef.name.toLowerCase().includes(query) || itemRef.author.toLowerCase().includes(query)){
                    const picUrl = await DBGet.getImageSong(itemRef.pic_id);
                    let songLI = document.createElement('LI');
                    songLI.className = 'playlist-song-item';
                    songLI.innerHTML = `<div class="song-div">
                                        <div class="image-song-div">
                                            <button class="image-song-a" href="#">
                                                <img class="image-song" src=${picUrl} alt="Cover"/>
                                                    <div class="middle">
                                                        <img id="${index}" class="song-play-image" src="icon/Play.png" alt="Cover"/>
                                                    </div>
                                            </button>
                                        </div>
                                    <p class="song-name">${itemRef.name}</p>
                                    <a class="song-author" href="/#/artist/${itemRef.author}">${itemRef.author}</a>
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

        searchContainer.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "IMG") {
                console.log(e.target.id);
                if (firebase.auth().currentUser){
                    DBGet.pushPlaylist(firebase.auth().currentUser.email, [e.target.id]);
                }else{
                    alert("Login first.")
                }
                //firebase.database().ref('/playlists/' + playlistId + "/song_list/" + e.target.id).remove();
            }
        });
    }
}

export default Search;