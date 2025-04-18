const editor = document.getElementById("editor");
const output = document.getElementById("output");
// Function to process the raw Markdown before converting it to HTML
function processMarkdownForKaTeX(rawMarkdown) {
    // Step 1: Convert inline $$...$$ (same-line) math to $...$
    rawMarkdown = rawMarkdown.replace(/([^\n])\$\$(.+?)\$\$/g, (_, before, expr) => {
      return `${before} $${expr}$`; // Inline math: use single dollar
    });
  
    // Step 2: Convert multi-line $$...$$ to a single-line $$...$$ block
    rawMarkdown = rawMarkdown.replace(/\$\$([\s\S]+?)\$\$/gm, (_, expr) => {
      const singleLineExpr = expr.replace(/\n/g, ' ').trim(); // Replace newlines inside $$ with spaces
      return `$$${singleLineExpr}$$`; // Wrap in $$ again
    });
  
    // Step 3: Convert \[...\] block formulas into single-line \\[ ... \\]
    rawMarkdown = rawMarkdown.replace(/\\\[(.+?)\\\]/gms, (_, expr) => {
      const singleLineExpr = expr.replace(/\n/g, ' ').trim();
      return `\\\\[ ${singleLineExpr} \\\\]`; // Wrap in escaped brackets
    });
  
    // Step 4: Convert \( ... \) inline formulas into \\( ... \\)
    rawMarkdown = rawMarkdown.replace(/\\\((.+?)\\\)/g, (_, expr) => {
      return `\\\\( ${expr.trim()} \\\\)`; // Wrap in escaped inline math brackets
    });
  
    return rawMarkdown; // Return cleaned-up markdown for math rendering
  }
  
  // Function to render the processed Markdown
  function renderMarkdown() {
    let rawMarkdown = editor.value; // Get input from textarea or editor
  
    // Clean and process math expressions before rendering
    rawMarkdown = processMarkdownForKaTeX(rawMarkdown);
  
    // Parse Markdown into HTML using marked
    const html = marked.parse(rawMarkdown, {
      breaks: true, // Convert single newlines into <br>
      highlight: function (code, lang) {
        const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language: validLang }).value;
      },
    });
  
    // Inject parsed HTML into output container
    output.innerHTML = html;
  
    // Render all math expressions in the output using KaTeX
    renderMathInElement(output, {
      delimiters: [
        { left: "$$", right: "$$", display: true },     // For block math
        { left: "\\[", right: "\\]", display: true },   // Alternate block syntax
        { left: "$", right: "$", display: false },      // Inline math
        { left: "\\(", right: "\\)", display: false },  // Alternate inline
      ],
      throwOnError: false // Prevent KaTeX from throwing on syntax errors
    });
  
    // Highlight code blocks
    hljs.highlightAll();
  }
  
  // Event listeners to trigger rendering
  editor.addEventListener("input", renderMarkdown); // When typing in editor
  window.addEventListener("load", renderMarkdown);  // On initial page load
