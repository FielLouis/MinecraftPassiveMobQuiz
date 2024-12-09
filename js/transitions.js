// Function to switch between sections
function switchSection(currentSectionId, nextSectionId) {
    const currentSection = document.getElementById(currentSectionId);
    const nextSection = document.getElementById(nextSectionId);

    currentSection.classList.remove('active');
    setTimeout(function() {
        currentSection.style.display = 'none';
        nextSection.style.display = 'flex';
        nextSection.classList.add('active');
    }, 500);
}

// Enable the "Next" button when a quiz option is selected
document.querySelectorAll('.quiz-section').forEach(section => {
    const radioButtons = section.querySelectorAll('input[type="radio"]');
    const nextButton = section.querySelector('button[data-next]');

    if (radioButtons.length > 0 && nextButton) {
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                nextButton.disabled = false;
            });
        });
    }
});

// Reset the quiz when "Try Again?" button is clicked
document.getElementById('retry').addEventListener('click', () => {
    // Reset all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false; // Uncheck all radio buttons
    });

    // Disable all "Next" buttons
    document.querySelectorAll('button[data-next]').forEach(button => {
        button.disabled = true; // Re-disable all "Next" buttons
    });

    // Switch back to the first section
    switchSection('section12', 'section1');
});

// Event listener for "Next" buttons
document.querySelectorAll('button[data-next]').forEach(button => {
    button.addEventListener('click', function() {
        const currentSectionId = this.closest('section').id;
        const nextSectionId = this.getAttribute('data-next');

        switchSection(currentSectionId, nextSectionId);
    });
});

// Event listener for "Prev" buttons
document.querySelectorAll('button[data-prev]').forEach(button => {
    button.addEventListener('click', function() {
        const currentSectionId = this.closest('section').id;
        const prevSectionId = this.getAttribute('data-prev');
        switchSection(currentSectionId, prevSectionId);
    });
});

// Initialize the first section as active
window.addEventListener('DOMContentLoaded', function() {
    // Make section 1 active by default
    document.getElementById('section1').classList.add('active');
});
