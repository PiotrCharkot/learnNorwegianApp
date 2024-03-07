export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Boken tilhører direktøren av selskapet, og _______ kontor ligger i sjette etasje.', // the director's
            'Hun er en kjent forfatter, og _______ bøker har vunnet flere priser.', // her
            'Vi besøkte museet, og _______ utstillinger var imponerende.', // the museum's
            'Hans ideer endret industrien, og _______ teorier studeres fortsatt.', // his
        ],
        allAnswers: [
             'dens', 'hans', 'hennes','deres', // possible answers for the first question
            'dets', 'dens', 'deres', 'hennes', // possible answers for the second question
            'hans', 'dets', 'dens', 'deres', // possible answers for the third question
            'hans', 'han', 'dens', 'deres', // possible answers for the fourth question
        ],
        correctAnswers: [
            [false, true, false, false], // 'hans' for the director's office
            [false, false, false, true], // 'hennes' for her books
            [false, true, false, false], // 'dens' for the museum's exhibitions
            [true, false, false, false], // 'hans' for his theories
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Det var en feil i _______ rapport.', // the manager's
            'De ønsker å forbedre _______ arbeidsforhold.', // their
            '_______ hage er full av sjeldne planter.', // the neighbor's
        ],
        allAnswers: [
            'sjefens', 'sjefen', '', '', // possible answers for the first question
            'min', 'din', 'vår', 'deres', // possible answers for the third question
            'Naboen', 'Naboens', '', '', // possible answers for the fourth question
        ],
        correctAnswers: [
            [true, false, false, false], // 'sjefens' for the manager's report
            [false, false, false, true], // 'deres' for their working conditions
            [false, true, false, false], // 'naboens' for the neighbor's garden
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Dette er _______ favorittbok.', // my
            'Kan du hjelpe meg med _______ prosjekt?', // your (singular neuter)
            '_______ mening teller også i denne diskusjonen.', // Your (plural or polite)
        ],
        allAnswers: [
            'mine', 'min', 'mitt', '', // possible answers for the first question
            'mine', 'min', 'mitt', '', // possible answers for the second question
            'Dere', 'Deres', 'Vårt', '', // possible answers for the fourth question
        ],
        correctAnswers: [
            [false, true, false, false], // 'din' for my favorite book
            [false, false, true, false], // 'ditt' for your (singular neuter) project
            [false, true, false, false], // 'Deres' for Your (plural/polite) opinion
        ],
    }
    
];