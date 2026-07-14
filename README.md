# Ian Kelley - Professional Website

This is a complete professional website with resume and blog functionality.

## Features

- Responsive design based on the Forty template from HTML5 UP
- Complete resume content integrated into the site
- Blog system that allows adding entries by placing markdown files in a folder
- IISTA work description included as an example
- GitHub Pages ready for hosting

## Directory Structure

```
Website/
├── index.html              # Main landing page
├── resume-blog.html        # Complete resume content
├── resume-landing.html     # Introduction to resume section
├── blog-index.html         # Blog index page
├── blog/                   # Directory for markdown blog entries
│   └── iista-work.md       # Example IISTA work entry
├── assets/
│   ├── css/
│   │   ├── main.css        # Original template styles
│   │   ├── resume.css      # Custom resume styles
│   │   └── noscript.css    # Styles for no-JavaScript browsers
│   ├── js/
│   │   ├── blog-loader.js  # JavaScript for loading blog entries
│   │   └── main.js         # Original template JavaScript
│   └── images/             # Images used in the site
├── blog-convert.py         # Python script for converting markdown to HTML
├── blog-convert.sh         # Bash script for converting markdown to HTML
└── README.md               # This file
```

## How to Add Blog Entries

1. Create markdown files with your content (e.g., `my-entry.md`)
2. Place these files in the `blog/` directory
3. The system will automatically generate HTML pages for each entry
4. View your blog at `/blog-index.html`

### Markdown File Format

Markdown files should follow standard markdown syntax:
```markdown
# Entry Title

## Section Header

Content goes here with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2
- Bullet point 3

[Link text](http://example.com)
```

## Hosting via GitHub Pages

To host this website using GitHub Pages:

1. Create a new repository on GitHub
2. Push the contents of the Website directory to the repository
3. Enable GitHub Pages in repository settings (Settings > Pages)
4. Set the source to the main branch and root folder

## Customization

The site can be customized by:
- Modifying content in HTML files
- Adding new CSS styles in `assets/css/`
- Enhancing JavaScript functionality in `assets/js/`
- Creating new markdown files in the `blog/` directory

## Requirements

This website is designed to work with a static file system. For a production environment, you would typically need:
- A server-side processor (like Python, Node.js) to convert markdown to HTML
- Proper file permissions for the blog directory
- Optional: Additional tools like pandoc for enhanced markdown processing

The current implementation provides a foundation that can be extended with server-side processing capabilities.