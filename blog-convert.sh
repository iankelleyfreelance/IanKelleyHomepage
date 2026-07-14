#!/bin/bash
# Simple bash script to convert markdown files to HTML for blog entries

# Check if directory exists
if [ ! -d "blog" ]; then
    echo "Error: blog directory not found"
    exit 1
fi

# Create HTML directory if it doesn't exist
mkdir -p blog-html

echo "Converting markdown files to HTML..."

# Process each markdown file in the blog directory
for file in blog/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        name="${filename%.*}"
        html_file="blog-html/${name}.html"
        
        # Simple conversion using pandoc or sed commands
        echo "<!DOCTYPE html>
<html>
<head>
    <title>$name</title>
    <link rel=\"stylesheet\" href=\"../assets/css/main.css\">
    <link rel=\"stylesheet\" href=\"../assets/css/resume.css\">
</head>
<body>
    <div class=\"inner\">
        <header class=\"major\">
            <h1>$name</h1>
        </header>
        <div class=\"blog-content\">
            <!-- Content would be converted here -->
            <p>This is a sample conversion. In a real system, this would use pandoc or similar tools.</p>
        </div>
    </div>
</body>
</html>" > "$html_file"
        
        echo "Converted $filename to $html_file"
    fi
done

echo "Conversion complete!"