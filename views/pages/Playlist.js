import Utils        from './../../services/Utils.js'
import * as DBGet from './../../services/DBGet.js'

let Playlist = {
    render : async () => {
        let request = Utils.parseRequestURL()
        let query = request.id;
        
        return /*html*/`
           <section class="playlist-page-section">
        <div class="playlist-head-div">
            <div class="playlist-page-image-div">
                <a href="#">
                    <img id="img-playlist-on-page" class="playlist-page-image" src="" alt="Cover"></img>
                    <div class="playlist-page-middle-image">
                        <img class="playlist-page-play-image" src="icon/Play.png" alt="Cover"/>
                    </div>
                </a>
            </div>
            <div class="playlist-page-info-div">  
                <h1 id="playlist-name-id" class="playlist-page-name">Playlist_Name</h1>
                <p id="playlist-desc-id" class="playlist-page-description">Playlist_Description</p>
            </div>                        
        </div>
         <div class="playlist-items">
            <ol id="playlist-songs-list" class="playlist-ol"></ol>
        </div>                    
    </section>
            `
    }
    , after_render: async () => {
        let request = Utils.parseRequestURL()
        let playlistId = decodeURIComponent(request.id);
        const h1 =  document.getElementById('playlist-name-id');
        const desc = document.getElementById('playlist-desc-id');
        const pic = document.getElementById('img-playlist-on-page');

        let snapshot = await firebase.database().ref('/playlists/' + playlistId);
        
        snapshot.on("value", async function(snapshot) {
            let playlist = snapshot.val();
            h1.innerHTML = playlist.name;
            desc.innerHTML = playlist.desc;
            let picUrl1 = await DBGet.getImagePlaylist(playlist.pic_id);
            pic.src = picUrl1;
        });
        
        const songsContainer = document.getElementById('playlist-songs-list');

        snapshot = await firebase.database().ref('/playlists/' + playlistId + '/song_list');
        snapshot.on("value", async function(snapshot) {
            let idList = snapshot.val();
            idList.forEach(async function(itemRef){
                let songId = itemRef.id;
                let songSnapshot = await firebase.database().ref('/songs/' + songId).once('value');
                let song = songSnapshot.val();
                
                let picUrl2 = await DBGet.getImageSong(song.pic_id); 

                let playlistLI = document.createElement('LI');
                playlistLI.className = 'playlist-song-item';
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
                        <p class="duration">2:22</p>
                    </div>
                `;
                songsContainer.appendChild(playlistLI);
                
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
}

export default Playlist;