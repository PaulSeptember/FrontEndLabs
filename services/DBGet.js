export async function getSongs(){
    const snapshot = await firebase.database().ref('/songs');
    return snapshot;
}

export async function getArtists(){
    const snapshot = await firebase.database().ref('/artists');
    return snapshot;
}

export async function getChart(){
    const snapshot = await firebase.database().ref('/chart_songs').once('value');
    return snapshot.val();
}

export async function getPlaylistsChart(){
    const snapshot = await firebase.database().ref('/chart_playlists').once('value');
    return snapshot.val();
}

export async function getArtistsChart(){
    const snapshot = await firebase.database().ref('/chart_artists').once('value');
    return snapshot.val();
}

export async function getImageSong(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/song_pic/id" + id + ".png");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

export async function getImageArtist(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/artist_pic/id" + id + ".png");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

export async function getImagePlaylist(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/playlist_pic/id" + id + ".png");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

export async function getSongMP3(id){
    let ref= firebase.storage().ref();
    const imgRef = ref.child("/mp3/id" + id + ".mp3");
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

export async function getSongId(){
  const snapshot = await firebase.database().ref('/song_id/id').once('value');
  return snapshot.val();
}

export async function getUserId(){
  const snapshot = await firebase.database().ref('/user_count/id').once('value');
  return snapshot.val();  
}


export async function getPicId(){
  const snapshot = await firebase.database().ref('/song_pic_id/id').once('value');
  return snapshot.val();
}

export async function getPlaylistId(){
  const snapshot = await firebase.database().ref('/playlist_id/id').once('value');
  return snapshot.val();
}

export async function getPlaylists(){
    const snapshot = await firebase.database().ref('/playlists').once('value');
    return snapshot.val();
}

export async function pushPlaylist(user, list){
    //TODO CLEAN SHIT FROM DB
    const snapshot = await firebase.database().ref('/play_queue').once('value');
    const queues = snapshot.val();
    let findedUserId = 0;

    for(let [index,queue] of queues.entries()){
        if (!queue) continue;

        if (queue.user == user){
            findedUserId = index;
            break;
        }
    }
    console.log(findedUserId);

    firebase.database().ref('/play_queue/' + findedUserId + '/songs_list/').remove();
    let i = 1;
    for(let songId of list){
        firebase.database().ref('/play_queue/' + findedUserId + '/songs_list/' + i + '/id').set(songId);
        i = i + 1;
    }
    
}

export async function getPlaylistList(id){
    let ans =[];
    let snapshot = await firebase.database().ref('/playlists/' + id + '/song_list').once("value");
    let songList = snapshot.val();
    for(let song of songList){
        if(!song)continue;

        ans.push(song.id);
    }
    return ans;
}