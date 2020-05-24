import Utils        from './../../services/Utils.js'
import * as DBGet from './../../services/DBGet.js'

let PlaylistEdit = {
    render : async () => {
        let request = Utils.parseRequestURL()
        let query = request.id;
        
        return /*html*/`
        <section class="playlist-page-section">
        <h1>Playlist editing</h1>
        <div class="playlist-head-div">
            <div class="playlist-page-image-div">
                <a href="#">
                    <img id="img-playlist-on-page" class="playlist-page-image" src="" alt="Cover"></img>
                    <div class="playlist-page-middle-image">
                        <img class="playlist-page-play-image" src="NO" alt="Change cover"/>
                    </div>
                </a>
            </div>
            <div class="playlist-page-info-div">  
                <input id="playlist-name-input-id" class="playlists-edit-name">
                <!--h1 id="playlist-name-id" class="playlist-page-name">Playlist_Name</h1-->
                <input id="playlist-desc-input-id" class="playlists-edit-description">
                <!--p id="playlist-desc-id" class="playlist-page-description">Playlist_Description</p-->
                <p id="playlist-author-id" class="playlist-page-author">Created by:</p>
            </div>  
            <button class="btn-red" id="playlist-delete-button">Delete</button>
            <button class="btn-red" id="playlist-save-button">Save</button>                      
        </div>
        <div class="playlist-items">
            <ol id="playlist-songs-list" class="playlist-ol"></ol>
        </div>              
    </section>

    <section class = "search-results-section">
        <h2 id="section-search-h2" class="sections-text" id="genres-title">Song search</h2>
        <input id="playlist-search-input" size="40" placeholder ="Search">
        <ul id="search-results-ol" class="playlist-ol"></ul> 
    </section>
            `
    }
    , after_render: async () => {
        let request = Utils.parseRequestURL()
        let playlistId = decodeURIComponent(request.id);
        const h1 =  document.getElementById('playlist-name-input-id');
        const desc = document.getElementById('playlist-desc-input-id');
        const plaAuthor = document.getElementById('playlist-author-id');
        const pic = document.getElementById('img-playlist-on-page');
        //const editButton = document.getElementById('playlist-edit-button');
        const searchContainer = document.getElementById('search-results-ol');
        const searchInput = document.getElementById('playlist-search-input');
        const saveButton = document.getElementById('playlist-save-button');
        const deleteButton = document.getElementById('playlist-delete-button');

        let createdBy;
        let snapshot = await firebase.database().ref('/playlists/' + playlistId);

        snapshot.on("value", async function(snapshot) {
            let playlist = snapshot.val();
            h1.value = playlist.name;
            desc.value = playlist.desc;
            plaAuthor.innerHTML = "Created by: " + playlist.created;
            createdBy = playlist.created;
            let picUrl1 = await DBGet.getImagePlaylist(playlist.pic_id);
            pic.src = picUrl1;
        });


        saveButton.addEventListener("click",async function(e) {
            firebase.database().ref('/playlists/' + playlistId + "/name").set(h1.value);
            firebase.database().ref('/playlists/' + playlistId + "/desc").set(desc.value);
            document.location.href ="/#/playlist/" + playlistId;
        });

        deleteButton.addEventListener("click",async function(e){
            firebase.database().ref('/playlists/' + playlistId).remove();
            document.location.href ="/#/";
        });

        const songsContainer = document.getElementById('playlist-songs-list');

        async function updatePlaylistSongs(){
            songsContainer.innerHTML = "";
            snapshot = await firebase.database().ref('/playlists/' + playlistId + '/song_list');
            snapshot.on("value", async function(snapshot) {
                let idList = snapshot.val();
                console.log(idList);
                //idList.forEach(async function(itemRef){
                songsContainer.innerHTML = "";
                if (idList){  
                    for(const [index,itemRef] of idList.entries()){
                        if (!itemRef)continue;
                        let songId = itemRef.id;
                        let songSnapshot = await firebase.database().ref('/songs/' + songId).once('value');
                        let song = songSnapshot.val();
                        
                        let picUrl2 = await DBGet.getImageSong(song.pic_id); 

                        let playlistLI = document.createElement('LI');
                        playlistLI.className = 'playlist-song-item';
                        //playlistLI.id = index;
                        playlistLI.innerHTML = `
                            <div class="song-div">
                                <div class="image-song-div">
                                    <a class="image-song-a" href="#"><img class="image-song" src=${picUrl2} alt="Cover"/>
                                        <div class="middle"><img class="song-play-image" src="icon/Play.png" alt="Cover"/></div>
                                    </a>
                                </div>
                                <p class="song-name">${song.name}</p>
                                <a class="song-author" href="/#/artist/${song.author}">${song.author}</a>
                            </div>
                            <div class="duration-div">
                                <button id="${index}">X</button>
                                <p class="duration">2:22</p>
                            </div>
                        `;
                        songsContainer.appendChild(playlistLI);
                        console.log(song.author);
                    }
                }//);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }

        function pushSongId(id) {
            firebase.database().ref('/playlists/' + playlistId + "/song_id").set(id);
        }
        await updatePlaylistSongs();

        songsContainer.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "BUTTON") {
                console.log(e.target.id);
                firebase.database().ref('/playlists/' + playlistId + "/song_list/" + e.target.id).remove();
            }
        });

        searchContainer.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            event.preventDefault();
            if(e.target && e.target.nodeName == "LI") {
                console.log(e.target.id + " was clicked");

                const snapshot = await firebase.database().ref('/playlists/' + playlistId + "/song_id").once('value');
                const lastSongId = snapshot.val();
                pushSongId(lastSongId + 1);
                firebase.database().ref('/playlists/' + playlistId + "/song_list/" + lastSongId).set({
                    id : e.target.id
                }, function(error) {
                    if (error) {
                        alert(error.message);
                    } 
                });
                console.log("UPDATE")
                //await updatePlaylistSongs();
            }
        });

        searchInput.addEventListener('keyup',async function(event) {
            let query = searchInput.value.toLowerCase();
            const snapshot = await firebase.database().ref('/songs');
            snapshot.on("value", async function(snapshot) {
                let songsList = snapshot.val();  
                searchContainer.innerHTML = "";
                songsList.forEach(async function(itemRef, index){
                    if (itemRef.name.toLowerCase().includes(query) || itemRef.author.toLowerCase().includes(query)){
                        const picUrl = await DBGet.getImageSong(itemRef.pic_id);
                        let songLI = document.createElement('LI');
                        songLI.className = 'playlist-song-item';
                        songLI.id = index;
                        songLI.innerHTML = `<div class="song-div">
                                            <div class="image-song-div">
                                                <a class="image-song-a" href="#"><img class="image-song" src=${picUrl} alt="Cover"/>
                                                    <div class="middle"><img class="song-play-image" src="icon/Play.png" alt="Cover"/></div>
                                                </a>
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
                });
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        });













    }
}

export default PlaylistEdit;