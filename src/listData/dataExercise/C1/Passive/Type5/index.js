export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Beslutningen _______ tatt av styret sist fredag.',
            'Rapporten _______ publisert på nettstedet vårt neste måned.',
            'Undersøkelsen _______ gjennomført av et uavhengig firma i går.'
        ],
        allAnswers: [
            'ble', 'blir', 'har blitt', 'vil bli',  // 1st question
            'ble', 'blir', 'har blitt', 'vil bli',  // 2nd question
            'ble', 'blir', 'har blitt', 'vil bli'   // 4th question
        ],
        correctAnswers: [
            [true, false, false, false],  // ble tatt
            [false, false, false, true],  // vil bli publisert
            [true, false, false, false]   // ble gjennomført
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Boken _______ neste år.',
            'Møterommet _______ for møtet i morgen.',
            'Prosjektet _______ av komiteen.',
            'Dokumentene _______ per e-post.'
        ],
        allAnswers: [
            'vil utgis', 'vil bli utgis', 'utgitt', 'vil bli utgitt',  // 1st question
            'vil bli bookes', 'booket', 'vil booket', 'ble booket',  // 2nd question
            'vurdert', 'ble vurderes', 'ble vurdert', 'vil vurdert',  // 3rd question
            'sendt', 'sendes', 'ble sendes', 'vil sendes'   // 4th question
        ],
        correctAnswers: [
            [false, false, false, true],  // vil bli utgitt
            [false, false, false, true],  // ble booket
            [false, false, true, false],  // ble vurdert
            [false, true, false, false]   // sendes
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Undervisningen _______ for ulike læringsstiler.',
            'Resultatene fra studien _______ i neste uke.',
            'Alle ansatte _______ om å delta i undersøkelsen.',
            'Sikkerhetsreglene _______ strengt av alle besøkende.'
        ],
        allAnswers: [
            'er tilrettelegges', 'tilrettelegges', 'ble tilrettelegges', 'vil ble tilrettelagt',  // 1st question
            'offentliggjort', 'vil bli offentliggjøres', 'ble offentliggjort', 'vil bli offentliggjort',  // 2nd question
            'blir bes', 'blir bedt', 'blitt bedt', 'vil blitt bedt',  // 3rd question
            'bli følges', 'vil ble fulgt', 'følges', 'har bli fulgt'   // 4th question
        ],
        correctAnswers: [
            [false, true, false, false],  // tilrettelegges
            [false, false, false, true],  // vil bli offentliggjort
            [false, true, false, false],  // blir bedt
            [false, false, true, false]   // følges
        ],
    }
];