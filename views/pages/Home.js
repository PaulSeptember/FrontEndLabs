
async function getChart(){
  const snapshot = await firebase.database().ref('/chart_songs').once('value');
  return snapshot.val();
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
        
        <section id="my-playlists-id" class="playlist-container hide">
            <h2 class="sections-text" id="playlists-title">Your playlists</h2>
            <p class="description-text">Create your own playlists</p>
            <div class="playlists-div">
                <ul class="playlists-list">
                    <li class="playlist-list-item">
                        <div class="playlist-div">
                            <a href="#">
                                <img class="add-playlist-image" src="images/AddPlaylist.png" alt="Cover"></img>
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
            
        <section class="releases-container">
            <h2 class="sections-text" id="releases-title">New releases</h2>
            <div class="description-text">The most popular releases, albums and mixes </div>
            <div class="playlists-div">
                <ul class="playlists-list">
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
            <ul class="artists-list">
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
            </ul>
        </section>
        
        <section id="upload-container-id" class="upload-container hide">
            <h2 class="sections-text" id="genres-title">Upload</h2>
            <div class="description-text">Did not find what you want? Fine. Upload any song you want...</div>
            <a href="/#/upload" id="upload-main-button" class="btn-red">Upload</a>
        </section>
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
        const songs = await getChart();

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



        function renderPlaylists(){
          if (songs){
            var i = 1;
            songs.forEach(function(song){
              let songLI = document.createElement('LI');
              songLI.className = 'song-item';
              songLI.innerHTML = `<p class="chart-position-text">${i}</p>
                                    <div class="image-song-div">
                                        <a class="image-song-a" href="#"><img class="image-song" src="images/AddPlaylist.png" alt="Cover"/>
                                            <div class="middle"><img class="song-play-image" src="icon/Play.png" alt="Cover"/></div>
                                        </a>
                                    </div>
                                    <p class="song-name">${song.name}</p>
                                    <a class="song-author" href="#">${song.author}</a>`;
              chartContainer.appendChild(songLI);
              i = i + 1;
            });
          }
        }

        renderPlaylists();
    }

}

export default Home;

