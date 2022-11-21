window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
    document.getElementById("header").style.height = "50px";
    document.getElementById("logo").style.fontSize = "13px";
  } else {
    document.getElementById("header").style.height = "60px";
    document.getElementById("logo").style.fontSize = "16px";
  }
}


const menu = document.querySelector(".menu");
const l1 = document.querySelector(".l1");
const l2 = document.querySelector(".l2");
const l3 = document.querySelector(".l3");
const loader = document.querySelector(".loader-wrapper");
const numero = document.querySelector(".contador");

menu.addEventListener("click", function () {
  document.querySelector(".nav-menu").classList.toggle("mostrar");
  if(l1.className == "l1-close"){
    l1.className = "l1-open";
    l2.className = "l2-open";
    l3.className = "l3-open";
  }else if(l1.className == "l1-open"){
    l1.className = "l1-close";
    l2.className = "l2-close";
    l3.className = "l3-close";
  }else{
    l1.className = "l1-open";
    l2.className = "l2-open";
    l3.className = "l3-open";
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
