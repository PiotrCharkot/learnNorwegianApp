export default dataObj = [
//     {
//     typeOfScreen: '4',
//     correctAnswers: ['små', 'små', 'lille', 'liten', 'lita'],
//     nuberOfQuestions: 5,
//     questions: [
//         ['de', 'steinene'],
//         ['tre', 'katter more text to jump to next line mayby more text'],
//         ['den', 'skogen'],
//         ['en', 'endring'],
//         ['ei', 'jente']
//     ],
//     translations: {
//         eng: ['(eng trans 1)', '(eng trans 2)', '', '(eng trans4)', '(eng trans5)'],
//         pl: ['(pol trans1)', '(pol trans2)', '', '(pol trans4)', '(pol trans5)'],
//         ar: ['ara trans1', 'ara trans2', '', 'ara trans4', 'ara trans5'],
//         ger: ['ger trans1', 'ger trans2', '', 'ger trans4', 'ger trans5'],
//         lt: ['lit trans1', 'lit trans2', '', 'lit trans4', 'lit trans5'],
//         ua: ['ukr trans1', 'ukr trans2', '', 'ukr trans4', 'ukr trans5'], 
//         sp: ['spa trans1', 'spa trans2', '', 'spa trans4', 'spa trans5'],
//     },
//     instructions: {
//         eng: 'Choose good anwer out of two from data base 4',
//         pl: 'polskie instrukcje baza danych 4',
//         ar: 'سيارة',
//         ger: 'ein Auto 4',
//         lt: 'automobilis 4',
//         ua: 'автомобіль 4', 
//         sp: 'un coche 4',
//     },
//    },
//    {
//     typeOfScreen: '4',
//     correctAnswers: ['små', 'lille', 'lite', 'små', 'lille', 'lite', 'små', 'lille'],
//     nuberOfQuestions: 8,
//     questions: [
//         ['de', 'husene'],
//         ['det', 'bakeriet'],
//         ['et', 'problem'],
//         ['de', 'husene'],
//         ['det', 'bakeriet'],
//         ['et', 'problem'],
//         ['de', 'husene'],
//         ['det', 'bakeriet'],
        
//     ]
//    },
   {
    typeOfScreen: '4',
    nuberOfQuestions: 2,
    questions: [
        ['Vannet er ', 'kaldt.'],          // The water is cold.
        ['De snakker ', 'norsk.']          // They speak Norwegian.
    ],
    correctAnswers: ['veldig', 'flytende'],
    translations: {
        eng: ['(very)', '(fluently)'],
        pl: ['(bardzo)', '(płynnie)'],
        ar: ['(جداً)', '(بطلاقة)'],
        ger: ['(sehr)', '(fließend)'],
        lt: ['(labai)', '(sklandžiai)'],
        ua: ['(дуже)', '(вільно)'],
        sp: ['(muy)', '(fluentemente)'],
    },
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 2,
        questions: [
            ['Han snakker ', ''],   // He speaks clearly.
            ['Kaken smaker ', '']      // The cake tastes sweet.
        ],
        correctAnswers: ['sakte', 'deilig'],
        translations: {
            eng: ['(slowly)', '(deliciously)'],
            pl: ['(wolno)', '(pysznie)'],
            ar: ['(ببطء)', '(لذيذاً)'],
            ger: ['(langsam)', '(köstlich)'],
            lt: ['(lėtai)', '(skaniai)'],
            ua: ['(повільно)', '(смачно)'],
            sp: ['(lentamente)', '(deliciosamente)'],
        },
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 2,
        questions: [
            ['Månen skinner ', 'i natt.'],       // The moon is shining tonight.
            ['Barnet sover ', 'nå.'],            // The child is sleeping now.
        ],
        correctAnswers: ['klart', 'dypt'],
        translations: {
            eng: ['(clearly)', '(deeply)'],
            pl: ['(jasno)', '(głęboko)'],
            ar: ['(بوضوح)', '(بعمق)'],
            ger: ['(klar)', '(tief)'],
            lt: ['(aiškiai)', '(giliai)'],
            ua: ['(ясно)', '(глибоко)'],
            sp: ['(claramente)', '(profundamente)'],
        },
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 4,
        questions: [
            ['Hun ', 'en bok.'],             // She reads a book.
            ['Vi ', 'på skolen.'],           // We learn at school.
            ['Han ', 'norsk.'],              // He speaks Norwegian.
            ['Barna ', 'i parken.'],         // The children play in the park.
        ],
        correctAnswers: ['leser', 'lærer', 'snakker', 'leker'],
        translations: {
            eng: ['(reads)', '(learn)', '(speaks)', '(play)'],
            pl: ['(czyta)', '(uczą się)', '(mówi)', '(bawią się)'],
            ar: ['(تقرأ)', '(يتعلمون)', '(يتحدث)', '(يلعبون)'],
            ger: ['(liest)', '(lernen)', '(spricht)', '(spielen)'],
            lt: ['(skaito)', '(mokosi)', '(kalba)', '(žaidžia)'],
            ua: ['(читає)', '(вчаться)', '(говорить)', '(грають)'],
            sp: ['(lee)', '(aprenden)', '(habla)', '(juegan)'],
        },
        instructions: {
            eng: 'Tap on the gap and type the correct verb in present tense.',
            pl: 'Dotknij luki i wpisz odpowiedni czasownik w czasie teraźniejszym.',
            ar: 'اضغط على الفراغ واكتب الفعل الصحيح في زمن المضارع',
            ger: 'Tippe auf die Lücke und gib das richtige Verb im Präsens ein.',
            lt: 'Paliesk tarpą ir įvesk teisingą veiksmažodį esamuoju laiku.',
            ua: 'Торкніться пропуску і введіть правильне дієслово у теперішньому часі', 
            sp: 'Toca el espacio y escribe el verbo correcto en tiempo presente.',
        },
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 4,
        questions: [
            ['', 'liker å lese bøker.'],     // They like to read books.
            ['Kan ', 'hjelpe meg?'],         // Can you help me?
            ['', 'bor i Norge.'],            // We live in Norway.
            ['', 'er på skolen.'],          // She is at school.
        ],
        correctAnswers: ['de', 'du', 'vi', 'hun'],
        translations: {
            eng: ['(They)', '(you)', '(We)', '(She)'],
            pl: ['(Oni)', '(ty)', '(My)', '(Ona)'],
            ar: ['(هم)', '(أنت)', '(نحن)', '(هي)'],
            ger: ['(Sie)', '(du)', '(Wir)', '(Sie)'],
            lt: ['(Jie)', '(tu)', '(Mes)', '(Ji)'],
            ua: ['(Вони)', '(ти)', '(Ми)', '(Вона)'],
            sp: ['(Ellos)', '(tú)', '(Nosotros)', '(Ella)'],
        },
        instructions: {
            eng: 'Tap on the gap and type the correct personal pronoun',
            pl: 'Dotknij luki i wpisz odpowiedni zaimek osobowy.',
            ar: 'اضغط على الفراغ واكتب الضمير الشخصي الصحيح',
                  ger: 'Tippe auf die Lücke und gib das richtige Personalpronomen ein.',
            lt: 'Paliesk tarpą ir įvesk teisingą asmens įvardį.',
            ua: 'Торкніться пропуску і введіть правильний особовий займенник.', 
            sp: 'Toca el espacio y escribe el pronombre personal correcto.',
        },
    
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 2,
        questions: [
            ['Hun ', 'til legen i morgen.'],            // She will go to the doctor tomorrow.
            ['De ', 'sin nye bil neste uke.'],          // They will receive their new car next week.
        ],
        correctAnswers: ['skal gå', 'skal få'],
        translations: {
            eng: ['(will go)', '(will receive)'],
            pl: ['(pójdzie)', '(otrzymają)'],
            ar: ['(ستذهب)', '(سيتلقون)'],
            ger: ['(wird gehen)', '(werden bekommen)'],
            lt: ['(eis)', '(gau)'],
            ua: ['(піде)', '(отримають)'],
            sp: ['(irá)', '(recibirán)'],
        },
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 4,
        questions: [
            ['Han kjører ', '', ''],       // He drives quickly.
            ['De kommer ', '', ''],       // They will come soon.
            ['Jeg snakker norsk ', '', ''],  // I speak Norwegian now.
            ['Hun leser boken ', '', ''] // She is reading the book tonight.
        ],
        correctAnswers: ['raskt', 'snart', 'nå', 'i kveld'],
        translations: {
            eng: ['(quickly)', '(soon)', '(now)', '(tonight)'],
            pl: ['(szybko)', '(wkrótce)', '(teraz)', '(dzisiaj wieczorem)'],
            ar: ['(بسرعة)', '(قريباً)', '(الآن)', '(هذا المساء)'],
            ger: ['(schnell)', '(bald)', '(jetzt)', '(heute Abend)'],
            lt: ['(greitai)', '(netrukus)', '(dabar)', '(šį vakarą)'],
            ua: ['(швидко)', '(скоро)', '(зараз)', '(сьогодні ввечері)'],
            sp: ['(rápidamente)', '(pronto)', '(ahora)', '(esta noche)']
        }
    }
    
    
    

        
];