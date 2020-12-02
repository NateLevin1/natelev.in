const removeFilter = function () {
    this.style.filter = "none";
}

const images = Array.from(document.getElementsByTagName("img"));
images.forEach((image)=>{
    if(image.classList.contains("lazy")) {
        image.onload = removeFilter;
        if(image.complete && image.naturalHeight !== 0) {
            // the image was loaded before DOMContentLoaded.
            // very rare on real internet, but happens during development
            removeFilter.bind(image)();
        }
    }
});