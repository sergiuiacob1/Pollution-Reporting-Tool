var isOpen = false;

$(document).ready(function () {
  if(localStorage.getItem("token")){
    console.log('Setting logged mode');
    console.log(localStorage.getItem("token"));
      document.getElementById("user_slider_logged").classList.remove("invisible");
      document.getElementById("user_slider").classList.add("invisible");
  }
  else
  {
    console.log('Setting guest mode');
      document.getElementById("user_slider").classList.remove("invisible");
      document.getElementById("user_slider_logged").classList.add("invisible");
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