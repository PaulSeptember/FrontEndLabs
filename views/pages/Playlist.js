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
                <button id="play-me" class="playlist-page-play">
                    <img id="img-playlist-on-page" class="playlist-page-image" src="" alt="Cover"></img>
                    <div class="playlist-page-middle-image">
                        <img class="playlist-page-play-image" src="icon/Play.png" alt="Cover"/>
                    </div>
                </button>
            </div>
            <div class="playlist-page-info-div">  
                <h1 id="playlist-name-id" class="playlist-page-name">Playlist_Name</h1>
                <p id="playlist-desc-id" class="playlist-page-description">Playlist_Description</p>
                <p id="playlist-author-id" class="playlist-page-author">Created by:</p>
            </div>  
            <a class="btn-red hide" id="playlist-edit-button">Edit playlist</a>                      
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
        const plaAuthor = document.getElementById('playlist-author-id');
        const pic = document.getElementById('img-playlist-on-page');
        const editButton = document.getElementById('playlist-edit-button');
        const playPlaylist = document.getElementById('play-me');
        let createdBy;
        let snapshot = await firebase.database().ref('/playlists/' + playlistId);

        snapshot.on("value", async function(snapshot) {
            let playlist = snapshot.val();
            h1.innerHTML = playlist.name;
            desc.innerHTML = playlist.desc;
            plaAuthor.innerHTML = "Created by: " + playlist.created;
            createdBy = playlist.created;
            let picUrl1 = await DBGet.getImagePlaylist(playlist.pic_id);
            pic.src = picUrl1;
            firebase.auth().onAuthStateChanged(firebaseUser => {
                console.log(firebaseUser.email);
                console.log(createdBy);
                if (firebaseUser && (createdBy === firebaseUser.email)){
                    editButton.classList.remove('hide');
                    editButton.href="/#/playlistedit/" + playlistId;
                }else{
                    editButton.classList.add('hide');
                }
            });
        });

        const songsContainer = document.getElementById('playlist-songs-list');

        snapshot = await firebase.database().ref('/playlists/' + playlistId + '/song_list');
        snapshot.on("value", async function(snapshot) {
            let idList = snapshot.val();
            //idList.forEach(async function(itemRef){
            for(const itemRef of idList){
                if (!itemRef)continue;
                let songId = itemRef.id;
                let songSnapshot = await firebase.database().ref('/songs/' + songId).once('value');
                let song = songSnapshot.val();
                
                let picUrl2 = await DBGet.getImageSong(song.pic_id); 

                let playlistLI = document.createElement('LI');
                playlistLI.className = 'playlist-song-item';
                playlistLI.innerHTML = `
                    <div class="song-div">
                        <div class="image-song-div">
                            <button class="image-song-a">
                                <img class="image-song" src=${picUrl2} alt="Cover"/>
                                <div class="middle">
                                    <img id="${songId}" class="song-play-image" src="icon/Play.png" alt="Cover"/>
                                </div>
                            </button>
                        </div>
                        <p class="song-name">${song.name}</p>
                        <a class="song-author" href="/#/artist/${song.author}">${song.author}</a>
                    </div>
                    <div class="duration-div">
                        <p class="duration">2:22</p>
                    </div>
                `;
                songsContainer.appendChild(playlistLI);
                
            }//);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        songsContainer.addEventListener("click",async function(e) {
            console.log(e.target.nodeName);
            if(e.target && e.target.nodeName == "IMG") {
                console.log(e.target.id);
                if (firebase.auth().currentUser){
                    DBGet.pushPlaylist(firebase.auth().currentUser.email, [e.target.id]);
                }
                //firebase.database().ref('/playlists/' + playlistId + "/song_list/" + e.target.id).remove();
            }
        });

        playPlaylist.addEventListener("click",async function(e) {
            if (firebase.auth().currentUser){
                let list = await DBGet.getPlaylistList(playlistId);
                DBGet.pushPlaylist(firebase.auth().currentUser.email, list);
            }
            
        });


    }
}

export default Playlist;