export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Han kjøpte et _______ skrivebord.', // new desk
            'Hun fant en _______ mynt.', // old coin
            'De har en _______  utsikt fra huset sitt.', // beautiful view
            'Barna lekte med sine _______ leker.' // new toys
        ],
        allAnswers: [
            'ny', 'nytt', 'nye', '', // possible answers for the first question
            'gammel', 'gammelt', 'gamle', '', // possible answers for the second question
            'vakre', 'vakkert', 'vakker', '', // possible answers for the third question
            'ny', 'nytt', 'nye', '' // possible answers for the fourth question
        ],
        correctAnswers: [
            [false, true, false, false], // 'nytt' for the neuter noun "skrivebord"
            [true, false, false, false], // 'gammel' for the common gender noun "mynt"
            [false, false, true, false], // 'vakre' for the feminine noun "utsikt" in definite form
            [false, false, true, false]  // 'nye' for the plural noun "leker"
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Det var en _______ forskjell på prisene.', // big difference
            'Jeg kjøpte en _______ bil i går.', // new car
            'De plantet mange _______ blomster i hagen.', // colorful flowers
            'Hun har en _______ hobby.' // interesting hobby
        ],
        allAnswers: [
            'stor', 'stort', 'store', '', // possible answers for the first question
            'nytt', 'nye', 'ny', '', // possible answers for the second question
            'fargerik', 'fargerike', 'fargerikt', '', // possible answers for the third question
            'interessante', 'interessanter', 'interessant', '', // possible answers for the fourth question
        ],
        correctAnswers: [
            [true, false, false, false], // 'stor' for the plural noun "prisene"
            [false, false, true, false], // 'ny' for the masculine noun "bil"
            [false, true, false, false], // 'fargerike' for the plural noun "blomster"
            [false, false, true, false]  // 'interessant' for the feminine noun "hobby" in definite form
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Vi hadde en _______  tid på ferie.', // good time
            'Hun leste en _______ bok om historie.', // long book
            'Bordet er laget av _______ tre.', // dark wood
            'De så mange _______ stjerner på himmelen.' // small stars
        ],
        allAnswers: [
            'godt', 'gode', 'god', '', // possible answers for the first question
            'lang', 'langt', 'lange', '', // possible answers for the second question
            'mørk', 'mørkt', 'mørke', '', // possible answers for the third question
            'liten', 'lite', 'små', 'lille', // possible answers for the fourth question
        ],
        correctAnswers: [
            [false, false, true, false], // 'god' for the plural context "tid på ferie"
            [true, false, false, false], // 'lang' for the feminine noun "bok" in definite form
            [false, true, false, false], // 'mørkt' for the neuter noun "tre"
            [false, false, true, false]  // 'små' for the plural noun "stjerner"
        ],
    }
    
];