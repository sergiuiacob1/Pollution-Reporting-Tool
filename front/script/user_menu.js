var isOpen = false;


$(document).ready(function () {
  if (localStorage.getItem("self") === null) {
    document.getElementById("user_slider_logged").style.display = "none";
    document.getElementById("user_slider").style.display = "block";
  } else {
    let object = {
      "email": JSON.parse(localStorage.getItem('self')).email,
      "password": JSON.parse(localStorage.getItem("self")).password
    };

    $.post(hostname + '/authenticate', JSON.stringify(object))
      .done((res, status) => {
        console.log(res);
        if (res.success === true) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("self", JSON.stringify(res.self));
          document.getElementById("user_slider").style.display = "none";
          document.getElementById("user_slider_logged").style.display = "block";
          document.getElementById("welcome-message").innerHTML = "Welcome, " + JSON.parse(localStorage.getItem("self")).name;
          //location.reload();
        } else {
          document.getElementById("user_slider_logged").style.display = "none";
          document.getElementById("user_slider").style.display = "block";
        }
      })
      .fail(() => {
        document.getElementById("user_slider_logged").style.display = "none";
        document.getElementById("user_slider").style.display = "block"
      });
  }

  let slider = document.getElementById("icon_slider");
  slider.onclick = openUserMenu;
});

function openUserMenu() {
  if (!isOpen) {
    document.getElementById("user_slider").style.transform = "translateX(250px)";
    document.getElementById("icon_slider").style.transform = "translateX(250px)";
    document.getElementById("user_slider_logged").style.transform = "translateX(250px)";
    isOpen = true;
  } else {
    document.getElementById("user_slider").style.transform = "translateX(-1px)";
    document.getElementById("user_slider_logged").style.transform = "translateX(-1px)";
    document.getElementById("icon_slider").style.transform = "translateX(-1px)";
    isOpen = false;
  }
}