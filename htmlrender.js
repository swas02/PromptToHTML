const editor = document.getElementById("editor");
const output = document.getElementById("output");

// Function to process the raw Markdown text before rendering
function processMarkdownForKaTeX(rawMarkdown) {
    // Step 1: Handle inline $$...$$ math and convert them to $...$
    // This finds $$...$$ on the same line and converts it to inline $...$
    rawMarkdown = rawMarkdown.replace(/([^\n])\$\$(.+?)\$\$/g, (_, before, expr) => {
      return `${before} $${expr}$`;  // Convert multi-line $$...$$ to inline $...$
    });
  
    // Step 2: Handle multi-line $$...$$ and convert them to single-line $$...$$
    // This finds $$...$$ formulas that span multiple lines and joins them into one line
    rawMarkdown = rawMarkdown.replace(/^\$\$(.+?)\$\$$/gms, (_, expr) => {
      // Join content into a single line, replacing newlines with spaces and trimming excess whitespace
      const singleLineExpr = expr.replace(/\n/g, ' ').trim();
      return `$$${singleLineExpr}$$`; // Return the single-line $$...$$ formula
    });
  
    // Step 3: Replace block \[...\] formulas with single-line \\[...\] format
    // This replaces any block math notation (spanning multiple lines) with single-line \\[...\]
    rawMarkdown = rawMarkdown.replace(/\\\[(.+?)\\\]/gms, (_, expr) => {
      // Join multi-line content into a single line, replacing newlines with spaces
      const singleLineExpr = expr.replace(/\n/g, ' ').trim();
      return `\\\\[ ${singleLineExpr} \\\\]`; // Return a single-line block formula \\[ ... \\]
    });
  
    // Step 4: Replace inline \( ... \) formulas with \\( ... \\)
    // This converts inline formulas wrapped in \( ... \) to \\( ... \\)
    rawMarkdown = rawMarkdown.replace(/\\\((.+?)\\\)/g, (_, expr) => {
      return `\\\\( ${expr} \\\\)`; // Convert \( ... \) to \\( ... \\) for inline math
    });
  
    return rawMarkdown; // Return the processed markdown text
  }
  
  // Function to render the processed Markdown into HTML and render math with KaTeX
  function renderMarkdown() {
    let rawMarkdown = editor.value; // Get the raw markdown text from the editor
  
    // Step 1: Process the raw markdown to handle the $$...$$, \( ... \), and \[...\] properly
    rawMarkdown = processMarkdownForKaTeX(rawMarkdown);
  
    // Step 2: Convert the processed Markdown to HTML using the marked library
    const html = marked.parse(rawMarkdown, {
      breaks: true, // Allow line breaks to be converted to <br> tags
      highlight: function (code, lang) {
        const validLang = hljs.getLanguage(lang) ? lang : "plaintext"; // Check if the language is valid
        return hljs.highlight(code, { language: validLang }).value; // Highlight the code block if valid
      },
    });
  
    // Step 3: Insert the converted HTML into the output container
    output.innerHTML = html;
  
    // Step 4: Use KaTeX to render the math expressions (both inline and block) inside the output HTML
    renderMathInElement(output, {
      delimiters: [
        { left: "$$", right: "$$", display: true },  // For block formulas (display style)
        { left: "\\[", right: "\\]", display: true }, // For block formulas (display style)
        { left: "$", right: "$", display: false },   // For inline formulas
        { left: "\\(", right: "\\)", display: false } // For inline formulas
      ],
      throwOnError: false  // Don't throw errors if a math formula is invalid
    });
  
    // Step 5: Highlight any code blocks using Highlight.js (optional, for syntax highlighting)
    hljs.highlightAll();
  }
  

  editor.addEventListener("input", renderMarkdown);
  window.addEventListener("load", renderMarkdown);
  
