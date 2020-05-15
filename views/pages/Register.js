let Register = {

    render: async () => {
        return /*html*/ `
            <section class="auth-section">
        <div class="auth-backPage"></div>
        <form class="auth-form">
            <div class="auth-title">Registration</div>
            <p class="auth-description">One simple step to Yoptify! </p>
            <input id="email_input" class="auth-input" type="text" placeholder="Nickname" size="34">
            <input id="pass_input" class="auth-input" type="password" placeholder="Password">
            <input id="repeat_pass_input" class="auth-input" type="password" placeholder="Repeat">
            <button id="login-btn" class="btn-red">Register</button>
        </form>
    </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("login-btn").addEventListener ("click",  () => {
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
        })
    }
}

export default Register;