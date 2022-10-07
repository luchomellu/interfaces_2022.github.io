const menu = document.querySelector(".fa-bars");
const loader = document.querySelector(".loader-wrapper");

menu.addEventListener("click", function () {
  document.querySelector(".nav-menu").classList.toggle("mostrar");
});

window.addEventListener("DOMContentLoaded", function () {
  //loader.classList.add("loader-hidden");
  //loader.addEventListener("transitionend", () =>{
  //  this.document.body.removeChild("loader-wrapper");
  
  });

  setTimeout(() => { loader.classList.add("loader-hidden");}, 4000);
//target.addEventListener('click', () => target.style.opacity = '0');
// If you want to remove it from the page after the fadeout
//target.addEventListener('transitionend', () => target.remove());