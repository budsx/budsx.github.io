// Get the markdown file from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const markdownFile = urlParams.get('post');

if (!markdownFile) {
    document.getElementById('postContent').innerHTML = '<p>Post not found. <a href="../index.html">Return to home</a></p>';
} else {
    // Fetch and render markdown file
    fetch(`../posts/${markdownFile}.md`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Post not found');
            }
            return response.text();
        })
        .then(markdown => {
            // Parse frontmatter if present
            const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
            const match = markdown.match(frontmatterRegex);
            
            let title = 'Blog Post';
            let date = '';
            let content = markdown;
            
            if (match) {
                // Parse frontmatter
                const frontmatter = match[1];
                content = match[2];
                
                const titleMatch = frontmatter.match(/title:\s*(.+)/);
                const dateMatch = frontmatter.match(/date:\s*(.+)/);
                
                if (titleMatch) title = titleMatch[1].trim();
                if (dateMatch) date = dateMatch[1].trim();
            } else {
                // Try to extract title from first heading
                const titleMatch = markdown.match(/^#\s+(.+)$/m);
                if (titleMatch) {
                    title = titleMatch[1];
                    content = markdown.replace(/^#\s+.+$/m, '');
                }
            }
            
            // Update page title
            document.getElementById('pageTitle').textContent = `${title} - Backend Engineer Blog`;
            document.getElementById('postTitle').textContent = title;
            
            // Format and display date
            if (date) {
                const dateObj = new Date(date);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('postDate').textContent = `Published on ${formattedDate}`;
            } else {
                document.getElementById('postDate').style.display = 'none';
            }
            
            // Render markdown to HTML
            const html = marked.parse(content);
            document.getElementById('postContent').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('postContent').innerHTML = 
                `<p>Error loading post: ${error.message}. <a href="../index.html">Return to home</a></p>`;
        });
}

