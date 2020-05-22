import Utils        from './../../services/Utils.js'

async function getSongs(){
    const snapshot = await firebase.database().ref('/songs');
    return snapshot;
}

async function getArtists(){
    const snapshot = await firebase.database().ref('/artists');
    return snapshot;
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

let Artist = {
    render : async () => {
        let request = Utils.parseRequestURL()
        let query = request.id;
        
        return /*html*/`
            <section class = "search-results-section">
                <div id="artist-info-head">
                    <img id="img-artist-on-page" class="img-artist-page" src="" alt="Cover">
                    <div>
                        <h2 id="section-artist-h2" class="sections-text"></h2>
                        <div id="section-artist-desc" class="description-text">Artist</div>
                    </div>
                </div>
                <ol id="search-results-ol" class="playlist-ol"></ol> 
            </section>
            `
    }
    , after_render: async () => {
        let request = Utils.parseRequestURL()
        let query = decodeURIComponent(request.id);
        const h2 =  document.getElementById('section-artist-h2');
        const pic = document.getElementById('img-artist-on-page');

        let artistRealName = query;
        let picUrl1 = await getImageArtist("a0");
        
        let snapshot = await firebase.database().ref('/artists');
        snapshot.on("value", async function(snapshot) {
            let artistsList = snapshot.val();
            artistsList.forEach(async function(artist){
                console.log(artist.name.toLowerCase());
                if (artist.name.toLowerCase() === query.toLowerCase()){
                    artistRealName = artist.name;
                    let picUrl1 = await getImageArtist(artist.pic_id);
                    pic.src = picUrl1;
                }
            });
        });
        h2.innerHTML = artistRealName;
        pic.src = picUrl1;
        //h2.innerHTML = query;
        const searchContainer = document.getElementById('search-results-ol');

        snapshot = await firebase.database().ref('/songs');
        snapshot.on("value", async function(snapshot) {
            let songsList = snapshot.val();
            songsList.forEach(async function(itemRef){
                // console.log(query.toLowerCase);
                if (itemRef.author.toLowerCase().includes(query.toLowerCase())){
                    const picUrl = await getImageSong(itemRef.pic_id);
                    let songLI = document.createElement('LI');
                    songLI.className = 'playlist-song-item';
                    songLI.innerHTML = `<div class="song-div">
                                        <div class="image-song-div">
                                            <a class="image-song-a" href="#"><img class="image-song" src=${picUrl} alt="Cover"/>
                                                <div class="middle"><img class="song-play-image" src="icon/Play.png" alt="Cover"/></div>
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

export default Artist;