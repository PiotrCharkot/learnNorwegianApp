export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'Han _______ allerede flybillettene til Oslo.',
            'Vi _______ mange interessante folk på reisen.'
        ],
        allAnswers: ['har bestilte', 'har bestilt', 'har bestil', 'har bestillt', 'har møtt', 'har motte', 'har mott', 'har møtte'],
        correctAnswers: [
            [false, true, false, false],
            [true, false, false, false]
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'De _______ allerede rapporten.',
            'Jeg _______ mitt pass.'
        ],
        allAnswers: ['har fullfort', 'har skrev', 'har leste', 'har fullført', 'har forstått', 'har mistet', 'har kjøpt', 'har solgt'],
        correctAnswers: [
            [false, false, false, true],
            [false, true, false, false]
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'Vi _______ mye god mat i Italia.',
            'Hun har ikke _______ e-posten ennå.'
        ],
        allAnswers: ['har spist', 'har drukket', 'har lest', 'har spiste', 'så', 'såt', 'satt', 'sett'],
        correctAnswers: [
            [true, false, false, false],
            [false, false, false, true]
        ],
    }
];