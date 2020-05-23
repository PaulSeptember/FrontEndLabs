
async function getChart(){
    const snapshot = await firebase.database().ref('/chart_songs').once('value');
    return snapshot.val();
}

async function getPlaylistsChart(){
    const snapshot = await firebase.database().ref('/chart_playlists').once('value');
    return snapshot.val();
}

async function getArtistsChart(){
    const snapshot = await firebase.database().ref('/chart_artists').once('value');
    return snapshot.val();
}


async function getImageSong(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/song_pic/id" + id + ".png");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

async function getImageArtist(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/artist_pic/id" + id + ".png");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

async function getImagePlaylist(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/playlist_pic/id" + id + ".png");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}




let Home = {
    render : async () => {
        let view =  /*html*/

        `    
        <main id="main-container">
        <nav class="navigation-container">
            <h1 id="navigation-title">Home</h1>
            <div id="navigation">
                <a id="playlists-nav" class="navigation-ref hide" href="#playlists-title">Playlists</a>
                <a id="releases" class="navigation-ref" href="#releases-title">releases</a>
                <a class="navigation-ref" href="#chart-title">Chart</a>
                <a class="navigation-ref" href="#genres-title">Genres</a>
                <a class="navigation-ref" href="#artitsts-title">Artists</a>
                <a id="upload-nav" class="navigation-ref hide" href="#artitsts-title">Upload</a>
            </div>
        </nav>

        <div id="my-playlists-id" class = "hide">
        <section class="playlist-container">
            <h2 class="sections-text" id="playlists-title">Your playlists</h2>
            <p class="description-text">Create your own playlists</p>
            <div class="playlists-div">
                <ul class="playlists-list">
                    <li class="playlist-list-item">
                        <div class="playlist-div">
                            <a href="#">
                                <img id="fuck" class="add-playlist-image" src="images/AddPlaylist.png" alt="Cover"></img>
                                <div class="playlist-middle-image">
                                    <img class="playlist-play-image" src="icon/Add.png" alt="Cover"/>
                                </div>
                            </a>
                        </div> 
                        <p class="playlist-name-link" href="playlist.html">New playlist</p>
                    </li>

                    <li class="playlist-list-item">
                        <div class="playlist-div">
                            <a href="#">
                                <img class="add-playlist-image" src="images/AddPlaylist.png" alt="Cover"></img>
                                <div class="playlist-middle-image">
                                    <img class="playlist-play-image" src="icon/Play.png" alt="Cover"/>
                                </div>
                            </a>
                        </div> 
                        <a class="playlist-name-link" href="playlist.html">Playlist_Name</a>
                        <p class="playlist-description">Playlist_Description</p>
                    </li>
                    
                </ul>
            </div>
        </section>
        </div>
            
        <section class="releases-container">
            <h2 class="sections-text" id="releases-title">New releases</h2>
            <div class="description-text">The most popular releases, albums and mixes </div>
            <div id="releases-ul-div" class="playlists-div">
                <ul class="playlists-list"></ul>
            </div>
        </section>

        <section class="chart-container">
            <h2 class="sections-text" id="chart-title">Chart</h2>
            <div class="description-text">
                Top 15 most popular songs of last week 
            </div>
            <div>
                <ul class="chart-items" id="chart-cont"></ul>   
            </div>
            
        </section>

        <section class="genres-container">
            <h2 class="sections-text" id="genres-title">Genres</h2>
            <div class="description-text">Select some genres and we will try to find </div>
            <div id=genre-selection>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox1">
                    <label for="genre-selector-checkbox1" class="genre-selector-label">Alternative</label>
                </div>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox2">
                    <label for="genre-selector-checkbox2" class="genre-selector-label">Punk</label>
                </div>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox3">
                    <label for="genre-selector-checkbox3" class="genre-selector-label">Classic</label>
                </div>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox4">
                    <label for="genre-selector-checkbox4" class="genre-selector-label">Pop</label>
                </div>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox5">
                    <label for="genre-selector-checkbox5" class="genre-selector-label">Jazz</label>
                </div>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox6">
                    <label for="genre-selector-checkbox6" class="genre-selector-label">Electro</label>
                </div>
                <div class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox7">
                    <label for="genre-selector-checkbox7" class="genre-selector-label">Rap and Hip-Hop</label>
                </div>
            </div>
            <button id="genres-select-button" class="btn-red">Find</a>
        </section>

        <section class="artists-container">
            <h2 class="sections-text" id="artitsts-title">Artists</h2>
            <div class="description-text">
                Most popular artitsts
            </div>
            <ul id="artist-list-id" class="artists-list"></ul>
        </section>
        <div id="upload-container-id" class="hide">
        <section class="upload-container">
            <h2 class="sections-text" id="genres-title">Upload</h2>
            <div class="description-text">Did not find what you want? Fine. Upload any song you want...</div>
            <a href="/#/upload" id="upload-main-button" class="btn-red">Upload</a>
        </section>
        </div>
    </main>   
        `
        return view

    }
    , after_render: async () => {
        const chartContainer = document.getElementById('chart-cont');
        const uploadSection = document.getElementById('upload-container-id');
        const playlistSection = document.getElementById('my-playlists-id');
        const uploadnav = document.getElementById('upload-nav');
        const playlistnav = document.getElementById('playlists-nav');
        const releasesList = document.getElementById('releases-ul-div');
        const artistList = document.getElementById('artist-list-id');
        const songs = await getChart();
        const playlists = await getPlaylistsChart();
        const artists = await getArtistsChart();
       
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser){
                uploadSection.classList.remove('hide');
                playlistSection.classList.remove('hide');
                uploadnav.classList.remove('hide');
                playlistnav.classList.remove('hide');
            }else{
                uploadSection.classList.add('hide');
                playlistSection.classList.add('hide');
                uploadnav.classList.add('hide');
                playlistnav.classList.add('hide');
            }
        });

        if (songs){
            let i = 1;
            songs.forEach(async function(songRef){
                const songId = songRef.id;
                const snapshot = await firebase.database().ref('/songs/' + songId).once('value');//.once('value');
                const song = snapshot.val();

                const picUrl = await getImageSong(song.pic_id);//song.pic_id);
                let songLI = document.createElement('LI');
                songLI.className = 'song-item';
                songLI.innerHTML = `
                                            <div class="image-song-div">
                                                <a class="image-song-a" href="#"><img class="image-song" src=${picUrl} alt="Cover"/>
                                                    <div class="middle"><img class="song-play-image" src="icon/Play.png" alt="Cover"/></div>
                                                </a>
                                            </div>
                                            <p class="song-name">${song.name}</p>
                                            <a class="song-author" href="/#/artist/${encodeURIComponent(song.author)}">${song.author}</a>`;
                chartContainer.appendChild(songLI);
            
                i = i + 1;
            });
        }

        if (playlists){
            playlists.forEach(async function(playlistRef){
                const playlistId = playlistRef.id;
                const snapshot = await firebase.database().ref('/playlists/' + playlistId).once('value');//.once('value');
                const playlist = snapshot.val();
                //TODO: nor pic
                const picUrl = await getImagePlaylist(playlist.pic_id);//playlist.pic_id);
                let playlistLI = document.createElement('LI');
                playlistLI.className = 'playlist-list-item';
                playlistLI.innerHTML = `
                    <div class="playlist-div">
                            <a href="/#/playlist/${playlistId}">
                                <img class="add-playlist-image" src=${picUrl} alt="Cover"></img>
                                <div class="playlist-middle-image">
                                    <img class="playlist-play-image" src="icon/Play.png" alt="Cover"/>
                                </div>
                            </a>
                        </div> 
                        <a class="playlist-name-link" href="/#/playlist/${playlistId}">${playlist.name}</a>
                        <p class="playlist-description">${playlist.desc}</p>
                `;
                releasesList.appendChild(playlistLI);
            });
        }


        /*
            <li class="artist-list-item">
                    <div class="artist-image-div">
                        <a class="artist-link-image" href="#">
                            <img class="artist-image" src="images/AddPlaylist.png" alt="Cover"/>
                            <div class="middle-artist">
                                <img class="artist-play-button" src="icon/Play.png" alt="Cover"/>
                            </div>
                        </a>
                    </div>
                    <a class="artist-text" href="#">StephanF</a>
                </li>
        */

        if (artists){
            artists.forEach(async function(artistRef){
                const snapshot = await firebase.database().ref('/artists/' + artistRef.id).once('value');//.once('value');
                const artist = snapshot.val();
                 const picUrl = await getImageArtist(artist.pic_id);
                 let artistLI = document.createElement('LI');
                 artistLI.className = 'artist-list-item';
                 artistLI.innerHTML = `
                    <div class="artist-image-div">
                        <a class="artist-link-image" href="/#/">
                            <img class="artist-image" src=${picUrl} alt="Cover"/>
                            <div class="middle-artist">
                                <img class="artist-play-button" src="icon/Play.png" alt="Cover"/>
                            </div>
                        </a>
                    </div>
                    <a class="artist-text" href="/#/artist/${encodeURIComponent(artist.name)}">${artist.name}</a>
                 `
                 artistList.appendChild(artistLI);
            });
        }
        
    }

}

export default Home;

