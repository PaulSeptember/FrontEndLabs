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

export async function getSongId(){
  const snapshot = await firebase.database().ref('/song_id/id').once('value');
  return snapshot.val();
}


export async function getPicId(){
  const snapshot = await firebase.database().ref('/song_pic_id/id').once('value');
  return snapshot.val();
}
