const ign = document.getElementById("mc-username");
const invalidIgn = document.getElementById("mc-username-invalid");
const disc = document.getElementById("disc-tag");
const invalidDisc = document.getElementById("disc-tag-invalid");
const checkout = document.getElementById("checkout");
const ignImage = document.getElementById("mc-username-img");
const customPreviewName = document.getElementById("custom-preview-name");
const customTag = document.getElementById("custom-tag");

checkout.onclick = (event) => {
    if (customTag && customTag.value === "") {
        if (
            !confirm(
                "\u26A0 WARNING: You have not set a custom tag. \u26A0\n\nIf you continue, your tag will be [CUSTOM] instead of an actual custom value.\n\nContinue?"
            )
        ) {
            event.preventDefault();
        }
    }

    event.preventDefault();
    alert("This feature has been disabled in the archive.");
};

function checkIgn() {
    if (validIgn.test(ign.value)) {
        invalidIgn.style.display = "none";
        return true;
    } else {
        invalidIgn.style.display = "block";
        return false;
    }
}

const validCustom = /^\w{2,8}$/;
const invalidCustom = document.getElementById("custom-tag-invalid");
function checkCustom() {
    if (customTag) {
        if (validCustom.test(customTag.value || "custom")) {
            invalidCustom.style.display = "none";
            return true;
        } else {
            invalidCustom.style.display = "block";
            return false;
        }
    } else {
        return true;
    }
}

function checkDisc() {
    if (disc.value == "") return true; // optional
    if (validDiscRegex.test(disc.value)) {
        invalidDisc.style.display = "none";
        return true;
    } else {
        invalidDisc.style.display = "block";
        return false;
    }
}

function checkAll() {
    if (checkIgn() && checkCustom() && checkDisc()) {
        checkout.disabled = false;
        return true;
    } else {
        checkout.disabled = true;
        return false;
    }
}

const validIgn = /^[a-zA-Z0-9_]{2,16}$/;
ign.onblur = () => checkAll();

const validDiscRegex = /^.{3,32}#[0-9]{4}$/;
disc.onblur = () => checkAll();

ign.oninput = () => {
    if (!validIgn.test(ign.value)) {
        ignImage.style.display = "none";
    } else {
        ignImage.style.display = "block";
        ignImage.src = `https://minotar.net/helm/${ign.value}/32.png`;
    }

    if (customPreviewName) {
        if (ign.value.length == 0) {
            customPreviewName.textContent = "Username";
        } else {
            customPreviewName.textContent = ign.value;
        }
    }
};

if (customTag) {
    customTag.onblur = () => checkAll();
    // preview stuff
    const customTagBg = document.getElementById("custom-tag-bg");
    customTagBg.onclick = () => customTag.focus();
    const shortCharRegex = /i/gi;
    const notValid = /\W/;
    customTag.oninput = () => {
        const len = customTag.value.length;
        if (len > 8) {
            customTag.value = customTag.value.substring(0, 8);
            return;
        }
        if (len == 0) {
            // placeholder
            customTag.style.width = `calc(6ch + 0.2rem)`;
        } else {
            let betterLength =
                len -
                (customTag.value.match(shortCharRegex) || []).length * 0.35;
            customTag.style.width = `calc(${betterLength}ch + 0.4rem)`;
        }
        document.title = `Buy a [${
            customTag.value.toUpperCase() || "CUSTOM"
        }] Rank | BridgePractice.net Store`;
    };
    customTag.onkeydown = (event) => {
        if (notValid.test(event.key)) {
            event.preventDefault();
        }
    };

    // color picker stuff
    const current = document.getElementById("current-color");
    const choices = document.getElementById("color-choices");
    const customColor = document.getElementById("custom-color");
    const previewEl = document.getElementById("custom-tag-bg");
    const removeOnClick = () => {
        document.addEventListener(
            "click",
            (event) => {
                if (!event.target.classList.contains("color-option")) {
                    choices.style.display = "none";
                }
            },
            { once: true }
        );
    };
    current.onclick = (event) => {
        if (choices.style.display === "none") {
            choices.style.display = "block";
            event.stopPropagation();
            removeOnClick();
        } else {
            choices.style.display = "none";
        }
    };
    for (const colorEl of document.querySelectorAll(".color-option")) {
        const color = colorEl.style.backgroundColor;
        const colorName = colorEl.id;
        colorEl.onclick = (event) => {
            customColor.value = colorName;
            current.style.backgroundColor = color;
            previewEl.style.color = color;
            event.stopPropagation();
            removeOnClick();
        };
    }

    // months stuff
    const price = document.getElementById("price");
    const monthsText = document.getElementById("months-text");
    const months = document.getElementById("months");
    const prices = {
        1: 5,
        3: 10,
        6: 20,
        12: 35,
    };
    months.oninput = () => {
        price.innerText = `$${prices[months.value]}`;
        monthsText.innerText = `(${months.value} month${
            months.value == "1" ? "" : "s"
        })`;
    };
}
