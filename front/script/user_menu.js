var isOpen = false;


$(document).ready(function () {
  if(localStorage.getItem("token") === null){
    console.log(localStorage.getItem("token"));
      document.getElementById("user_slider_logged").style.display = "none";
      document.getElementById("user_slider").style.display = "block";
  }
  else
  {
      document.getElementById("user_slider").style.display = "none";
      document.getElementById("user_slider_logged").style.display = "block";
      document.getElementById("welcome-message").innerHTML = "Welcome, " + JSON.parse(localStorage.getItem("self")).name;
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