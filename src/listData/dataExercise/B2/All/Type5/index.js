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
            [false, false, true, false], 
            [false, false, false, true],  
            [true, false, false, false], 
    
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
            [false, true, false, false],
            [false, false, false, true],  
            [false, true, false, false]  
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
            [false, false, false, true], 
            [false, true, false, false],  
            [false, false, true, false],  
            
    
        ],
    },
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
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'Etter at hun _______ filmen, forsto hun endelig referansene.',
            'Før vi _______ nyhetene, visste vi ingenting om hendelsen.'
        ],
        allAnswers: ['hadde sett', 'så', 'hadde hørt', 'hørte', 'hadde sett', 'så', 'hadde hørt', 'hørte'],
        correctAnswers: [[true, false, false, false], [false, false, true, false]],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'Jeg _______ middagen da du ringte.',
            'De _______ hjemmet sitt før flommen kom.'
        ],
        allAnswers: ['allerede hadde laget', 'hadde allerede lage', 'hadde allerede laget', 'hadde allerede lag', 'hadde forlat', 'hadde forlått', 'hadde forlatt', 'hadde forlattet'],
        correctAnswers: [[false, false, true, false], [false, false, true, false]],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'Hun _______ brevet før han svarte.',
            'Før han flyttet til Norge, hadde han _______ snø.'
        ],
        allAnswers: ['hadde skrevet', 'hadde skrev', 'hadde skrevt', 'skrev', 'aldri set', 'har sett', 'aldri så', 'aldri sett'],
        correctAnswers: [[true, false, false, false], [false, false, false, true]],
    }
];