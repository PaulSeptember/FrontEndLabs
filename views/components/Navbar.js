let Navbar = {
    render: async () => {
        let view =  /*html*/`
        <header class="header">
        
            <div id="header-left-part">
                <a href="/#/" id="header-music-player-name">Yoptify</a>  
                <input id="header-search-input" size="40" placeholder ="Search">
            </div>


            <div id="header-block-auth">
                <p id="nick-name-p" class="hide">Error</p>
                <button id="log-out-btn" class="btn-animated hide">Log out</button>

                <a id="log-in-link" class="btn-animated" href="/#/login">Log in</a>
                <p id="header-div-or">or</p>
                <a id="register-link" class="btn-animated" href="/#/register">Register</a>
            </div>

        </header>
        `
        return view
    },
    after_render: async () => {
        const log_out_btn = document.getElementById("log-out-btn");
        const log_in_link = document.getElementById("log-in-link");
        const register_link = document.getElementById("register-link");
        const div_or = document.getElementById("header-div-or");
        const nick_name_p = document.getElementById("nick-name-p");

        log_out_btn.addEventListener('click', e=> {
            firebase.auth().signOut();
        })

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser){
                log_in_link.classList.add('hide');
                register_link.classList.add('hide');
                div_or.classList.add('hide');
                log_out_btn.classList.remove('hide');
                nick_name_p.classList.remove('hide');
                //console.log(firebaseUser.uid);
                //console.log(firebaseUser.email);
                nick_name_p.innerHTML="Logged as " + firebaseUser.email; 
            }else{
                log_in_link.classList.remove('hide');
                register_link.classList.remove('hide');
                div_or.classList.remove('hide');
                log_out_btn.classList.add('hide');
                nick_name_p.innerHTML = "Logged in.";
                nick_name_p.classList.add('hide');
            }
        });
    }

}

export default Navbar;