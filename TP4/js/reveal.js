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