export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Han ________ en bok nå.', // reads a book now
            'Hun ________ i parken hver dag.', // runs in the park every day
            'Vi ________ norsk sammen.', // study Norwegian together
            
        ],
        allAnswers: ['leser', 'tror', 'tenker', 'leker', 'skriver', 'loper', 'får', 'løper', 'sitter', 'drømmer', 'studerer', 'liker'],
        correctAnswers: [
            [true, false, false, false], // 'leser'
            [false, false, false, true], // 'løper'
            [false, false, true, false], // 'studerer'
            
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Hun ________ norsk på kveldene.', // studies Norwegian in the evenings
            'Bussen ________ klokken åtte.', // leaves at eight o'clock
            'Han ________ kaffe om morgenen.', // drinks coffee in the morning
        ],
        allAnswers: ['studere', 'ønsker', 'studerer', 'spiser', 'løper', 'leker', 'sover','forlater', 'drikker', 'spør', 'ber', 'spiller'],
        correctAnswers: [
            [false, false, true, false], // 'studerer'
            [false, false, false, true], // 'forlater'
            [true, false, false, false], // 'drikker'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Han ________ alltid tidlig.', // wakes up always early
            'Vi ________ mye kaffe hver dag.', // drink a lot of coffee every day
            'Læreren ________ spennende historier.', // tells exciting stories
        ],
        allAnswers: ['flytter', 'gir', 'våkner', 'tenker', 'løper', 'spiser', 'løper', 'drikker', 'forteller', 'låner', 'flyr', 'fortelle'],
        correctAnswers: [
            [false, false, true, false], // 'våkner'
            [false, false, false, true], // 'drikker'
            [true, false, false, false], // 'forteller'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Hun ________ alltid tidlig til jobben.', // arrives always early to work
            'Fuglene ________ utenfor vinduet mitt.', // sing outside my window
            'Vi ________ på en ny restaurant i kveld.', // are eating at a new restaurant tonight
        ],
        allAnswers: ['ankommer', 'tror', 'bruker', 'sender', 'forteller', 'kjører', 'synger', 'jobber', 'leker', 'spiller', 'spiser', 'studere'],
        correctAnswers: [
            [true, false, false, false], // 'ankommer'
            [false, false, true, false], // 'synger'
            [false, false, true, false], // 'spiser'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Barna ________ seg for skolen nå.', // The children are getting ready for school now.
            'Han ________ godt norsk etter ett år.', // He speaks good Norwegian after one year.
            'Vi ________ til musikk når vi jobber.', // We listen to music when we work.
        ],
        allAnswers: ['drikker', 'tilbringer', 'forbereder', 'lytter', 'snakker', 'spiser', 'leker', 'gir', 'lyter', 'bor', 'tenker', 'lytter'],
        correctAnswers: [
            [false, false, true, false], // 'forbereder'
            [true, false, false, false], // 'snakker'
            [false, false, false, true], // 'lytter'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Han ________ fotball hver lørdag.', // He plays football every Saturday.
            'Vi ________ norsk på språkskolen.', // We learn Norwegian at the language school.
            'Hunden vår ________ når den er glad.', // Our dog barks when it's happy.
        ],
        allAnswers: ['våkner', 'forteller', 'spiller', 'løper', 'synger', 'danser', 'leker', 'lærer', 'tenker', 'bjeffer', 'snakker', 'tror'],
        correctAnswers: [
            [false, false, true, false], // 'spiller'
            [false, false, false, true], // 'lærer'
            [false, true, false, false], // 'bjeffer'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Barna ________ med sine leker.', // play with their toys
            'Katten ________ på sofaen.', // sleeps on the sofa
        'Jeg ________ til musikk.', // listen to music
        ],
        allAnswers: ['leser', 'løper', 'studerer', 'leker', 'sover', 'lærer', 'tar', 'bjeffer', 'gir', 'sykler', 'bor', 'lytter'],
        correctAnswers: [
            [false, false, false, true], // 'leker'
            [true, false, false, false], // 'sover'
        [false, false, false, true], // 'lytter'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'De ________ fotball i parken.', // play football in the park
        'Katten ________ på vinduskarmen.', // sits on the windowsill
            'Barna ________ seg for skolen.', // prepare themselves for school
        ],
        allAnswers: ['ber', 'spiller', 'vasker', 'går', 'tar', 'gjør', 'gir', 'sitter', 'tror', 'forbereder', 'bor', 'forberede'],
        correctAnswers: [
        [false, true, false, false], // 'spiller'
            [false, false, false, true], // 'sitter'
            [false, true, false, false] // 'forbereder'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Bussen ________ hvert tiende minutt.', // runs every ten minutes
            'De ________ fotball hver søndag.', // play football every Sunday
        'De ________ mye tid sammen i helgene.', // They spend a lot of time together on weekends.
        ],
        allAnswers: ['kjører', 'synger', 'spiser', 'drikker', 'leker', 'jobber', 'studere', 'spiller', 'spør', 'tilbringer', 'tenker', 'tror'],
        correctAnswers: [
            [true, false, false, false], // 'kjører'
            [false, false, false, true], // 'spiller'
            [false, true, false, false], // 'tilbringer'
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Om morgenen ________ hun alltid kaffe.', // In the morning, she always drinks coffee.
        'Hver morgen ________ jeg og jogger.', // Every morning, I wake up and jog.
            'De ________ alltid gode historier.', // They always tell good stories.
        ],
        allAnswers: ['løper', 'viser', 'bor', 'drikker', 'våkner', 'ønsker', 'tror', 'tenker', 'leker', 'forteller', 'spør', 'kjører'],
        correctAnswers: [
            [false, false, false, true], // 'drikker'
        [true, false, false, false], // 'våkner'
            [false, true, false, false], // 'forteller'
        ],
    },
];