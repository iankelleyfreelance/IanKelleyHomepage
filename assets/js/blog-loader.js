// Blog Loader - Loads markdown files from blog directory
document.addEventListener('DOMContentLoaded', function() {
    // Function to load and display blog entries
    function loadBlogEntries() {
        const blogEntriesContainer = document.getElementById('blog-entries');
        
        if (!blogEntriesContainer) {
            console.error('Blog entries container not found');
            return;
        }
        
        // Show loading message
        blogEntriesContainer.innerHTML = '<p class="no-entries">Loading blog entries...</p>';
        
        // In a real implementation, this would make an AJAX call to get the list of files
        // Since we're in a static environment, we'll simulate this behavior
        
        // For demonstration, let's create some sample content
        setTimeout(function() {
            // Simulate loading from blog directory
            const sampleEntries = [
                {
                    title: "My First Blog Post",
                    date: "2025-01-15",
                    excerpt: "This is the beginning of my blog journey where I'll be sharing my thoughts and experiences...",
                    filename: "first-post.md"
                },
                {
                    title: "Learning Web Development",
                    date: "2025-02-20", 
                    excerpt: "Exploring new technologies and frameworks for web development...",
                    filename: "web-dev-notes.md"
                },
                {
                    title: "IISTA Work Experience",
                    date: "2025-03-10",
                    excerpt: "Details about my experience working with IISTA and the projects I've been involved in...",
                    filename: "iista-work.md"
                }
            ];
            
            if (sampleEntries.length > 0) {
                blogEntriesContainer.innerHTML = '';
                
                sampleEntries.forEach(entry => {
                    const entryElement = document.createElement('section');
                    entryElement.className = 'blog-entry';
                    entryElement.innerHTML = `
                        <div class="inner">
                            <header class="major">
                                <h2>${entry.title}</h2>
                                <p class="post-date">${entry.date}</p>
                            </header>
                            <div class="blog-content">
                                <p>${entry.excerpt}</p>
                                <a href="blog/${entry.filename.replace('.md', '.html')}" class="button primary fit">Read More</a>
                            </div>
                        </div>
                    `;
                    blogEntriesContainer.appendChild(entryElement);
                });
            } else {
                blogEntriesContainer.innerHTML = '<p class="no-entries">No blog entries found. Place markdown files in the <code>blog/</code> directory to see them here.</p>';
            }
        }, 500);
    }
    
    // Load blog entries when page loads
    loadBlogEntries();
    
    // Add a simple function to convert markdown content to HTML (for demonstration)
    window.convertMarkdownToHtml = function(markdownContent) {
        let html = markdownContent;
        
        // Basic markdown to HTML conversion
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        
        // Convert bullet lists
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(\n<li>.*<\/li>)+/gs, function(match) {
            return '<ul>' + match + '</ul>';
        });
        
        // Convert paragraphs (newlines become <br>)
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/^/gm, '<p>');
        html = html.replace(/$/gm, '</p>');
        
        return html;
    };
});