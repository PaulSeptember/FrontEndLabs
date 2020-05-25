import * as DBGet from './../../services/DBGet.js'

let Register = {

    render: async () => {
        return /*html*/ `
            <section class="auth-section">
        <div class="auth-backPage"></div>
        <form class="auth-form">
            <div class="auth-title">Registration</div>
            <p class="auth-description">One simple step to Yoptify! </p>
            <input id="email_input" class="auth-input" type="text" placeholder="Email" size="34">
            <input id="pass_input" class="auth-input" type="password" placeholder="Password">
            <input id="repeat_pass_input" class="auth-input" type="password" placeholder="Repeat">
            <button id="login-btn" class="btn-red">Register</button>
        </form>
    </section>
        `
    }
    , after_render: async () => {

        document.getElementById("login-btn").addEventListener ("click",  () => {
            event.preventDefault();
            const email       = document.getElementById("email_input");
            const pass        = document.getElementById("pass_input");
            const repeatPass  = document.getElementById("repeat_pass_input");

            if (pass.value != repeatPass.value) {
                alert (`The passwords dont match`)
            } else if (email.value =='' | pass.value == '' | repeatPass == '') {
                alert (`The fields cannot be empty`)
            } else {
                const auth = firebase.auth();
                const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
                promise
                    .then(async function(regUser){
                        let lastUser = await DBGet.getUserId();
                        firebase.database().ref("/play_queue/" + lastUser + "/user").set(email);

                        firebase.database().ref('/song_pic_id/id').set(lastUser + 1);

                        window.location.href = '/#/';
                    })
                    .catch(alert(e.message));
            }    
        })
    }
}

export default Register;