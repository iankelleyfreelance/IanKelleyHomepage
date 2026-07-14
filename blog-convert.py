#!/usr/bin/env python3
"""
Simple markdown to HTML converter for blog entries.
This script would typically be run by a server-side process,
but can also be used manually to convert markdown files.
"""

import os
import re
import sys
from pathlib import Path

def convert_markdown_to_html(markdown_content, filename):
    """
    Convert markdown content to HTML with basic formatting
    """
    html = markdown_content
    
    # Convert headers
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    
    # Convert bold text
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    
    # Convert italic text
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)
    
    # Convert links
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)
    
    # Convert bullet lists to HTML
    lines = html.split('\n')
    in_list = False
    
    for i, line in enumerate(lines):
        if line.startswith('- ') or line.startswith('* '):
            if not in_list:
                lines[i] = '<ul><li>' + line[2:] + '</li>'
                in_list = True
            else:
                lines[i] = '<li>' + line[2:] + '</li>'
        elif in_list and (not line.startswith('- ') and not line.startswith('* ')):
            lines[i-1] += '</li></ul>\n' + line
            in_list = False
        elif in_list and i == len(lines) - 1:
            lines[i] += '</li></ul>'
    
    # Convert paragraphs (newlines become <br>)
    html = '\n'.join(lines)
    html = re.sub(r'\n\n', '</p><p>', html)
    html = re.sub(r'^', '<p>', html)
    html = re.sub(r'$', '</p>', html)
    
    return html

def main():
    if len(sys.argv) != 2:
        print("Usage: python blog-convert.py <markdown_file>")
        sys.exit(1)
    
    markdown_file = sys.argv[1]
    filename = os.path.basename(markdown_file)
    
    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        html_content = convert_markdown_to_html(content, filename)
        
        # Create HTML file name
        base_name = os.path.splitext(filename)[0]
        html_file = f"{base_name}.html"
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(f"""<!DOCTYPE html>
<html>
<head>
    <title>{base_name}</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/resume.css">
</head>
<body>
    <div class="inner">
        <header class="major">
            <h1>{base_name}</h1>
        </header>
        <div class="blog-content">
            {html_content}
        </div>
    </div>
</body>
</html>""")
        
        print(f"Converted {filename} to {html_file}")
        
    except FileNotFoundError:
        print(f"Error: File {markdown_file} not found")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()