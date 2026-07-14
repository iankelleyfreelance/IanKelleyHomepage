// Blog Manager - Drag and Drop Markdown File Handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize drag and drop functionality for blog management
    const dropArea = document.getElementById('main') || document.querySelector('.resume-content');
    
    if (dropArea) {
        // Add drag events to the main content area
        dropArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.classList.add('drag-over');
        });
        
        dropArea.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        dropArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            // Handle dropped files
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleDroppedFiles(files);
            }
        });
    }
    
    // Handle dropped markdown files
    function handleDroppedFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const content = e.target.result;
                    addBlogEntry(content, file.name);
                };
                reader.readAsText(file);
            }
        }
    }
    
    // Add a new blog entry from markdown content
    function addBlogEntry(markdownContent, fileName) {
        // Create a new section for the blog entry
        const blogSection = document.createElement('section');
        blogSection.className = 'blog-entry';
        blogSection.innerHTML = `
            <div class="inner">
                <header class="major">
                    <h2>${fileName.replace('.md', '').replace('.markdown', '')}</h2>
                </header>
                <div class="blog-content">${convertMarkdownToHtml(markdownContent)}</div>
            </div>
        `;
        
        // Add to the resume content
        const resumeContent = document.querySelector('.resume-content .inner');
        if (resumeContent) {
            resumeContent.appendChild(blogSection);
            
            // Add a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = `Successfully added blog entry: ${fileName}`;
            successMessage.style.cssText = 'padding: 15px; margin: 10px 0; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px;';
            
            // Insert after the header
            const header = resumeContent.querySelector('header');
            if (header) {
                header.parentNode.insertBefore(successMessage, header.nextSibling);
            }
        }
    }
    
    // Simple markdown to HTML converter (basic implementation)
    function convertMarkdownToHtml(markdown) {
        // Convert basic markdown elements to HTML
        let html = markdown;
        
        // Convert headers (# Header -> <h1>Header</h1>)
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
    }
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Resume';
    printButton.className = 'button primary fit';
    printButton.style.marginTop = '20px';
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add print button to the resume content
    const resumeHeader = document.querySelector('.resume-content header');
    if (resumeHeader) {
        resumeHeader.appendChild(printButton);
    }
    
    // Make existing sections draggable for reordering
    const resumeSections = document.querySelectorAll('.resume-content section, .resume-content .job, .resume-content .program, .resume-content .project');
    
    resumeSections.forEach(section => {
        section.setAttribute('draggable', 'true');
        section.style.cursor = 'move';
        
        section.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.outerHTML);
            this.classList.add('dragging');
        });
        
        section.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Allow dropping to reorder sections
    const resumeContent = document.querySelector('.resume-content .inner');
    if (resumeContent) {
        resumeContent.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        resumeContent.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggedElement = document.querySelector('.dragging');
            
            if (draggedElement && draggedElement !== this) {
                // Insert the dragged element at the drop position
                this.insertBefore(draggedElement, e.target);
            }
        });
    }
});