export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Hvis jeg _______ tid, ville jeg besøke deg.', 
            'Om du _______ meg i går, kunne jeg ha hjulpet deg.', 
            'Jeg ville ha reist verden rundt hvis jeg _______ lottomillionær.', 
            'Dersom teknologien _______ seg raskere, ville vi ha opplevd enda større endringer.'
        ],
        allAnswers: [
            'hadde', 'har', '', '',  // 1st question
            'ringte', 'hadde ringt', '', '',  // 2nd question
            'har ble', 'ble', '', '',  // 3rd question
            'utvikler', 'utviklet', '', ''  // 4th question
        ],
        correctAnswers: [
            [true, false, false, false],  // hadde
            [false, true, false, false],  // hadde ringt
            [false, true, false, false],  // ble
            [false, true, false, false]   // utviklet
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Hvis jeg _______ mer tid, ville jeg lært et nytt språk.', // first question
            'Hvis været _______ fint i morgen, går vi på fjelltur.', // second question
            'Dersom du _______ meg beskjed, ville jeg kommet tidligere.', // third question
            'Skulle jeg _______ lottomillionær, ville jeg kjøpt et hus i Spania.' // fourth question
        ],
        allAnswers: [
            'hadde', 'har', 'vil ha', 'skulle ha', // possible answers for the first question
            'var', 'være', 'blir', 'ble', // possible answers for the second question
            'gitt', 'gir', 'ville gi', 'skal gi', // possible answers for the third question
            'ble', 'har blir', 'har blitt', 'bli' // possible answers for the fourth question
        ],
        correctAnswers: [
            [true, false, false, false], // marking of correct answer for the first question
            [false, false, true, false], // marking of correct answer for the second question: 'blir'
            [true, false, false, false], // marking of correct answer for the third question
            [false, false, false, true] // marking of correct answer for the fourth question
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Om jeg _______ vinne i lotteriet, ville jeg donere en del til veldedighet.', // first question
            'Om jeg _______ valget, ville jeg reist tilbake i tid.', // second question
            'Dersom hun _______ tidlig, ville hun ikke ha gått glipp av møtet.', // third question
            'Dersom han _______ tilbudet, starter han i den nye jobben neste måned.', // third question
        ],
        allAnswers: [
            'kunne', 'ville', 'hadde', 'skulle', // possible answers for the first question
            'hadde', 'har', 'vil ha', 'skulle ha', // possible answers for the second question
            'har ankom', 'ankommer', 'ankommet', 'vil ankomme', // possible answers for the third question
            'aksepterer', 'har aksepterte', 'vil aksepterte', 'har akseptere', // possible answers for the third question
        ],
        correctAnswers: [
            [false, false, false, true], // marking of correct answer for the first question: 'skulle'
            [true, false, false, false], // marking of correct answer for the second question
            [false, false, true, false], // marking of correct answer for the third question
            [true, false, false, false], // marking of correct answer for the third question: 'aksepterer'
        ],
    },
];