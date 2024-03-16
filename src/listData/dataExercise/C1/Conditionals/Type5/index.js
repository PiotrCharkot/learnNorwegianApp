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
            'hadde', 'har', '', '',  
            'ringte', 'hadde ringt', '', '',  
            'har ble', 'ble', '', '',  
            'utvikler', 'utviklet', '', ''  
        ],
        correctAnswers: [
            [true, false, false, false],  
            [false, true, false, false],  
            [false, true, false, false],  
            [false, true, false, false]   
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Hvis jeg _______ mer tid, ville jeg lært et nytt språk.',
            'Hvis været _______ fint i morgen, går vi på fjelltur.', 
            'Dersom du _______ meg beskjed, ville jeg kommet tidligere.', 
            'Skulle jeg _______ lottomillionær, ville jeg kjøpt et hus i Spania.' 
        ],
        allAnswers: [
            'hadde', 'har', 'vil ha', 'skulle ha', 
            'var', 'være', 'blir', 'ble', 
            'gitt', 'gir', 'ville gi', 'skal gi', 
            'ble', 'har blir', 'har blitt', 'bli' 
        ],
        correctAnswers: [
            [true, false, false, false], 
            [false, false, true, false], 
            [true, false, false, false], 
            [false, false, false, true] 
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Om jeg _______ vinne i lotteriet, ville jeg donere en del til veldedighet.', 
            'Om jeg _______ valget, ville jeg reist tilbake i tid.', 
            'Dersom hun _______ tidlig, ville hun ikke ha gått glipp av møtet.', 
            'Dersom han _______ tilbudet, starter han i den nye jobben neste måned.', 
        ],
        allAnswers: [
            'kunne', 'ville', 'hadde', 'skulle', 
            'hadde', 'har', 'vil ha', 'skulle ha', 
            'har ankom', 'ankommer', 'ankommet', 'vil ankomme', 
            'aksepterer', 'har aksepterte', 'vil aksepterte', 'har akseptere', 
        ],
        correctAnswers: [
            [false, false, false, true], 
            [true, false, false, false], 
            [false, false, true, false], 
            [true, false, false, false], 
        ],
    },
];