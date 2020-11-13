(function() {
const waitTime = 20;

const minPropagateTime = 150;

const clear = (children, enterEvent, event)=>{
    if(event.timeStamp - enterEvent.timeStamp > minPropagateTime) {
        shockwave(children, "", enterEvent);
    } else {
        setTimeout(()=>{
            shockwave(children, "", enterEvent);
        }, minPropagateTime - (event.timeStamp - enterEvent.timeStamp));
    }
};

const shockwave = (children, color, event)=>{
    let mousedElement = document.elementFromPoint(event.clientX, event.clientY);

    // forward
    window.requestAnimationFrame(async ()=>{
        for(var index = children.indexOf(mousedElement); index < children.length; index++) {
            let child = children[index];
            if(child) {
                if(child.innerText === " " && isSafari) { // safari doesn't underline spaces
                    if(color) {
                        child.style.backgroundImage = `linear-gradient(to bottom, ${color} 33%, transparent 33%)`
                    } else {
                        child.style.backgroundImage = "";
                    }
                } else {
                    child.style.textDecorationColor = color;
                }
            }
            await waitForMS(waitTime);
        }
    });
    // backward
    window.requestAnimationFrame(async ()=>{
        for(var index = children.indexOf(mousedElement); index >= 0; index--) {
            let child = children[index];
            if(child) {
                if(child.innerText === " " && isSafari) { // safari doesn't underline spaces
                    if(color) {
                        child.style.backgroundImage = `linear-gradient(to bottom, ${color} 33%, transparent 33%)`
                    } else {
                        child.style.backgroundImage = "";
                    }
                } else {
                    child.style.textDecorationColor = color;
                }
            }
            await waitForMS(waitTime);
        }
    });
    
}
const waitForMS = ms => new Promise((resolve)=> setTimeout(resolve, ms));

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const links = document.getElementsByTagName("a");
Array.from(links).forEach((element)=>{
    if(!element.classList.contains("no-underline")) {
        element.style.color = "";
        element.style.textDecoration = "none";
        // we split the tag into spans by letter so we can give each letter a different color
        element.innerHTML = `<span class=\"ud\">${element.innerHTML.split("").join("</span><span class=\"ud\">")}</span>`
        
        const children = Array.from(element.children);
        let enterEvent;
        element.onmouseenter = (event)=>{shockwave(children, "var(--accent)", event); enterEvent = event; };
        element.onmouseleave = (event)=>clear(children, enterEvent, event);
        element.onclick = (event)=>clear(children, enterEvent, event);
        element.onmousedown = (event)=>shockwave(children, "var(--accent-2)", event);
    }
});


})()