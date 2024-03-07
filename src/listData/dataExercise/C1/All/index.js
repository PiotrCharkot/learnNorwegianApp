export default dataObj = [

    {
        typeOfScreen: '5',
        nuberOfQuestions: 2,
        questions: [
            'Den _______ planen måtte justeres.', // original
            'Alle de _______ gjestene kom til festen.', // invited
        ],
        allAnswers: [
            'opprinnelige', 'opprinnelig', '', '', // for the second question
            'invitert', 'inviterte', 'inviterer', 'invitere' // for the third question
        ],
        correctAnswers: [
            [true, false, false, false], // 'opprinnelige' for the original plan
            [false, true, false, false], // 'inviterte' for the invited guests
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 3,
        questions: [
            'Hun så en _______ mann på gaten.', // running
            'Den _______ broen må repareres snart.', // broken
            'En _______ fugl satt utenfor vinduet.', // singing
        ],
        allAnswers: [
            'løper', 'løpet', 'løpende', 'løpe', // for the first question
            'ødelegger', 'ødelegge', 'ødelagt', 'ødelagte', // for the fourth question
            'synget', 'syngende', 'synger', 'synge', // for the second question
        ],
        correctAnswers: [
            [false, false, true, false], // 'løpende' for the running man
            [false, false, false, true],  // 'ødelagte' for the broken bridge
            [false, true, false, false], // 'syngende' for the singing bird
        ],
    },
    {
        typeOfScreen: '5',
        nuberOfQuestions: 4,
        questions: [
            'De oppdaget en _______ tallerken på himmelen.', // flying
            'De fant et _______ rom, fylt med antikviteter.', // lit
            'Den _______ døren førte til en hemmelig hage.', // closed
            'Etter stormen var veien helt _______ .', // blocked
        ],
        allAnswers: [
            'flyvet', 'flyvende', 'flyver', 'flyves', // for the third question
            'opplyste', 'opplyse', 'opplysende', 'opplyst', // for the first question
            'stengte', 'stengt', 'stenge', 'stengende', // for the third question
            'blokkerer', 'blokkerte', 'blokkert', 'blokkerende' // for the fourth question
        ],
        correctAnswers: [
            [false, true, false, false], // 'flyvende' for the flying saucer
            [false, false, false, true], // 'opplyst' for the lit room
            [true, false, false, false], // 'stengte' for the closed door
            [false, false, true, false]  // 'blokkert' for the blocked road
        ],
    }
];