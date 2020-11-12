const slides = document.getElementsByClassName("slide");
const timeouts = new Array(slides.length);
const bar = document.getElementById("loading-bar");
let curSlide = 0;

const isVisible = (elm)=>{
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

const showCorrectSlide = (goForwards=true)=>{
    bar.style.animation = "";
    void bar.offsetWidth;
    bar.style.animation = `load 2.5s ${Math.random() > 0.5 ? "cubic-bezier(.21,.55,.86,.89)" : "cubic-bezier(1,.03,.81,1.03)"}`;
    Array.from(slides).forEach((element, index)=> {
        if(index === curSlide) {
            if(goForwards) {
                element.style.animation = "slide-left-from-right 2s";
            } else {
                element.style.animation = "slide-right-from-left 2s";
            }
            element.style.display = "block";
        } else {
            if(goForwards && index == (curSlide - 1 < 0 ? slides.length - 1 : curSlide - 1)) {
                element.style.animation = "slide-left-from-middle 2.1s";
                if(timeouts[index]) {
                    clearTimeout(timeouts[index]);
                }
                timeouts[index] = setTimeout(()=>{
                    if(curSlide !== index) {
                        element.style.display = "none";
                    }
                }, 2000);
            } else if(!goForwards && index == (curSlide + 1 > slides.length - 1 ? 0 : curSlide + 1)) {
                element.style.animation = "slide-right-from-middle 2.1s";
                if(timeouts[index]) {
                    clearTimeout(timeouts[index]);
                }
                timeouts[index] = setTimeout(()=>{
                    if(curSlide !== index) {
                        element.style.display = "none";
                    }
                }, 2000);
            } else {
                element.style.display = "none";
            }
            
        }
    });
}

// so that not having javascript still works
Array.from(slides).forEach((element)=>element.style.display = "block");

showCorrectSlide();

const checkCurSlide = ()=>{
    if(curSlide > slides.length - 1) {
        curSlide = 0;
    } else if(curSlide < 0) {
        curSlide = slides.length - 1;
    }
}
const intervalFunc = ()=>{
    if(isVisible(bar)) {
        curSlide++;
        checkCurSlide();
        showCorrectSlide();
    }
}
let interval = setInterval(intervalFunc, 8000);



// right and left buttons
const right = document.getElementById("browser-right");
const left = document.getElementById("browser-left");

right.onclick = ()=>{
    curSlide++;
    checkCurSlide();
    showCorrectSlide();
    clearInterval(interval);
    interval = setInterval(intervalFunc, 8000);
}
left.onclick = ()=>{
    curSlide--;
    checkCurSlide();
    showCorrectSlide(false);
    clearInterval(interval);
    interval = setInterval(intervalFunc, 8000);
}