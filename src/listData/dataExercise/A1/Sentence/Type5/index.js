export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            '_______ gjør du?',     
            'Hun _______ i dag.', 
            '_______ står du opp om morgenen?' 
        ],
        allAnswers: [
            'Når', 'Hvordan', 'Hva', 'Hvem',   
            'ikke kommer', 'komer ikke', ' ikke reiser', 'kommer ikke',      
            'Hva', 'Når', 'Hvordan', 'Hvor'        
        ],
        correctAnswers: [
            [false, false, true, false], 
            [false, false, false, true],  
            [false, true, false, false]  
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            '_______ søsken har du?', 
            '_______ farge liker du mest?',    
            '_______ språk snakker du hjemme?' 
        ],
        allAnswers: [
            'Hvilket', 'Hvorfor', 'Hvor mye', 'Hvor mange', 
            'Hvilke', 'Hvilket', 'Hvilken', 'Hvor mange',   
            'Hvilket', 'Hvor mye', 'Hvilken', 'Hvordan' 
        ],
        correctAnswers: [
            [false, false, false, true],   
            [false, false, true, false],   
            [true, false, false, false]    
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Jeg _______ kaffe.',  
            '_______ bor du?',    
            'De _______ en bil.'   
        ],
        allAnswers: [
            'liker ikke', ' ikke liker', 'snakker ikke', 'ikke kjøper', 
            'Når', 'Hvorfor', 'Hvor', 'Hva',   
            'tror ikke', 'har ikke', 'tenker ikke', 'går ikke'     
        ],
        correctAnswers: [
            [true, false, false, false],  
            [false, false, true, false], 
            [false, true, false, false]   
        ],
    }
];