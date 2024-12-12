let questionsAnswered = 0;
let nextQuestionCounter = 1;

// Function to switch between sections
function switchSection(currentSectionId, nextSectionId) {
    const currentSection = document.getElementById(currentSectionId);
    const nextSection = document.getElementById(nextSectionId);

    // Show the navbar only when moving from section1 to section2
    if (currentSectionId === 'section1' && nextSectionId === 'section2') {
        const navbar = document.querySelector('nav');
        navbar.style.display = 'block'; 
    }

    // Remove the navbar only when moving from section2 to section1
    if (currentSectionId === 'section2' && nextSectionId === 'section1') {
        const navbar = document.querySelector('nav');
        navbar.style.display = 'none';
    }

    currentSection.classList.remove('active');
    setTimeout(function() {
        currentSection.style.display = 'none';
        nextSection.style.display = 'flex';
        nextSection.classList.add('active');
    }, 500);
}

// Function to switch between sections dynamically
function switchSectionTarget(targetSectionNumber) {
    const allSections = document.querySelectorAll('section'); // Get all sections
    const navbar = document.querySelector('nav'); // Reference to the navbar

    // Find the currently active section
    const currentSection = document.querySelector('section.active');
    const targetSectionId = `section${targetSectionNumber}`;
    const targetSection = document.getElementById(targetSectionId);

    // Ensure the navbar is visible after switching from section 1
    if (currentSection.id === 'section1') {
        navbar.style.display = 'block';
    }

    // Hide the current section and show the target section
    currentSection.classList.remove('active');
    setTimeout(function() {
        currentSection.style.display = 'none'; // Hide current section
        targetSection.style.display = 'flex';  // Show target section
        targetSection.classList.add('active'); // Mark target section as active
    }, 500);
}

// Function to enable navbar items based on index
function enableNavbarItems(index) {
    const navbarItems = document.querySelectorAll('#navbar li');

    // Loop through the navbar items and enable the ones before the current index
    for (let i = 0; i < navbarItems.length; i++) {
        if (i < index) {
            // Enable the navbar item
            navbarItems[i].classList.remove('disabled');
            navbarItems[i].style.pointerEvents = 'auto';
        } else {
            // Disable the navbar item after the current index
            navbarItems[i].classList.add('disabled');
            navbarItems[i].style.pointerEvents = 'none';
        }
    }
}

// Function to add styles to navbar items that have already been answered
function updateDisplayNavbar(index) {
    const navbarItems = document.querySelectorAll('#navbar li');

    // Loop through the navbar items and add style to the ones before the current index
    for (let i = 0; i < navbarItems.length; i++) {
        if (i < index) {
            // Add 'answered' class to items that are before the current index
            navbarItems[i].classList.add('answered');
        } else {
            // Ensure items after the current index are not marked as answered
            navbarItems[i].classList.remove('answered');
        }
    }
}

// Function to reset the navbar
function resetNavbar() {
    const navbarItems = document.querySelectorAll('#navbar li');
    
    // Loop through the navbar items and reset them
    navbarItems.forEach((item, index) => {
        item.classList.remove('answered');
        item.classList.add('disabled');     
        item.style.pointerEvents = 'none';
    });

    // Enable the first navbar item
    navbarItems[0].style.pointerEvents = 'auto';
    navbarItems[0].classList.remove('disabled'); 

    // Hide the navbar
    const navbar = document.querySelector('nav');
    navbar.style.display = 'none';
}

// Enable the "Next" button when a quiz option is selected (once per section)
document.querySelectorAll('.quiz-section').forEach(section => {
    const radioButtons = section.querySelectorAll('input[type="radio"]');
    const nextButton = section.querySelector('button[data-next]');
    let hasAnswered = false;

    if (radioButtons.length > 0 && nextButton) {
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                nextButton.disabled = false;

                if (!hasAnswered) {
                    questionsAnswered += 1;
                    nextQuestionCounter += 1;
                    enableNavbarItems(nextQuestionCounter);
                    updateDisplayNavbar(questionsAnswered);

                    hasAnswered = true;
                }
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

    // Reset values
    questionsAnswered = 0;
    nextQuestionCounter = 1;

    // Reset Navbar
    resetNavbar(); // Reset the navbar state

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
