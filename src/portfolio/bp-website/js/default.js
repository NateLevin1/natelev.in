const el = document.createElement("div");
el.style.cssText =
    "background-color: #000000; color: #ffffff; padding: 0.7rem 1rem; text-align: center; z-index: 9999; position: fixed; bottom: 0; width: 100%; opacity: 0; text-wrap: pretty;";
el.innerHTML = `<p style="max-width: 40rem; margin: 0 auto;">You are viewing an archive of the BridgePractice website as it looked in early 2023, under Nate Levin's ownership ('21-23). Some features may not work as expected.</p><p style="margin: 0.5rem 0;"><a href="/portfolio/" style="color: white;">&larr; Back to Portfolio</a></p>`;
document.body.prepend(el);
el.animate([{ opacity: 0, transform: "translateY(3vh)" }, { opacity: 0.8 }], {
    duration: 500,
    delay: 400,
    fill: "forwards",
    easing: "ease-out",
});
el.animate([{ opacity: 0.8 }, { opacity: 0, transform: "translateY(3vh)" }], {
    duration: 500,
    delay: 7000,
    fill: "forwards",
    easing: "ease-out",
});

setTimeout(() => {
    el.remove();
}, 8000);
