window.addEventListener('scroll',reveal);

function reveal(){
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
    let img = document.querySelector('.image-placeholder');
    console.log(features);
    let current;
    for (let i = 0; i < features.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = features[i].getBoundingClientRect().top;
        let revealPoint = 0.5;

        if(revealTop < windowHeight * revealPoint){
            features[i].style.backgroundColor = "red";
            console.log("image " + i)
        }
        else{
            features[i].style.backgroundColor = "blue";
        }
    }

    function assignImg(i){
        current = i;
    }
}