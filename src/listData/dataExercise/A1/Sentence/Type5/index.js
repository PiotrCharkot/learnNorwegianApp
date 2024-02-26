export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            '_______ gjør du?',     // What are you doing _______?
            'Hun _______ i dag.',  // She _______ today.
            '_______ står du opp om morgenen?' // When do you get up _______ in the morning?
        ],
        allAnswers: [
            'Når', 'Hvordan', 'Hva', 'Hvem',    // answers for first question
            'ikke kommer', 'komer ikke', ' ikke reiser', 'kommer ikke',      // answers for second question
            'Hva', 'Når', 'Hvordan', 'Hvor'          // answers for third question
        ],
        correctAnswers: [
            [false, false, true, false],  // correct answer for first question
            [false, false, false, true],  // correct answer for second question
            [false, true, false, false]   // correct answer for third question
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            '_______ søsken har du?',  // How many siblings do you have _______?
            '_______ farge liker du mest?',    // What color do you like _______?
            '_______ språk snakker du hjemme?' // What language do you speak _______ at home?
        ],
        allAnswers: [
            'Hvilket', 'Hvorfor', 'Hvor mye', 'Hvor mange',  // answers for first question
            'Hvilke', 'Hvilket', 'Hvilken', 'Hvor mange',     // answers for second question
            'Hvilket', 'Hvor mye', 'Hvilken', 'Hvordan' // answers for third question
        ],
        correctAnswers: [
            [false, false, false, true],   // correct answer for first question
            [false, false, true, false],   // correct answer for second question
            [true, false, false, false]    // correct answer for third question
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Jeg _______ kaffe.',  // I _______ coffee.
            '_______ bor du?',     // Where do you live _______?
            'De _______ en bil.'   // They _______ a car.
        ],
        allAnswers: [
            'liker ikke', ' ikke liker', 'snakker ikke', 'ikke kjøper',    // answers for first question
            'Når', 'Hvorfor', 'Hvor', 'Hva',   // answers for second question
            'tror ikke', 'har ikke', 'tenker ikke', 'går ikke'             // answers for third question
        ],
        correctAnswers: [
            [true, false, false, false],  // correct answer for first question
            [false, false, true, false],  // correct answer for second question
            [false, true, false, false]   // correct answer for third question
        ],
    }
];