async function downloadHTML() {
    const filename = prompt("Enter filename:", "preview.html");
    if (!filename) return;

    try {
      // Fetch the template HTML from the URL
      const response = await fetch('template.html');
      if (!response.ok) throw new Error('Failed to load template.');

      const templateContent = await response.text();

      // Replace placeholders in the template with the rendered HTML content from the preview
      const modifiedTemplate = templateContent
        .replace('{{FILENAME}}', filename)
        .replace('{{CONTENT}}', output.innerHTML); // Inject the already rendered HTML from the preview

      // Create a Blob with the modified HTML content
      const blob = new Blob([modifiedTemplate], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.endsWith(".html") ? filename : filename + ".html";
      a.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      alert('Error fetching template: ' + error.message);
    }
  }