export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Han sykler _______ selv på en vindfull dag.',
            'De jobber _______ i hagen.',
            'Møtet startet _______.',
        ],
        allAnswers: [
            'ledig', 'sakte', 'raskt', 'veldig',
            'ganske', 'høyt', 'flittig', 'lavt',
            'punktlig', 'gjennomsiktig', 'bløt', 'spennende'
        ],
        correctAnswers: [
            [false, false, true, false],  
            [false, false, true, false],  
            [true, false, false, false], 
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Vinduet er _______ åpent.',
            'Barnet sovner _______ etter eventyret.',
            'Hun arbeider _______ for å fullføre prosjektet.'
            
        ],
        allAnswers: [
            'mykt', 'sint', 'vanlig', 'delvis',
            'energisk', 'snill', 'raus', 'straks', 
            'overrasket', 'intenst', 'sjelden', 'høyt' 
        ],
        correctAnswers: [
            [false, false, false, true], 
            [false, false, false, true],
            [false, true, false, false], 
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            
            'Vi må handle _______ for å rekke bussen.',
            'Hun analyserte problemet _______ før hun foreslo en løsning.',
            'Landskapet endrer seg _______ når vi nærmer oss fjellene.'
            
        ],
        allAnswers: [
            'hardt', 'mye', 'fort', 'sterkt',
            'kort', 'grundig', 'raskt', 'overfladisk',
            'gradvis', 'sjelden', 'slett', 'kaotisk'
        ],
        correctAnswers: [
            [false, false, true, false],   
            [false, true, false, false], 
            [true, false, false, false] 
        ],
    },
];