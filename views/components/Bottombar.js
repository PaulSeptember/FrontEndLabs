let Bottombar = {
    render: async () => {
        let view =  /*html*/`
        <footer id="footer-div">
        <nav id="footer-nav">
            <p class="get-back-title">Get back</p>
            <ul class="get-back-list">
                <li class="get-back-list-item"><a class="get-back-link" href="#playlists-title">Playlists</a></li>
                <li class="get-back-list-item"><a class="get-back-link" href="#releases-title">New releases</a></li>
                <li class="get-back-list-item"><a class="get-back-link" href="#chart-title">Chart</a></li>
                <li class="get-back-list-item"><a class="get-back-link" href="/#genres-title">Genres</a></li>
                <li class="get-back-list-item"><a class="get-back-link" href="#artitsts-title">Artists</a></li>
            </ul>
        </nav>
        <div id="credits-div">
            <a class="send-bugs-link" href="https://vk.com/emoseptember">Bug report</a>
            <p class="credits">@September 2020</p> 
        </div>
    </footer>
        `
        return view
    },
    after_render: async () => { }

}

export default Bottombar;