window.addEventListener('scroll',reveal);

function reveal(){
    let value = window.scrollY;
    let mistl = document.querySelector('.mistl');
    let mistr = document.querySelector('.mistr');
    let dwarf = document.querySelector('.dwarf');
    let orc = document.querySelector('.orc');
    let piedra1 = document.querySelector('.piedra1');
    let piedra2 = document.querySelector('.piedra2');
    let titulo = document.querySelector('.title');
    let preorder = document.querySelector('.preorder');
    titulo.style.opacity = `${100 - (value * 0.3)}%`;
    preorder.style.opacity = `${100 - (value * 0.02)}%`;
    piedra1.style.transform = `translateX(-${value * 0.001}%)`;
    piedra2.style.transform = `translateX(${value * 0.004}%)`;
    mistl.style.transform = `translateY(${value * 0.04}%)`;
    mistr.style.transform = `translateY(${value * 0.05}%)`;
    dwarf.style.transform = `translateX(-${value * 0.009}%)`;
    orc.style.transform = `translateX(${value * 0.009}%)`;



    let reveals = document.querySelectorAll('.reveal');

    for(let i = 0; i < reveals.length; i ++){
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 0.65;

        if(revealTop < windowHeight * revealPoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }

    let features = document.querySelectorAll('.wrapfeature');
    let img = document.querySelector('.img-feature');
    let current;
    for (let i = 0; i < features.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = features[i].getBoundingClientRect().top;
        let revealBottom = features[i].getBoundingClientRect().bottom;
        let revealPoint = 0.5;

        if(revealTop < windowHeight * revealPoint && revealBottom > windowHeight * revealPoint){
            if(current != i){
                assignImg(i);
            }
        }
    }

    let container = document.querySelector('.container');
    let headline = document.querySelector('#headline');
    let countdown = document.querySelector('#countdown');
    let windowHeight = window.innerHeight;
    let revealTop = container.getBoundingClientRect().top;
    let revealPoint = 1;
    
    if(revealTop < windowHeight * revealPoint && (container.getBoundingClientRect().top - windowHeight / 2) > 0){
        countdown.style.transform = `translateY(${revealTop - windowHeight / 2}%)`;
        countdown.style.opacity = `${100 - (revealTop - windowHeight / 2) * 0.5}%`;
        headline.style.transform = `translateY(-${container.getBoundingClientRect().top - windowHeight / 2}%)`;
        headline.style.opacity = `${100 - (revealTop - windowHeight / 2) * 0.5}%`;
    }

    function assignImg(i){
        current = i;
        if(i == 0){
            img.src = "./images/feature1.png";
        }
        else if(i == 1){
            img.src = "./images/feature2.png";
        }
        else if(i == 2){
            img.src = "./images/feature3.png";
        }
    }
    
}

const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

release = 12 + "/" + 25 + "/" + 2022;
today = 11 + "/" + 24 + "/" + 2022;

const countDown = new Date(release).getTime(),
x = setInterval(function() {    

    const now = new Date().getTime(),
        distance = countDown - now;

    document.getElementById("days").innerText = Math.floor(distance / (day)),
    document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
    document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
    document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

    if (distance < 0) {
    clearInterval(x);
    }
}, 0)
