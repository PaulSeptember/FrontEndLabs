
async function getSongId(){
  const snapshot = await firebase.database().ref('/song_id/id').once('value');
  return snapshot.val();
}


async function getPicId(){
  const snapshot = await firebase.database().ref('/pic_id/id').once('value');
  return snapshot.val();
}


let Upload = {
    render : async () => {
        let view =  /*html*/

        `    
       <section id="upload-page-section">
        <h2 class="sections-text" >Track uploading</h2>
            <p class="description-text">Upload your own track, add name and author, so all users can listen it!</p>

        <h2 class="upload-helper">Name</h1>
        <input id="name-input" class="upload-input">
        <h2 class="upload-helper">Author</h1>
        <input id="author-input" class="upload-input">
        <div class="upload-file-div">
            <label class="btn-light-red" id="upload-file-button-label">Select file
                <input type='file' accept=".mp3" value="upload" id="upload-file-button">
            </label>
            <p id="file-name" class="upload-link"></p>
        </div>

        <div class="upload-file-div">
            <label class="btn-light-red" id="upload-img-button-label">Select cover
                <input type='file' accept=".png" value="upload" id="upload-image-button">
            </label>
            <p id="file-img-name" class="upload-link"></p>
        </div>

        <button id="upload-button" class="btn-red">Upload</button>
    </section>
        `
        return view
    }
    , after_render: async () => {
        console.log("sosoi");
        
        const fileButton = document.getElementById('upload-file-button');
        const pictureButton = document.getElementById('upload-image-button');
        const uploadButton = document.getElementById('upload-button');
        const fileName = document.getElementById('file-name');
        const pictureName = document.getElementById('file-img-name');
        const nameInput = document.getElementById('name-input');
        const authorInput = document.getElementById('author-input');
        const songId = await getSongId();
        const picId = await getPicId();


        function pushSongId(id) {
            firebase.database().ref('/song_id').set({ id });
        }

        function pushPicId(id) {
            firebase.database().ref('/pic_id').set({ id });
        }

        let file = null;
        let picture = null;



        fileButton.addEventListener('change', (event) => {
            file = event.target.files[0];
            fileName.innerHTML = file.name;
        });

        pictureButton.addEventListener('change', (event) => {
            picture = event.target.files[0];
            pictureName.innerHTML = picture.name;
        });

        uploadButton.addEventListener('click', e=>{
            if (!nameInput.value || !authorInput.value){
                alert("All fields must be provided!");
            }else if (file){
                let storageRef = firebase.storage().ref('mp3/id' + songId + '.mp3');
                storageRef.put(file);
                pushSongId(songId + 1);

                let thisPicId = 0;
                if (picture){
                    let storageRef = firebase.storage().ref('pic/id' + picId + '.png');
                    storageRef.put(file);
                    pushPicId(picId + 1);
                    thisPicId = picId;
                }


                firebase.database().ref('songs/' + songId).set({
                    name: nameInput.value,
                    author: authorInput.value,
                    id_mp3: songId,
                    id_pic: thisPicId,
                    genre: "rock"
                }, function(error) {
                    if (error) {
                        alert(error.message);
                    } else {
                        console.log('data saved succsessfully!');
                    }
                });

                document.location.href = "/#/";
            } else {
                alert("No file selected..");
            }
        });
    }

}

export default Upload;