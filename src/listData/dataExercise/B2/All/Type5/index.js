export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'De gamle maleriene var _______ bevart til tross for alderen.',
            'Hun håndterte den vanskelige situasjonen med _______ finesse.',
            'Kritikeren omtalte filmen som _______ og uinspirerende.',
        ],
        allAnswers: [
            'dårlig', 'forferdelig', 'utmerket', 'knapt',
            'nervøs', 'glemsk', 'umiddelbar', 'betydelig',
            'banal', 'fengslende', 'original', 'innovativ',
        ],
        correctAnswers: [
            [false, false, true, false],  // 'utmerket' is correct
            [false, false, false, true],  // 'betydelig' is correct
            [true, false, false, false],  // 'banal' is correct
    
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Hans forståelse av emnet var _______ og detaljert.',
            'Hun reagerte på nyhetene med _______ overraskelse.',
            'Vitnet gav en _______ beskrivelse av hendelsen, noe som var avgjørende for saken.'
        ],
        allAnswers: [
            'overfladisk', 'inngående', 'feilaktig', 'ubetydelig',
            'markant', 'behersket', 'midlertidig', 'umiddelbar',
            'vag', 'konkret', 'tvetydig', 'overdrevet'
        ],
        correctAnswers: [
            [false, true, false, false],  // 'inngående' is correct
            [false, false, false, true],  // 'umiddelbar' is correct
            [false, true, false, false]   // 'konkret' is correct
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            
            'Han håndterte krisen med en _______ ro som overrasket alle.',
            'Filmen ble kritisert for sin _______ skildring av historiske hendelser.',
            'De opplevde en _______ økning i etterspørselen etter deres produkter.',
        ],
        allAnswers: [
            
            'kaotisk', 'nervøs', 'overfladisk', 'stoisk',
            'nøyaktige', 'feilaktige', 'maleriske', 'realistiske',
            'glemsk', 'fengslende', 'markant', 'unøyaktig',
        ],
        correctAnswers: [
            [false, false, false, true],  // 'stoisk' is correct
            [false, true, false, false],  // 'feilaktige' is correct
            [false, false, true, false],  // 'markant' is correct
            
    
        ],
    },
    
];