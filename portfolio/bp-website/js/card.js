let currentContent = 0;
const updateContent = () => {
    for (var i = 0; i < cards.length; i++) {
        if (i == currentContent) {
            cards[i].content.style.display = "";
            dots[i].classList.add("dot-selected");
            title.textContent = cards[i].title;
        } else {
            cards[i].content.style.display = "none";
            dots[i].classList.remove("dot-selected");
        }
    }
};

const title = document.getElementById("card-title");
const dots = [
    document.getElementById("dot-1"),
    document.getElementById("dot-2"),
    document.getElementById("dot-3"),
];
const cards = [
    {
        title: "For the community, by the community",
        content: document.getElementById("invite"),
    },
    {
        title: "4 new gamemodes, unseen elsewhere",
        content: document.getElementById("gamemodes"),
    },
    {
        title: "Over 115,000 unique players",
        content: document.getElementById("players"),
    },
];

dots.forEach(
    (el, i) =>
        (el.onclick = () => {
            currentContent = i;
            updateContent();
        })
);

setInterval(() => {
    currentContent++;
    if (currentContent >= cards.length) {
        currentContent = 0;
    }
    updateContent();
}, 15000);
