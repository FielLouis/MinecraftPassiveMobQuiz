const scores = {
    // All 33 Passive mobs in Minecraft
    // based on https://www.gamergeeks.net/apps/minecraft/list-of-passive-mobs
    // as of December 9, 2024
    Allay: 0,
    Armadillo: 0,
    Axolotl: 0,
    Bat: 0,
    Camel: 0,
    Cat: 0,
    Chicken: 0,
    Cod: 0,
    Cow: 0,
    Donkey: 0,
    Fox: 0,
    Frog: 0,
    GlowSquid: 0,
    Horse: 0,
    Mooshroom: 0,
    Mule: 0,
    Ocelot: 0,
    Parrot: 0,
    Pig: 0,
    Pufferfish: 0,
    Rabbit: 0,
    Salmon: 0,
    Sheep: 0,
    SkeletonHorse: 0,
    Sniffer: 0,
    SnowGolem: 0,
    Squid: 0,
    Strider: 0,
    Tadpole: 0,
    TropicalFish: 0,
    Turtle: 0,
    Villager: 0,
    WanderingTrader: 0,
};

// Mapping questions and answer choices to mobs
const questions = {
    q1: {
        A: ['TropicalFish', 'Turtle', 'Parrot'],
        B: ['SkeletonHorse', 'SnowGolem', 'Rabbit'],
        C: ['Ocelot', 'Fox', 'Cat'],
        D: ['Cow', 'Sheep', 'Mooshroom']
    },
    q2: {
        A: ['Parrot', 'Bat', 'Allay'],
        B: ['Horse', 'Camel', 'Donkey'],
        C: ['Salmon', 'Axolotl', 'Squid'],
        D: ['Villager', 'Mooshroom', 'Pig']
    },
    q3: {
        A: ['Rabbit', 'Frog', 'Pig'],
        B: ['Turtle', 'Axolotl', 'Cat'],
        C: ['Cow', 'Sheep', 'Villager'],
        D: ['Allay', 'Parrot', 'Ocelot']
    },
    q4: {
        A: ['Villager', 'Parrot', 'Mooshroom'],
        B: ['Donkey', 'Fox', 'Rabbit'],
        C: ['Cat', 'Ocelot', 'Axolotl'],
        D: ['Horse', 'Mule', 'Sheep']
    },
    q5: {
        A: ['Parrot', 'Allay', 'Bat'],
        B: ['Rabbit', 'Frog', 'Fox'],
        C: ['Cat', 'Ocelot', 'Villager'],
        D: ['Turtle', 'Axolotl', 'GlowSquid']
    },
    q6: {
        A: ['Horse', 'Mule', 'SkeletonHorse'],
        B: ['Parrot', 'Allay', 'Ocelot'],
        C: ['Turtle', 'Axolotl', 'Mooshroom'],
        D: ['Villager', 'Cow', 'Sheep']
    },
    q7: {
        A: ['Rabbit', 'Frog', 'Pig'],
        B: ['Horse', 'Camel', 'Donkey'],
        C: ['Turtle', 'GlowSquid', 'Axolotl'],
        D: ['Parrot', 'Bat', 'Allay']
    },
    q8: {
        A: ['Villager', 'Mooshroom', 'Cow'],
        B: ['Rabbit', 'Fox', 'Ocelot'],
        C: ['Cat', 'Axolotl', 'Turtle'],
        D: ['Parrot', 'Horse', 'Sheep']
    },
    q9: {
        A: ['Axolotl', 'Salmon', 'Squid'],
        B: ['Horse', 'Pig', 'Mooshroom'],
        C: ['Villager', 'Camel', 'Fox'],
        D: ['Rabbit', 'Frog', 'Turtle']
    },
    q10: {
        A: ['Parrot', 'Pig', 'TropicalFish'],
        B: ['SnowGolem', 'SkeletonHorse', 'Rabbit'],
        C: ['Turtle', 'Axolotl', 'Mooshroom'],
        D: ['Camel', 'Strider', 'Villager']
    },
};

// Function to update scores based on selected answer
function updateScores(question, value) {
    if (questions[question] && questions[question][value]) {
        // Update the score for each mob associated with the selected answer
        questions[question][value].forEach((mob) => {
            scores[mob] += 1;
        });
    }
}

// Add event listeners to each radio button
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        const question = event.target.name;  // e.g., "q1"
        const value = event.target.value;   // e.g., "A"
        updateScores(question, value);

        // Enable the "Next" button once an option is selected
        const nextButton = event.target.closest('.quiz-section').querySelector('button[data-next]');
        if (nextButton) {
            nextButton.disabled = false;
        }
    });
});

// Function to update the result with an image and text
function calculateResult() {
    let highestScore = 0;
    let result = '';

    // Calculate the highest scoring mob
    for (const [mob, score] of Object.entries(scores)) {
        if (score > highestScore) {
            highestScore = score;
            result = mob;
        }
    }

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


// Add event listener to the "Submit" button
document.querySelector('button[data-next="section12"]').addEventListener('click', calculateResult);

