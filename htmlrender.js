const editor = document.getElementById("editor");
const output = document.getElementById("output");

function renderMarkdown() {
    const rawMarkdown = editor.value;
    const html = marked.parse(rawMarkdown, {
        breaks: true,
        highlight: function (code, lang) {
            const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language: validLang }).value;
        }
    });

    output.innerHTML = html;

    // Render LaTeX
    renderMathInElement(output, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
        ],
        throwOnError: false
    });
    hljs.highlightAll();
}

editor.addEventListener('input', renderMarkdown);
window.addEventListener('load', renderMarkdown);