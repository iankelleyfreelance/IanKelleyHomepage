// Resume Blog - Drag and Drop Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add drag and drop functionality to resume sections
    const resumeSections = document.querySelectorAll('.resume-content section');
    
    resumeSections.forEach(section => {
        section.setAttribute('draggable', 'true');
        section.style.cursor = 'move';
        
        section.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.innerHTML);
            this.classList.add('dragging');
        });
        
        section.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Add drop targets for rearranging sections
    const resumeContent = document.querySelector('.resume-content');
    
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
    
    // Add print functionality for resume
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
});