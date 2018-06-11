var hostname = "http://localhost:3000";

$(document).ready(function () {
    let btnLogIn = document.getElementById("register-button");
    btnLogIn.onclick = register;
});

function register() {
    let email = document.getElementById("input_form_email");
    let name = document.getElementById("input_form_name");
    let surname = document.getElementById("input_form_surname");
    let password = document.getElementById("input_form_password");

    let object = {
        email: email.value,
        name: name.value,
        surname: surname.value,
        password: password.value
    };
    console.log('Sending request from front : ');
    console.log(object);


    $.post(hostname + '/register', JSON.stringify(object))
        .done(function (res, status) {
            console.log(res);

            if (res.success === true) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("self", JSON.stringify(res.self));
                window.location.replace("http://91.92.128.27/front/pages/map.html");
            } else {
                alert("Error signing up!");
            }
        });

}