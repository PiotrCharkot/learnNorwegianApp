export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Boken tilhører direktøren av selskapet, og _______ kontor ligger i sjette etasje.', 
            'Hun er en kjent forfatter, og _______ bøker har vunnet flere priser.', 
            'Vi besøkte museet, og _______ utstillinger var imponerende.', 
            'Hans ideer endret industrien, og _______ teorier studeres fortsatt.', 
        ],
        allAnswers: [
             'dens', 'hans', 'hennes','deres', 
            'dets', 'dens', 'deres', 'hennes', 
            'hans', 'dets', 'dens', 'deres', 
            'hans', 'han', 'dens', 'deres', 
        ],
        correctAnswers: [
            [false, true, false, false], 
            [false, false, false, true], 
            [false, true, false, false],
            [true, false, false, false], 
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Det var en feil i _______ rapport.', 
            'De ønsker å forbedre _______ arbeidsforhold.', 
            '_______ hage er full av sjeldne planter.', 
        ],
        allAnswers: [
            'sjefens', 'sjefen', '', '', 
            'min', 'din', 'vår', 'deres', 
            'Naboen', 'Naboens', '', '', 
        ],
        correctAnswers: [
            [true, false, false, false], 
            [false, false, false, true], 
            [false, true, false, false], 
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Dette er _______ favorittbok.', 
            'Kan du hjelpe meg med _______ prosjekt?', 
            '_______ mening teller også i denne diskusjonen.', 
        ],
        allAnswers: [
            'mine', 'min', 'mitt', '', 
            'mine', 'min', 'mitt', '', 
            'Dere', 'Deres', 'Vårt', '', 
        ],
        correctAnswers: [
            [false, true, false, false], 
            [false, false, true, false], 
            [false, true, false, false], 
        ],
    }
    
];