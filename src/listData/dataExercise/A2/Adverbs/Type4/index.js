export default dataObj = [

    {
        typeOfScreen: '4',
        nuberOfQuestions: 4,
        questions: [
            ['Han kjører ', '', ''],       // He drives quickly.
            ['De kommer ', '', ''],       // They will come soon.
            ['Jeg snakker norsk ', '', ''],  // I speak Norwegian now.
            ['Hun leser boken ', '', ''] // She is reading the book tonight.
        ],
        correctAnswers: [['fort', 'raskt'], ['snart'], ['nå'], ['i kveld']],
        translations: {
            eng: ['quickly', 'soon', 'now', 'tonight'],
            pl: ['szybko', 'wkrótce', 'teraz', 'dzisiaj wieczorem'],
            ar: ['بسرعة', 'قريباً', 'الآن', 'هذا المساء'],
            ger: ['schnell', 'bald', 'jetzt', 'heute Abend'],
            lt: ['greitai', 'netrukus', 'dabar', 'šį vakarą'],
            ua: ['швидко', 'скоро', 'зараз', 'сьогодні ввечері'],
            sp: ['rápidamente', 'pronto', 'ahora', 'esta noche']
        }
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 4,
        questions: [
            ['De spiser ', 'hjemme.'],       // They eat at home.
            ['Han jobber ', 'sent.'],        // He works late.
            ['Vi reiser ', ''],     // We travel tomorrow.
            ['Hun studerer ', 'flittig.'],   // She studies diligently.
        ],
        correctAnswers: [['vanligvis'], ['ofte'], ['snart'], ['alltid']],
        translations: {
            eng: ['usually', 'often', 'soon', 'always'],
            pl: ['zazwyczaj', 'często', 'wkrótce', 'zawsze'],
            ar: ['عادةً', 'غالباً', 'قريباً', 'دائماً'],
            ger: ['gewöhnlich', 'oft', 'bald', 'immer'],
            lt: ['paprastai', 'dažnai', 'netrukus', 'visada'],
            ua: ['зазвичай', 'часто', 'незабаром', 'завжди'],
            sp: ['usualmente', 'a menudo', 'pronto', 'siempre']
        }
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 3,
        questions: [
            ['Han har en ', 'bil.'],            // He has a _____ car.
            ['Hun har en ', 'kjole.'],          // She has a _____ dress.
            ['De spiste en ', 'middag.']        // They ate a _____ dinner.
        ],
        correctAnswers: [['stor'], ['rød'], ['deilig']],
        translations: {
            eng: ['big', 'red', 'delicious'],
            pl: ['duży', 'czerwona', 'pyszny'],
            ar: ['كبير', 'أحمر', 'لذيذ'],
            ger: ['groß', 'rot', 'lecker'],
            lt: ['didelis', 'raudona', 'skanus'],
            ua: ['великий', 'червона', 'смачний'],
            sp: ['grande',  'rojo', 'delicioso']
        }
    },
    {
        typeOfScreen: '4',
        nuberOfQuestions: 3,
        questions: [
            ['Været var ', 'og kaldt.'],         // The weather was _____ and cold.
            ['Dette problemet er ', 'å løse.'],  // This problem is _____ to solve.
            ['Hun følte seg ', 'etter nyheten.'], // She felt _____ after the news.
        ],
        correctAnswers: [['grått'], ['vanskelig'], ['sjokkert']],
        translations: {
            eng: ['gray', 'difficult', 'shocked'],
            pl: ['szary', 'trudny', 'zszokowana'],
            ar: ['رمادي', 'صعب', 'مصدومة'],
            ger: ['grau', 'schwierig', 'geschockt'],
            lt: ['pilkas', 'sunku', 'sukrėstas'],
            ua: ['сірий', 'складно', 'шокована'],
            sp: ['gris', 'difícil', 'sorprendida']
        }
    }
];