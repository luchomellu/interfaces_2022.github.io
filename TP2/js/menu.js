const menu = document.querySelector(".hamburguesa");
const loader = document.querySelector(".loader-wrapper");
const numero = document.querySelector(".contador");

menu.addEventListener("click", function () {
  document.querySelector(".nav-menu").classList.toggle("mostrar");
  if(menu.className == "hamburguesa fa-solid fa-3x fa-bars"){
    menu.className = "hamburguesa fa-solid fa-3x fa-x";
  }
  else if(menu.className == "hamburguesa fa-solid fa-3x fa-x"){
    console.log("entre lo q no anda")
    menu.className = "hamburguesa fa-solid fa-3x fa-bars";
  }
});

window.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => { loader.classList.add("loader-hidden");}, 5000);
  let progreso = 0;
  var id = setInterval(contador, 40);
  function contador() {
    if(progreso == 100){
      clearInterval(id);
    }else{
      progreso++;
      numero.innerHTML = progreso  + "%";
      //console.log(progreso);
    }
  }
  });
