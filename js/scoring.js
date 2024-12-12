// Declare the scores object globally
const scores = {};

// Declare the questions object globally
const questions = {};

// Fetch data from local JSON files
async function fetchLocalData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error loading ${filePath}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${filePath}:`, error);
        return null;
    }
}

// Initialize data for mobs and questions
async function initializeQuizData() {
    const mobsData = await fetchLocalData('./data/mobs.json');
    const questionsData = await fetchLocalData('./data/points.json');

    if (mobsData) {
        Object.assign(scores, mobsData); // Update the scores object
        console.log('Mobs data loaded:', scores);
    }

    if (questionsData) {
        Object.assign(questions, questionsData); // Update the questions object
        console.log('Questions data loaded:', questions);
    }

    console.log('Initial mobs data:', mobsData);
    console.log('Initial questions data:', questionsData);
}

// Function to update scores based on selected answer
function updateScores(question, value) {
    if (questions[question] && questions[question][value]) {
        // Update the score for each mob associated with the selected answer
        questions[question][value].forEach((mob) => {
            if (scores[mob] !== undefined) {
                scores[mob] += 1;
                console.log(`Updated score for ${mob}: ${scores[mob]}`);
            }
        });
    }
    console.log('Scores after update:', scores);
}

// Add event listeners to each radio button
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const question = event.target.name;
        const value = event.target.value;

        console.log(`User selected ${value} for ${question}`);

        updateScores(question, value);

        // Enable the "Next" button once an option is selected
        const nextButton = event.target.closest('.quiz-section').querySelector('button[data-next]');
        if (nextButton) {
            nextButton.disabled = false;
        }
    });
});

// Function to calculate the result and display it
function calculateResult() {
    console.log('Final scores before result calculation:', scores);

    let highestScore = 0;
    let result = '';

    // Calculate the highest scoring mob
    for (const [mob, score] of Object.entries(scores)) {
        if (score > highestScore) {
            highestScore = score;
            result = mob;
        }
    }

    console.log(`Resulting mob: ${result} with score: ${highestScore}`);
    
    // Check if the first letter of the result is a vowel
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const article = vowels.includes(result[0].toUpperCase()) ? 'an' : 'a';

    // Display the result text
    const resultText = `Based on your answers, you are ${article} ${result}!`;
    const resultSection = document.getElementById('section12');
    resultSection.querySelector('p').innerHTML = resultText;

    // Create the image element for the result
    const imageWrapper = resultSection.querySelector('.result-wrapper');
    const img = document.createElement('img');
    img.src = `./assets/results/${result}.png`;
    img.alt = result;
    img.classList.add('result-image'); // Add a class for styling
    imageWrapper.innerHTML = ''; // Clear any existing content
    imageWrapper.appendChild(img); // Add the image to the wrapper
}

// Reset the scores to zero when retrying
function resetScores() {
    for (let mob in scores) {
        scores[mob] = 0;  // Reset each mob's score to 0
    }
    console.log('Scores have been reset:', scores);
}

// Add event listener to reset the quiz
document.getElementById('retry').addEventListener('click', () => {
    // Reset the scores object to initial values
    resetScores();

    // Reset any result display
    const resultSection = document.getElementById('section12');
    resultSection.querySelector('p').innerHTML = '';
    resultSection.querySelector('.result-wrapper').innerHTML = '';

    console.log('Quiz reset');
});

// Add event listener to the "Submit" button
document.querySelector('button[data-next="section12"]').addEventListener('click', calculateResult);

// Initialize the quiz on page load
initializeQuizData();
