export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: ['I butikken kjøpte hun _______ poser med mel.', 'På kjøkkenet trenger vi _______ sukker for å bake kaken.'],
        allAnswers: ['mange', 'mye', 'noe', 'en', 'mange', 'litt', 'flere', 'ingen'],
        correctAnswers: [
            [true, false, false, false], 
            [false, true, false, false]
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: ['På bordet ligger det _______ epler.', 'I kjøleskapet er det _______ melk.'],
        allAnswers: ['få', 'en', 'mange', 'mye', 'mye', 'mange', 'ingenting', 'flere'],
        correctAnswers: [
            [true, false, true, false], 
            [true, false, false, false]
        ],
            instructions: {
                eng: 'For each question, one or more options may be correct. Choose all that apply.',
                pl: 'Dla każdego pytania jedna lub więcej opcji może być poprawna. Wybierz wszystkie pasujące.',
                ar: 'لكل سؤال، قد تكون إحدى الخيارات أو أكثر صحيحة اختر كل ما ينطبق',
                ger: 'Für jede Frage können eine oder mehrere Optionen richtig sein. Wähle alle zutreffenden aus.',
                lt: 'Kiekvienam klausimui vienas ar daugiau variantų gali būti teisingi. Pasirinkite visus tinkamus.',
                ua: 'Для кожного питання один або декілька варіантів можуть бути правильними. Виберіть усі, що застосовуються.', 
                sp: 'Para cada pregunta, una o más opciones pueden ser correctas. Elige todas las que apliquen.',
            },
    }
    
];