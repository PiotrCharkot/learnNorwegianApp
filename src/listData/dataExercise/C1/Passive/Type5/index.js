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
            'ble', 'blir', 'har blitt', 'vil bli',  
            'ble', 'blir', 'har blitt', 'vil bli',  
            'ble', 'blir', 'har blitt', 'vil bli'  
        ],
        correctAnswers: [
            [true, false, false, false], 
            [false, false, false, true],  
            [true, false, false, false]  
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
            'vil utgis', 'vil bli utgis', 'utgitt', 'vil bli utgitt',  
            'vil bli bookes', 'booket', 'vil booket', 'ble booket',  
            'vurdert', 'ble vurderes', 'ble vurdert', 'vil vurdert',  
            'sendt', 'sendes', 'ble sendes', 'vil sendes'   
        ],
        correctAnswers: [
            [false, false, false, true],  
            [false, false, false, true],  
            [false, false, true, false],  
            [false, true, false, false]  
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
            'er tilrettelegges', 'tilrettelegges', 'ble tilrettelegges', 'vil ble tilrettelagt',  
            'offentliggjort', 'vil bli offentliggjøres', 'ble offentliggjort', 'vil bli offentliggjort',  
            'blir bes', 'blir bedt', 'blitt bedt', 'vil blitt bedt',  
            'bli følges', 'vil ble fulgt', 'følges', 'har bli fulgt'   
        ],
        correctAnswers: [
            [false, true, false, false],  
            [false, false, false, true],  
            [false, true, false, false], 
            [false, false, true, false]  
        ],
    }
];