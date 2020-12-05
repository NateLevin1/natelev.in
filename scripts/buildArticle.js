const fs = require('fs')
const path = require("path");
const marked = require("marked");
const prism = require("prismjs");
const loadLanguages = require('prismjs/components/');

let fileLocation = process.argv[2];
if(!fileLocation) {
    throw "No file specified";
}
if(fs.lstatSync(fileLocation).isDirectory()) {
    // use index.md
    fileLocation = path.normalize(fileLocation+"/index.md");
}
if(!fs.existsSync(fileLocation)) {
    throw "Input path is not a file or directory containing an index.md file. Instead found "+fileLocation;
}

const outIndex = process.argv.indexOf("--out");
let outFilePath;
if(outIndex !== -1) {
    outFilePath = process.argv[outIndex + 1]
}

// MARKED SETUP
let suggested = [];
let title = "";
let desc = "";
let issueLink = "https://github.com/UltimatePro-Grammer/natelev.in/issues";
const renderer = {
    heading(text, level, raw, slugger) {
        if(level === 1) {
            // the article title, style it as such
            title = text;
            return `
            <div class="article-title-bg">
                <h1 class="article-title" name="title">${text}</h1>
            </div>
            `;
        } else {
            // a subheading, style it as such
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            const uid = slugger.slug(escapedText);

            return `
            <h${level} name="${uid}">
                ${text}
            </h${level}>
            `
        }
    },
    paragraph(text) {
        if(text.startsWith("<img")) {
            // determines if the image is a header: headers are signified with the alt text starting with "HEADER|"
            const isHeader = text.match(/alt="HEADER\|([^"]+)"/);
            const [match, source, extension] = text.match(/src="([^".]+)\.(\w+)"/);
            if(isHeader) {
                // give it the special styles
                return `
                <div class="header-image-container">
                    <img src="${source}.${extension}" style="background-image: url(${source}-low.${extension});" alt="${isHeader[1]}" class="header-image lazy">
                </div>
                <div class="content"> ${/*This is the start of the content. It is closed at the end of the markdown.*/""}
                `
            } else {
                return `${text.slice(0, text.length - 1)} class="bleed lazy" style="background-image: url(${source}-low.${extension});">`
            }
        } else if(text.startsWith("SUGGESTED|")) {
            suggested = text.split("|").slice(1).map(str=>str.split("[t]"));
            return "";
        } else if(text.startsWith("ISSUE|")) {
            issueLink = issueLink + "/" + text.split("|")[1];
            return "";
        } else {
            // paragraph - don't need custom behavior
            if(!desc) {
                desc = text;
            }
            return `
            <p>${text}</p>
            `;
        }
    },
    code(code, lang) {
        let highlighted = code;
        if(lang === "js") {
            highlighted = prism.highlight(code, prism.languages.javascript, "javascript");
        } else if(lang === "wat" || lang === "wasm") {
            loadLanguages(["wasm"]);
            highlighted = prism.highlight(code, prism.languages.wasm, "wasm");
        } else if(lang === "css") {
            highlighted = prism.highlight(code, prism.languages.css, "css");
        } else if(lang === "html") {
            highlighted = prism.highlight(code, prism.languages.markup, "html");
        }
        // make links clickable
        highlighted = highlighted.replace(/(?:https?:\/\/)?(\w+)\.(\w+)(?:\/(.+))?/g, (link)=>`<a href="${link}" class="custom-color" target="_blank" rel="noopener noreferrer">${link}</a>`)
        return `<pre class="code"><code class="language-${lang}">${highlighted}</code></pre>`;
    }
};
marked.use({ renderer });

fs.readFile(fileLocation, 'utf8' , (err, markdown) => {
    if (err) {
        throw err;
    }
    const mdHTML = marked(markdown);
    let outHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="stylesheet" href="/css/header.css">
    <link rel="stylesheet" href="/css/article.css">
    <link rel="stylesheet" href="/css/links.css">
    <!-- Async-ly Loaded Code Block CSS -->
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
      media="print"
      onload="this.media='all'; this.onload=null;">
    <noscript>
        <link rel="stylesheet"
         href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css">

        <style>
            .lazy {
                filter: unset;
            }
        </style>
    </noscript>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital@0;1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;0,900;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <input type="checkbox" id="hamburger-check">
    <label for="hamburger-check" class="hamburger-container" role="button" aria-label="Open/Close navigation menu"><div class="hamburger"></div></label>
    <div class="open-hamburger">
        <div class="hamburger-content">
            <a href="/portfolio/" class="hamburger-link custom-color">portfolio</a>
            <a href="/articles/" class="hamburger-link custom-color">articles</a>
            <a href="/contact/" class="hamburger-link custom-color">contact</a>
        </div>
    </div>
    
    <h1 class="title"><a href="/" class="custom-color" style="text-decoration: unset;">nate levin</a></h1>
    <div class="red-bg"></div>

    <article class="main-article">
        ${mdHTML}
        <div class="torm">
                <h3>Talk about this article <a href="${issueLink}">on Github</a></h3>
                <span>or</span>
                <h3>Read more like this</h3>
        </div>
        </div> ${/*This is the 'content' div from the header image*/""}
        <div class="similar" id="similar">
${suggested.map(([path, title])=>{
                return `                    <article>
                    <a href="${path}" class="no-underline article-anchor">
                        <img src="${path}images/header.jpg" style="background-image: url(${path}images/header-low.jpg);" alt="Article thumbnail" class="similar-thumb lazy">
                        <h1 class="similar-title">${title}</h1>
                    </a>
                </article>`;
            }).join("\n")}
        </div>
        <div class="connect">
            <h2>Connect with me</h2>
            <div class="logos">
                <a href="/contact/" class="no-underline" aria-label="Contact">
                    <span class="iconify" data-inline="false" data-icon="ant-design:message-outlined"
                        style="color: #fb3640; font-size: 4.125em;"></span>
                </a>
                <a href="twitter" class="no-underline" aria-label="Twitter">
                    <span class="iconify" data-inline="false" data-icon="ant-design:twitter-circle-filled"
                        style="color: #1da1f2; font-size: 4.125em;"></span>
                </a>
                <a href="github" class="no-underline" aria-label="Github">
                    <span class="iconify" data-inline="false" data-icon="ant-design:github-filled"
                        style="color: black; font-size: 4.125em;"></span>
                </a>
            </div>
        </div>
    </article>
    <footer>
        <a href="#" class="back-to-top custom-color">back to top</a>
        <i class="copyright">© Nate Levin 2020</i>
    </footer>

    <!-- SCRIPTS -->
    <script src="/js/lazy-images.js" defer></script>
    <script src="/js/links.js" defer></script>
    <script src="https://code.iconify.design/1/1.0.6/iconify.min.js"></script>
</body>
</html>
    `;
    if(outFilePath) {
        // write to file
        fs.writeFile(outFilePath, outHTML, "utf8", (err)=>{
            if(err) throw err;
            console.log("Successfully wrote to file "+outFilePath+"\n");
        });
    } else {
        // write to stdout
        process.stdout.write(outHTML);
    }
});