let Login = {

    render: async () => {
        return /*html*/ `
           
        <section class="auth-section">
        <div class="auth-backPage"></div>
            <form class="auth-form">
                <div class="auth-title">Authentication</div>
                <p class="auth-description">Your Yoptify is a tap away</p>
                <input id="email_input" class="auth-input" type="text" placeholder="Nickname" size="34">
                <input id="pass_input" class="auth-input" type="password" placeholder="Password">
                <button id="login-btn" class="btn-red">Log in</button>
                <a id="auth-bottom-btn" class="btn-light-red" href="/#/register">Register</a>
            </form>
        </section>
        `
    }
    , after_render: async () => {
        const log_btn = document.getElementById("login-btn");

        log_btn.addEventListener ("click",  () => {
            event.preventDefault();
            const email       = document.getElementById("email_input");
            const pass        = document.getElementById("pass_input");
            
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email.value, pass.value);
            promise
                .then(function(regUser){
                    window.location.href = '/#/';
                })
                .catch(e => alert(e.message));
            //document.location.href = "/#/";
        });
    }
}


export default Login;