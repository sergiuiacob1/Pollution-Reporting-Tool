var isOpen=false;

function openUserMenu() {
  if(!isOpen)
  {
    document.getElementById("user_slider").style.transform = "translateX(250px)";
    document.getElementById("icon_slider").style.transform = "translateX(250px)";
    isOpen=true;
  }
  else {
    document.getElementById("user_slider").style.transform = "translateX(-1px)";
    document.getElementById("icon_slider").style.transform = "translateX(-1px)";
    isOpen=false;
  }

}
