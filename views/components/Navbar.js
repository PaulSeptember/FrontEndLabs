let Navbar = {
    render: async () => {
        let view =  /*html*/`
        <header class="header">
        
            <div id="header-left-part">
                <a href="/#/" id="header-music-player-name">Yoptify</a>  
                <input id="header-search-input" size="40" placeholder ="Search">
            </div>


            <div id="header-block-auth">
                <a class="btn-animated" href="/#/login">Log in</a>
                <p id="header-div-or">or</p>
                <a class="btn-animated" href="/#/register">Register</a>
            </div>

        </header>
        `
        return view
    },
    after_render: async () => { }

}

export default Navbar;