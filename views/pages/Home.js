import * as DBGet from './../../services/DBGet.js'
//import * as Player from './../../services/Player.js'

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
                <ul id="user-playlists" class="playlists-list">
                    <li class="playlist-list-item">
                        <div class="playlist-div">
                            <a id="new-playlist-link" href="/#/playlistnew">
                                <img class="add-playlist-image" src="icon/Add.png" alt="Cover"></img>
                                <div class="playlist-middle-image">
                                    <img class="playlist-play-image" src="icon/Add.png" alt="Cover"/>
                                </div>
                            </a>
                        </div> 
                        <p class="playlist-name">New playlist</p>
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
            <ul id=genre-selection>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox1" value="rock">
                    <label for="genre-selector-checkbox1" class="genre-selector-label">Rock</label>
                </li>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox2" value="punk">
                    <label for="genre-selector-checkbox2" class="genre-selector-label">Punk</label>
                </li>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox3" value="classic">
                    <label for="genre-selector-checkbox3" class="genre-selector-label">Classic</label>
                </li>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox4" value="pop">
                    <label for="genre-selector-checkbox4" class="genre-selector-label">Pop</label>
                </li>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox5" value="jazz">
                    <label for="genre-selector-checkbox5" class="genre-selector-label">Jazz</label>
                </li>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox6" value="electro">
                    <label for="genre-selector-checkbox6" class="genre-selector-label">Electro</label>
                </li>
                <li class="genre-selector-div">
                    <input type="checkbox" class="genre-selector-checkbox" id="genre-selector-checkbox7" value="rap and hip-hop">
                    <label for="genre-selector-checkbox7" class="genre-selector-label">Rap and Hip-Hop</label>
                </li>
            </ul>
            <button id="genres-select-button" class="btn-red">Find</button>
            <div>
                <ul class="chart-items" id="search-genre-cont"></ul>   
            </div>
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
        const genresFindButton = document.getElementById('genres-select-button');
        const genresContainer = document.getElementById('search-genre-cont');

        const songs = await DBGet.getChart();
        const playlistsChart = await DBGet.getPlaylistsChart();
        let playlists = await DBGet.getPlaylists();
        const artists = await DBGet.getArtistsChart();
        let user = "";

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser){
                uploadSection.classList.remove('hide');
                playlistSection.classList.remove('hide');
                uploadnav.classList.remove('hide');
                playlistnav.classList.remove('hide');
                user = firebaseUser.email;
            }else{
                uploadSection.classList.add('hide');
                playlistSection.classList.add('hide');
                uploadnav.classList.add('hide');
                playlistnav.classList.add('hide');
            }
        });

       

        const userPlaylists = document.getElementById('user-playlists');
        if(playlists && firebase.auth().currentUser){
            for(let [index,playlist] of playlists.entries()){
                if (!playlist)continue;
                if (playlist.created != firebase.auth().currentUser.email)continue;
                const picUrl = await DBGet.getImagePlaylist(playlist.pic_id);
                let playlistLI = document.createElement('LI');
                playlistLI.className = 'playlist-list-item';
                playlistLI.innerHTML = `
                            <div class="playlist-div">
                                    <button class="playlist-play">
                                        <img class="add-playlist-image" src=${picUrl} alt="Cover"></img>
                                        <div class="playlist-middle-image">
                                            <img id="${index}" class="playlist-play-image" src="icon/Play.png" alt="Cover"/>
                                        </div>
                                    </button>
                                </div> 
                                <a class="playlist-name-link" href="/#/playlist/${index}">${playlist.name}</a>
                                <p class="playlist-description">${playlist.desc}</p>
                        `;
                userPlaylists.appendChild(playlistLI);
            }
        }

        if (playlistsChart){
            playlistsChart.forEach(async function(playlistRef){
                const playlistId = playlistRef.id;
                const snapshot = await firebase.database().ref('/playlists/' + playlistId).once('value');
                const playlist = snapshot.val();
                const picUrl = await DBGet.getImagePlaylist(playlist.pic_id);
                let playlistLI = document.createElement('LI');
                playlistLI.className = 'playlist-list-item';
                playlistLI.innerHTML = `
                    <div class="playlist-div">
                            <button class="playlist-play">
                                <img class="add-playlist-image" src=${picUrl} alt="Cover"></img>
                                <div class="playlist-middle-image">
                                    <img id="${playlistId}" class="playlist-play-image" src="icon/Play.png" alt="Cover"/>
                                </div>
                            </button>
                        </div> 
                        <a class="playlist-name-link" href="/#/playlist/${playlistId}">${playlist.name}</a>
                        <p class="playlist-description">${playlist.desc}</p>
                `;
                releasesList.appendChild(playlistLI);
            });
        }


        if (artists){
            artists.forEach(async function(artistRef){ 
                const snapshot = await firebase.database().ref('/artists/' + artistRef.id).once('value');
                const artist = snapshot.val();
                const picUrl = await DBGet.getImageArtist(artist.pic_id);
                let artistLI = document.createElement('LI');
                artistLI.className = 'artist-list-item';
                artistLI.innerHTML = `
                    <div class="artist-image-div">
                        <a class="artist-link-image">
                            <img class="artist-image" src=${picUrl} alt="Cover"/>
                        </a>
                    </div>
                    <a class="artist-text" href="/#/artist/${encodeURIComponent(artist.name)}">${artist.name}</a>
                 `
                 artistList.appendChild(artistLI);
            });
        }
        if (songs){
            let i = 1;
            for(const songRef of songs){
                if(!songRef)continue;
                const songId = songRef.id;
                const snapshot = await firebase.database().ref('/songs/' + songId).once('value');
                const song = snapshot.val();
                const picUrl = await DBGet.getImageSong(song.pic_id);
                let songLI = document.createElement('LI');
                songLI.className = 'song-item';
                songLI.innerHTML = `        <p class="chart-position-text">${i}</p>
                                            <div class="image-song-div">
                                                <button class="image-song-a">
                                                    <img class="image-song" src=${picUrl} alt="Cover"/>
                                                    <div class="middle">
                                                        <img id="${songId}" class="song-play-image" src="icon/Play.png" alt="Cover"/>
                                                    </div>
                                                </button>
                                            </div>
                                            <p class="song-name">${song.name}</p>
                                            <a class="song-author" href="/#/artist/${encodeURIComponent(song.author)}">${song.author}</a>`;
                chartContainer.appendChild(songLI);
                i = i + 1;
            };
        }
        chartContainer.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "IMG") {
                console.log(e.target.id);
                if (firebase.auth().currentUser){
                    DBGet.pushPlaylist(firebase.auth().currentUser.email, [e.target.id]);
                }else{
                    alert("Login first.")
                }
            }
        });

        releasesList.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "IMG") {
                console.log(e.target.id);
                if (firebase.auth().currentUser){
                    let list = await DBGet.getPlaylistList(e.target.id);
                    DBGet.pushPlaylist(firebase.auth().currentUser.email, list);
                }else{
                    alert("Login first.")
                }
            }
        });


        userPlaylists.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "IMG") {
                console.log(e.target.id);
                if (firebase.auth().currentUser){
                    let list = await DBGet.getPlaylistList(e.target.id);
                    DBGet.pushPlaylist(firebase.auth().currentUser.email, list);
                }else{
                    alert("Login first.")
                }
            }
        });

        genresFindButton.addEventListener("click",async function(e) {
            genresContainer.innerHTML = "";
            var checkedValues = []; 
            var inputElements = document.getElementsByClassName('genre-selector-checkbox');

            for(let checkBox of inputElements){
                if(checkBox.checked){
                    checkedValues.push(checkBox.value);
                    console.log(checkBox.value)
                }
            }

            const snapshot = await firebase.database().ref('/songs').once('value');
            const songsList = snapshot.val();
            let i = 1;

            for(let [index,song] of songsList.entries()){
                if (!song) continue;
                if (checkedValues.includes(song.genre)){
                    console.log(song.name);
                    const picUrl = await DBGet.getImageSong(song.pic_id);
                    let songLI = document.createElement('LI');
                    songLI.className = 'song-item';
                    songLI.innerHTML = `        
                                                <div class="image-song-div">
                                                    <button class="image-song-a">
                                                        <img class="image-song" src=${picUrl} alt="Cover"/>
                                                        <div class="middle">
                                                            <img id="${index}" class="song-play-image" src="icon/Play.png" alt="Cover"/>
                                                        </div>
                                                    </button>
                                                </div>
                                                <p class="song-name">${song.name}</p>
                                                <a class="song-author" href="/#/artist/${encodeURIComponent(song.author)}">${song.author}</a>`;
                    genresContainer.appendChild(songLI);
                    i = i + 1;
                    if (i==16)break;
                }
            }
        });

        genresContainer.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "IMG") {
                console.log(e.target.id);
                if (firebase.auth().currentUser){
                    DBGet.pushPlaylist(firebase.auth().currentUser.email, [e.target.id]);
                }else{
                    alert("Login first.")
                }
            }
        });

        
    }

}

export default Home;

