window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 355 ||
    document.documentElement.scrollTop > 355
  ) {
    document.getElementById("navlogo").style.display = "";
    // document.getElementById("navlogo").style.transform = "scale(0.5)";
  } else {
    document.getElementById("navlogo").style.display = "none";
    // document.getElementById("navlogo").style.transform = "none";
  }
}

function hideLogo() {
  document.getElementById("logo").style.display = "none";
}
function showLogo() {
  document.getElementById("logo").style.display = "block";
}
