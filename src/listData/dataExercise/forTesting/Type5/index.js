export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'Han løper _______ når han er sent ute.',
            'De snakker _______ i biblioteket.',
            'Barnet sover _______ om natten.',
            'Vi reiser _______ i ferien.'
        ],
        allAnswers: ['fort', 'høyt', 'positivt', 'varmt',
            'hardt', 'vakkert', 'stille', 'lenge', 
            'effektivt', 'lavt', 'kreativt', 'rolig', 
            'tydelig', 'grundig', 'dypt', 'ofte'],
        correctAnswers: [
            [true, false, false, false], 
            [false, false, true, false], 
            [false, false, false, true], 
            [false, false, false, true],  
        ],
        correctAnswersList: [
            'fort', 'stille', 'rolig', 'ofte'
        ],
        translationsCorrectAnswers: {
            eng: ['fast', 'quiet', 'easy', 'often'],
            pl: ['Stopień wyższy', 'Stopień najwyższy', 'Stopień wyższy3', 'Stopień najwyższy4'],
            ar: ['المقارنة', 'التفضيل'],
            ger: ['Komparativ', 'Superlativ'],
            lt: ['Lyginamasis laipsnis', 'Aukščiausiasis laipsnis'],
            ua: ['Ступінь порівняння', 'Найвищий ступінь'],
            sp: ['Comparativo', 'Superlativo'],
        },
        translationsLinks: [
            'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fstor.mp3?alt=media&token=cd01dbdf-b602-4e93-9ffe-b32599565abb',
            'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fstor.mp3?alt=media&token=cd01dbdf-b602-4e93-9ffe-b32599565abb','https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Flang.mp3?alt=media&token=968d6e30-3a78-40a6-b254-d89fb4e9a749','https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Flang.mp3?alt=media&token=968d6e30-3a78-40a6-b254-d89fb4e9a749',
        ]
    },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 4,
    //     questions: [
    //         'Hun er en _______ lærer.',
    //         'Barnet sov _______ i den komfortable sengen.',
    //         'Vi spiste en _______ middag.',
    //         'Hun snakker engelsk og reiser _______.'
    //     ],
    //     allAnswers: ['tålmodig', 'sjelden', 'tydelig', 'bredt',
    //         'raskt', 'rolig', 'plutselig', 'mørk',
    //         'lykkelig', 'sulten', 'opptatt','deilig', 
    //         'mørk', 'ofte', 'tålmodig', 'mykt'],
    //     correctAnswers: [
    //         [true, false, false, false], 
    //         [false, true, false, false],  
    //         [false, false, false, true], 
    //         [false, true, false, false],  
    //     ],
    //     correctAnswersList: [
    //         'fort', 'stille', 'rolig', 'ofte'
    //     ],
    //     translationsCorrectAnswers: {
    //         eng: ['fast', 'quiet', 'easy', 'often'],
    //         pl: ['Stopień wyższy', 'Stopień najwyższy', 'Stopień wyższy3', 'Stopień najwyższy4' ],
    //         ar: ['المقارنة', 'التفضيل'],
    //         ger: ['Komparativ', 'Superlativ'],
    //         lt: ['Lyginamasis laipsnis', 'Aukščiausiasis laipsnis'],
    //         ua: ['Ступінь порівняння', 'Найвищий ступінь'],
    //         sp: ['Comparativo', 'Superlativo'],
    //     },
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 4,
    //     questions: [
    //         'Bussen kommer _______.',
    //         'Hun smiler alltid så _______.',
    //         'Kaffen smaker _______.',
    //         'Han leser boken _______.'
    //     ],
    //     allAnswers: ['snart', 'glad', 'veldig', 'mykt', 
    //         'tung', 'lykkelig', 'mørk', 'ledig', 
    //         'plutselig', 'raskt', 'rent', 'fantastisk',
    //         'opptatt', 'stille', 'nesten', 'varmt'],
    //     correctAnswers: [
    //         [true, false, false, false],  
    //         [false, true, false, false], 
    //         [false, false, false, true],  
    //         [false, true, false, false], 
    //     ],
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 4,
    //     questions: [
    //         'Været er _______ i dag.',
    //         'Barnet leser boken _______.',
    //         'Maten lukter _______.',
    //         'De går _______ i parken.'
    //     ],
    //     allAnswers: ['vakkert', 'ute', 'inne', 'sent',
    //         'alltid', 'søt', 'høyt', 'sulten', 
    //         'trist', 'sjelden', 'nøye', 'deilig', 
    //         'ledig', 'dyrt', 'sakte', 'billig'],
    //     correctAnswers: [
    //         [true, false, false, false], 
    //         [false, false, true, false], 
    //         [false, false, false, true], 
    //         [false, false, true, false],  
    //     ],
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 3,
    //     questions: [
    //         'Katten vår er veldig _______.',
    //         'Han svarer alltid _______ på spørsmål.',
    //         'Hun studerer _______ for eksamen.'
    //     ],
    //     allAnswers: [ 'skarp', 'koselig', 'sliten', 'flat', 
    //         'tørr', 'dyrt', 'fornøyd', 'glatt',
    //         'dårlig', 'grundig', 'lyst', 'lavt'],
    //     correctAnswers: [
    //         [false, true, false, false],  
    //         [false, false, true, false],  
    //         [false, true, false, false],  
    //     ],
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 3,
    //     questions: [
    //         'Bilen kjører veldig _______.',
    //         'De lærer norsk _______.',
    //         'Han kjører _______ til jobb.',
    //     ],
    //     allAnswers: ['klart', 'punktlig', 'fort', 'høyt', 
    //         'sliten', 'stadig', 'koselig', 'kaldt',
    //         'hardt', 'forsiktig', 'tålmodig', 'sammen'],
    //     correctAnswers: [
    //         [false, false, true, false], 
    //         [false, true, false, false],  
    //         [false, true, false, false], 
    //     ],
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 3,
    //     questions: [
    //         'Hun venter _______ på bussen.',
    //         'De snakker _______ om politikk.',
    //         'Hun lager mat _______.'
    //     ],
    //     allAnswers: [ 
    //         'snart', 'bredt', 'tydelig', 'tålmodig', 
    //         'mett', 'glatt', 'ofte', 'dårlig', 
    //         'kort', 'raskt', 'stort', 'høyt'],
    //     correctAnswers: [
    //         [false, false, false, true], 
    //         [false, false, true, false],  
    //         [false, true, false, false], 
    //     ],
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 3,
    //     questions: [
    //         'Han snakker _______ når han er nervøs.',
    //         'Vannet føles _______ i dag.',
    //         'De møtes _______ på kafeen.',
    //     ],
    //     allAnswers: ['raskt', 'kjølig', 'ung', 'trist', 
    //         'bred', 'kaldt', 'tomt', 'nytt', 
    //         'sint', 'skarp', 'vanligvis', 'sur',],
    //     correctAnswers: [
    //         [true, false, false, false],  
    //         [false, true, false, false], 
    //         [false, false, true, false],  
    //     ],
    // },
    // {
    //     typeOfScreen: '5',
    //     nuberOfQuestions: 4,
    //     questions: [
    //         'Hun kjører _______ fordi veiene er glatte.',
    //         'Barna spiser _______ om morgenen.',
    //         'Han jobber _______ hele dagen.',
    //         'Været er _______ i juli.',
    //     ],
    //     allAnswers: ['forsiktig', 'trøtt', 'sunn', 'tykk',
    //         'tørst', 'raskt', 'kjedelig', 'rik', 
    //         'tynn', 'farlig', 'hardt', 'mulig', 
    //         'lokal', 'sjalu', 'stiv', 'varmt'],
    //     correctAnswers: [
    //         [true, false, false, false], 
    //         [false, true, false, false], 
    //         [false, false, true, false],  
    //         [false, false, false, true], 
    //     ],
    // }
];