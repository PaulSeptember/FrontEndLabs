import * as DBGet from './../../services/DBGet.js'

let Player = {
    render: async () => {
        let view =  /*html*/`
        <section>
            <button id="player-prev">PREV</button>
            <button id="player-pause">PAUSE</button>
            <button id="player-next">NEXT</button>

            <audio id="player">
                <source src="track.ogg" type="audio/ogg"/>
                <source src="track.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </section>
        `
        return view
    },
    after_render: async () => {
        const playButton = document.getElementById('player-pause');
        const player = document.getElementById('player');
        const nextButton = document.getElementById('player-next');
        const prevButton = document.getElementById('player-prev');


        let currentSong  = 0;
        let currentUser;
        let songsQueue = [];

        async function getPlaylist(){
            console.log('started loading');
            let snapshot = await firebase.database().ref('/play_queue');
            snapshot.on("value", async function(snapshot) {
                let idList = snapshot.val();
                //idList.forEach(async function(itemRef){
                for(const [index,itemRef] of idList.entries()){
                    if (!itemRef)continue;
                    console.log('check user ' + itemRef.user);
                    if (itemRef.user == currentUser){
                        console.log('found!');

                        const queueSongSnapshot = await firebase.database().ref('/play_queue/' + index + '/songs_list').once('value');
                        let songs = queueSongSnapshot.val();
                        console.log(songs);

                        songsQueue = [];
                        for(const song of songs){
                            if (!song) continue;
                            console.log(song.id);
                            songsQueue.push(song.id);
                        }
                        currentSong = 0;
                        await getSong();
                        break;
                    }
                }
                play();
            });
        }

        async function getSong(){
            player.src = await DBGet.getSongMP3(songsQueue[currentSong]);
        }
       
        firebase.auth().onAuthStateChanged(async firebaseUser => {
            if (firebaseUser){
                currentUser = firebase.auth().currentUser.email;
                await getPlaylist();   
            }else{
               console.log('not cool((');
            }
        });

        function play(){
            playButton.innerHTML = "PAUSE";
            isPlay = true;
            player.play();
        }

        function pause(){
            playButton.innerHTML = "PLAY";
            isPlay = false;
            player.pause();
        }

        async function next(){
            currentSong = currentSong + 1;
            if (currentSong == songsQueue.length){
                currentSong = 0;
            }
            await getSong();
            play();
        }

        async function prev(){
            currentSong = currentSong - 1;
            if (currentSong == -1){
                currentSong = songsQueue.length - 1;
            }
            await getSong();
            play();
        }

        let isPlay = false;
        playButton.innerHTML = "PLAY";

        playButton.addEventListener("click",async function(e) {
            if (isPlay){
                pause();
            }else{
                play();
            }
        });

        nextButton.addEventListener("click", async function(e){
            await next();
        });

        prevButton.addEventListener("click", async function(e){
            await prev();
        });

        player.addEventListener("ended", async function() {
            next();
        });
    }

}

export default Player;