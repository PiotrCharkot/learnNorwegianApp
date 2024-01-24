export default dataObj = [
    {
    typeOfScreen: '5',
    correctAnswers: [[false, true, false, false], [false, true, true, false], [false, false, true, false], [false, false, true, false]],
    allAnswers: ['meg', 'oss', 'dere', 'deg', 'ønsker', 'kommer til å', 'skal', 'trenger', 'dere', 'deg', 'meg', 'seg', 'oss', 'dere', 'seg', 'deg'],
    nuberOfQuestions: 4,
    questions: ['Vi skynder _______ til stasjonen.', 'Jeg _______ dra på ferie snart.', 'Jeg gleder _______ til å se deg igjen.', 'Faren min barberer _______ hver dag.'],
    instructions: {
        eng: 'Choose good anwer out of two from data base type 5',
        pl: 'polskie instrukcje baza danych type 5',
        ar: 'سيارة',
        ger: 'ein Auto type 5',
        lt: 'automobilis type 5',
        ua: 'автомобіль type 5', 
        sp: 'un coche type 5',
    }
   },
   {
    typeOfScreen: '5',
    correctAnswers: [[false, false, true, false], [false, false, true, false]],
    allAnswers: ['dere', 'deg', 'meg', 'seg', 'oss', 'dere', 'seg', 'deg'],
    nuberOfQuestions: 2,
    questions: ['Jeg gleder _______ til å se deg igjen.', 'Faren min barberer _______ hver dag.']
   },
   {
    typeOfScreen: '5',
    nuberOfQuestions: 4,
    questions: [
        'Det _______ regne i morgen.',
        'Neste år _______ jeg starte et nytt kurs.',
        'Meteorologen sier at det _______ snø neste uke.',
        'Vi _______ arrangere en fest til helgen.'
    ],
    allAnswers: ['skal', 'kommer til å', '', '', 'skal', 'kommer til å', '', '', 'skal', 'kommer til å', '', '', 'skal', 'kommer til å', '', '',],
    correctAnswers: [
        [false, true, false, false],  // 'Det kommer til å regne i morgen.'
        [true, false, false, false],  // 'Neste år skal jeg starte et nytt kurs.'
        [false, true, false, false],  // 'Meteorologen sier at det kommer til å snø neste uke.'
        [true, true, false, false]   // 'Vi skal arrangere en fest til helgen.'
    ],
},
];

