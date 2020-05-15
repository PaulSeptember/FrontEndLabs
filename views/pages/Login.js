let Login = {

    render: async () => {
        return /*html*/ `
           
        <section class="auth-section">
        <div class="auth-backPage"></div>
            <form class="auth-form">
                <div class="auth-title">Authentication</div>
                <p class="auth-description">Your Yoptify is a tap away</p>
                <input class="auth-input" type="text" placeholder="Nickname" size="34">
                <input class="auth-input" type="password" placeholder="Password">
                <button id="login-btn" class="btn-red">Log in</button>
                <a id="auth-bottom-btn" class="btn-light-red" href="/#/register">Register</a>
            </form>
        </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        /*document.getElementById("register_submit_btn").addEventListener ("click",  () => {
            let email       = document.getElementById("email_input");
            let pass        = document.getElementById("pass_input");
            let repeatPass  = document.getElementById("repeat_pass_input");
            if (pass.value != repeatPass.value) {
                alert (`The passwords dont match`)
            } else if (email.value =='' | pass.value == '' | repeatPass == '') {
                alert (`The fields cannot be empty`)
            } 
            else {
                alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })*/
    }
}

export default Login;