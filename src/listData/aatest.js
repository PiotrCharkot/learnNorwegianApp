const myObject = {
    adverbs: {
        type1: [
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Han snakker ', 'fort', 'svak', ' når han er nervøs.'],
                    ['Hun våkner ', 'tidlig', 'tørr', ' hver dag for å trene.'],
                    ['Barna leker ', 'trist', 'ute', ' i parken hver ettermiddag.'],
                    ['Vi reiser ', 'billig', 'alltid', ' til fjellet om vinteren.'],
                    ['Hun lytter ', 'oppmerksomt', 'flat', ' til læreren i klassen.'],
                ],
                correctAnswers: [1, 1, 2, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 4,
                questions: [
                    ['Han leser ', 'sjelden', 'tomt', ' om kvelden.'],
                    ['Hun synger ', 'tørke', 'høyt', ' i dusjen.'],
                    ['Barnet sover ', 'stille', 'bråkete', ' om natten.'],
                    ['Vi går ', 'raskt', 'billig', ' til butikken.'],
                ],
                correctAnswers: [1, 2, 1, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 4,
                questions: [
                    ['De går ', 'raskt', 'glatt', ' når det regner.'],
                    ['Han ler ', 'fort', 'høyt', ' når han ser en komedie.'],
                    ['Barna spiser ', 'sint', 'ofte', ' etter skolen.'],
                    ['Vi reiser ', 'neste uke', 'dårlig', ' til hytta.'],
                ],
                correctAnswers: [ 1, 2, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Han synger ', 'fort', 'stille', ' i dusjen.'],
                    ['Hun jobber ', 'hardt', 'skitten', ' hver dag på kontoret.'],
                    ['Barna leser ', 'sammen', 'skarp', ' bøker på biblioteket.'],
                    ['Vi møtes ', 'tidlig', 'raskt', ' i parken.'],
                    ['Hun går ', 'mørkt', 'aldri', ' til trening på mandager.'],
                ],
                correctAnswers: [2, 1, 1, 1, 2],
            },
        ],
        type2: [
            {
                typeOfScreen: '2',
                correctAnswers: ['snakker tydelig', 'løper fort', 'leker stille', 'smiler bredt', 'reiser langt'],
                leftSideWords: ['snakker ', 'løper ', 'leker ', 'smiler ', 'reiser '],
                rightSideWords: ['fort', 'tydelig', 'bredt', 'langt', 'stille']
            },
            {
                typeOfScreen: '2',
                correctAnswers: ['sover dypt', 'reiser ofte', 'lese raskt', 'snakker lavt', 'tenker positivt'],
                leftSideWords: ['sover ', 'reiser ', 'lese ', 'snakker ', 'tenker '],
                rightSideWords: ['ofte', 'positivt', 'lavt', 'raskt', 'dypt']
            },
            {
                typeOfScreen: '2',
                correctAnswers: ['jobber effektivt', 'kjører forsiktig', 'lærer grundig', 'gråter stille', 'danser vakkert'],
                leftSideWords: ['jobber ', 'kjører ', 'lærer ', 'gråter ', 'danser '],
                rightSideWords: ['effektivt', 'forsiktig', 'grundig', 'stille', 'vakkert']
            },
            {
                typeOfScreen: '2',
                correctAnswers: ['tenker kreativt', 'hører tydelig', 'går raskt', 'smiler varmt', 'synger klart'],
                leftSideWords: ['tenker ', 'hører ', 'går ', 'smiler ', 'synger '],
                rightSideWords: ['tydelig', 'klart', 'kreativt', 'raskt', 'varmt']
            },
            {
                typeOfScreen: '2',
                correctAnswers: ['løper raskt', 'taler høyt', 'tenker dypt', 'reiser ofte', 'sover lenge'],
                leftSideWords: ['løper ', 'taler ', 'tenker ', 'reiser ', 'sover '],
                rightSideWords: ['dypt', 'raskt', 'høyt', 'lenge', 'ofte']
            },
            {
                typeOfScreen: '2',
                correctAnswers: ['smiler bredt', 'går fort', 'reiser sjelden', 'arbeider hardt', 'leker stille'],
                leftSideWords: ['smiler ', 'går ', 'reiser ', 'arbeider ', 'leker '],
                rightSideWords: ['sjelden', 'bredt', 'stille', 'fort', 'hardt']
            },
            {
                typeOfScreen: '2',
                correctAnswers: ['kjører forsiktig', 'synger vakkert', 'lærer grundig', 'smiler bredt', 'tenker positivt'],
                leftSideWords: ['kjører ', 'synger ', 'lærer ', 'smiler ', 'tenker '],
                rightSideWords: ['forsiktig', 'vakkert', 'grundig', 'bredt', 'positivt']
            },    
        ],
        type3: [
            {
                typeOfScreen: '3',
                correctAnswers: ['Mia', 'går', 'sakte', 'i', 'parken.', 'Hun', 'ser', 'ofte', 'på', 'blomstene', 'og', 'lytter', 'alltid', 'til', 'fuglene.', 'I', 'dag', 'finner', 'hun', 'en', 'katt', 'som', 'spinner', 'rolig', 'ved', 'et', 'tre.'],
                wordsWithGaps: ['Mia', '            ', 'sakte', 'i', 'parken.', 'Hun', 'ser', '            ', 'på', 'blomstene', 'og', '            ', 'alltid', 'til', 'fuglene.', 'I', 'dag', 'finner', 'hun', 'en', 'katt', 'som', 'spinner', '            ', 'ved', 'et', 'tre.', '!!!', 'lytter', 'rolig', 'går', 'ofte'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Petter', 'jobber', 'vanligvis', 'i', 'en', 'butikk', 'men', 'idag', 'er', 'han', 'syk.', 'Han', 'ligger', 'stille', 'i', 'sengen', 'og', 'ser', 'på', 'TV.', 'Han', 'drikker', 'te', 'og', 'håper', 'å', 'føle', 'seg', 'bedre', 'snart.', 'Utenfor', 'snør', 'det', 'rolig', 'og', 'barna', 'leker', 'lykkelig', 'i', 'snøen.'],
                wordsWithGaps: ['Petter', 'jobber', '            ', 'i', 'en', 'butikk', 'men', 'idag', 'er', 'han', 'syk.', 'Han', 'ligger', '            ', 'i', 'sengen', 'og', 'ser', 'på', 'TV.', 'Han', 'drikker', 'te', 'og', 'håper', 'å', 'føle', 'seg', '            ', 'snart.', 'Utenfor', 'snør', 'det', 'rolig', 'og', 'barna', 'leker', '            ', 'i', 'snøen.', '!!!', 'bedre', 'stille', 'vanligvis', 'lykkelig'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Lars', 'står', 'tidlig', 'opp', 'hver', 'morgen', 'og', 'spiser', 'fort', 'frokost.', 'Han', 'jobber', 'hardt', 'på', 'kontoret', 'og', 'kommer', 'sent', 'hjem.', 'Om', 'kvelden', 'leker', 'han', 'ofte', 'med', 'sin', 'hund', 'og', 'leser', 'stille', 'før', 'han', 'sover.'],
                wordsWithGaps: ['Lars', 'står', '            ', 'opp', 'hver', 'morgen', 'og', 'spiser', 'fort', 'frokost.', 'Han', 'jobber', '            ', 'på', 'kontoret', 'og', 'kommer', '            ', 'hjem.', 'Om', 'kvelden', 'leker', 'han', '            ', 'med', 'sin', 'hund', 'og', 'leser', 'stille', 'før', 'han', 'sover.', '!!!', 'sent', 'ofte', 'hardt', 'raskt', 'tidlig'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Anna', 'studerer', 'på', 'biblioteket.', 'Hun', 'snakker', 'sjelden', 'høyt', 'og', 'går', 'alltid', 'forsiktig', 'med', 'bøkene.', 'Hver', 'ettermiddag', 'spaserer', 'hun', 'langsomt', 'hjem', 'og', 'tenker', 'ofte', 'på', 'dagen.', 'Hun', 'sover', 'alltid', 'godt', 'etter', 'en', 'produktiv', 'dag.'],
                wordsWithGaps: ['Anna', 'studerer', 'på', 'biblioteket.', 'Hun', 'snakker', '            ', 'høyt', 'og', 'går', '            ', 'forsiktig', 'med', 'bøkene.', 'Hver', 'ettermiddag', 'spaserer', 'hun', '            ', 'hjem', 'og', 'tenker', 'ofte', 'på', 'dagen.', 'Hun', 'sover', 'alltid', 'godt', 'etter', 'en', '            ', 'dag.', '!!!', 'produktiv', 'sjelden', 'langsomt', 'alltid',],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Ole', 'går', 'vanligvis', 'til', 'skolen', 'men', 'idag', 'sykler', 'han', 'raskt', 'fordi', 'han', 'våknet', 'sent', '.', 'På', 'skolen', 'svarer', 'han', 'alltid', 'nøye', 'på', 'lærerens', 'spørsmål.', 'Etter', 'skolen', 'spiller', 'han', 'fotball', 'med', 'vennene', 'sine.', 'Hjemme', 'hjelper', 'han', 'gjerne','med', 'middagen.'],
                wordsWithGaps: ['Ole', 'går', '            ', 'til', 'skolen', 'men', 'idag', 'sykler', 'han', '            ', 'fordi', 'han', 'våknet', '            ', '.', 'På', 'skolen', 'svarer', 'han', 'alltid', '            ', 'på', 'lærerens', 'spørsmål.', 'Etter', 'skolen', 'spiller', 'han', 'fotball', 'med', 'vennene', 'sine.', 'Hjemme', 'hjelper', 'han', '            ', 'med', 'middagen.', '!!!', 'sent', 'gjerne', 'raskt', 'vanligvis', 'nøye'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Kari', 'leser', 'stille', 'på', 'biblioteket.', 'Hun', 'skriver', 'alltid', 'nøye', 'notater.', 'Etter', 'timene', 'snakker', 'hun', 'ofte', 'med', 'vennene', 'sine', 'om', 'lekser.', 'Hun', 'går', 'raskt', 'hjem', 'og', 'spiser', 'middag', 'tidlig', 'med', 'familien', 'sin.'],
                wordsWithGaps: ['Kari', 'leser', 'stille', 'på', 'biblioteket.', 'Hun', 'skriver', 'alltid', '            ', 'notater.', 'Etter', 'timene', 'snakker', 'hun', '            ', 'med', 'vennene', 'sine', 'om', 'lekser.', 'Hun', 'går', '            ', 'hjem', 'og', 'spiser', 'middag', '            ', 'med', 'familien', 'sin.', '!!!', 'ofte', 'nøye', 'tidlig', 'raskt'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Magnus', 'spiser', 'frokost', 'på', 'kjøkkenet', 'hver', 'morgen.', 'I', 'dag', 'går', 'han', 'til', 'jobben', 'under', 'den', 'klare', 'himmelen.', 'Han', 'jobber', 'effektivt', 'og', 'fullfører', 'oppgavene', 'før', 'lunsj.', 'Etter', 'arbeid', 'møter', 'han', 'venner', 'på', 'en', 'kafé', 'i', 'byen.', 'De', 'diskuterer', 'ofte', 'politikk', 'og', 'sport', '.'],
                wordsWithGaps: ['Magnus', 'spiser', 'frokost', 'på', 'kjøkkenet', '            ', 'morgen.', 'I', 'dag', 'går', 'han', 'til', 'jobben', '            ', 'den', 'klare', 'himmelen.', 'Han', 'jobber', '            ', 'og', 'fullfører', 'oppgavene', '            ', 'lunsj.', 'Etter', 'arbeid', 'møter', 'han', 'venner', 'på', 'en', 'kafé', 'i', 'byen.', 'De', 'diskuterer', '            ', 'politikk', 'og', 'sport', '.', '!!!', 'sjelden', 'hver', 'før', 'ofte', 'effektivt', 'under'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Lars', 'bor', 'i', 'en', 'liten', 'by', 'ved', 'havet.', 'Hver', 'morgen', 'ser', 'han', 'den', 'fantastiske', 'soloppgangen', 'mens', 'han', 'drikker', 'sin', 'kaffe.', 'Han', 'jobber', 'som', 'fisker', 'og', 'drar', 'tidlig', 'ut', 'med', 'sin', 'gamle', 'båt.', 'På', 'kveldene', 'går', 'han', 'ofte', 'lange', 'turer', 'langs', 'den', 'sanddekte', 'stranden.'],
                wordsWithGaps: ['Lars', 'bor', 'i', 'en', 'liten', 'by', '            ', 'havet.', 'Hver', 'morgen', 'ser', 'han', 'den', 'fantastiske', 'soloppgangen', '            ', 'han', 'drikker', 'sin', 'kaffe.', 'Han', 'jobber', 'som', 'fisker', 'og', 'drar', '            ', 'ut', 'med', 'sin', '            ', 'båt.', 'På', 'kveldene', 'går', 'han', 'ofte', '            ', 'turer', 'langs', 'den', 'sanddekte', 'stranden.', '!!!',  'gamle', 'mens', 'ved', 'lange', 'tidlig'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            }
        ],
        type4: [
            {
                typeOfScreen: '4',
                nuberOfQuestions: 2,
                questions: [
                    ['Vannet er ', 'kaldt.'], 
                    ['De snakker ', 'norsk.']
                ],
                correctAnswers: [['veldig'], ['flytende']],
                translations: {
                    eng: ['very', 'fluently'],
                    pl: ['bardzo', 'płynnie'],
                    ar: ['جداً', 'بطلاقة'],
                    ger: ['sehr', 'fließend'],
                    lt: ['labai', 'sklandžiai'],
                    ua: ['дуже', 'вільно'],
                    sp: ['muy', 'fluentemente'],
                },
            },
            {
                typeOfScreen: '4',
                nuberOfQuestions: 2,
                questions: [
                    ['Han snakker ', ''], 
                    ['Kaken smaker ', ''] 
                ],
                correctAnswers: [['sakte'], ['deilig']],
                translations: {
                    eng: ['slowly', 'deliciously'],
                    pl: ['wolno', 'pysznie'],
                    ar: ['ببطء', 'لذيذاً'],
                    ger: ['langsam', 'köstlich'],
                    lt: ['lėtai', 'skaniai'],
                    ua: ['повільно', 'смачно'],
                    sp: ['lentamente', 'deliciosamente'],
                },
            },
            {
                typeOfScreen: '4',
                nuberOfQuestions: 2,
                questions: [
                    ['Månen skinner ', 'i natt.'],     
                    ['Barnet sover ', 'nå.'],     
                ],
                correctAnswers: [['klart'], ['dypt']],
                translations: {
                    eng: ['clearly', 'deeply'],
                    pl: ['jasno', 'głęboko'],
                    ar: ['بوضوح', 'بعمق'],
                    ger: ['klar', 'tief'],
                    lt: ['aiškiai', 'giliai'],
                    ua: ['ясно', 'глибоко'],
                    sp: ['claramente', 'profundamente'],
                },
            }
        ],
        type5: [
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
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 4,
                questions: [
                    'Hun er en _______ lærer.',
                    'Barnet sov _______ i den komfortable sengen.',
                    'Vi spiste en _______ middag.',
                    'Hun snakker engelsk og reiser _______.'
                ],
                allAnswers: ['tålmodig', 'sjelden', 'tydelig', 'bredt',
                    'raskt', 'rolig', 'plutselig', 'mørk',
                    'lykkelig', 'sulten', 'opptatt','deilig', 
                    'mørk', 'ofte', 'tålmodig', 'mykt'],
                correctAnswers: [
                    [true, false, false, false],  
                    [false, true, false, false], 
                    [false, false, false, true],  
                    [false, true, false, false],  
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 4,
                questions: [
                    'Bussen kommer _______.',
                    'Hun smiler alltid så _______.',
                    'Kaffen smaker _______.',
                    'Han leser boken _______.'
                ],
                allAnswers: ['snart', 'glad', 'veldig', 'mykt', 
                    'tung', 'lykkelig', 'mørk', 'ledig', 
                    'plutselig', 'raskt', 'rent', 'fantastisk',
                    'opptatt', 'stille', 'nesten', 'varmt'],
                correctAnswers: [
                    [true, false, false, false],  
                    [false, true, false, false],  
                    [false, false, false, true],  
                    [false, true, false, false],
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 4,
                questions: [
                    'Været er _______ i dag.',
                    'Barnet leser boken _______.',
                    'Maten lukter _______.',
                    'De går _______ i parken.'
                ],
                allAnswers: ['vakkert', 'ute', 'inne', 'sent',
                    'alltid', 'søt', 'høyt', 'sulten', 
                    'trist', 'sjelden', 'nøye', 'deilig', 
                    'ledig', 'dyrt', 'sakte', 'billig'],
                correctAnswers: [
                    [true, false, false, false],  
                    [false, false, true, false],  
                    [false, false, false, true], 
                    [false, false, true, false], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Katten vår er veldig _______.',
                    'Han svarer alltid _______ på spørsmål.',
                    'Hun studerer _______ for eksamen.'
                ],
                allAnswers: [ 'skarp', 'koselig', 'sliten', 'flat', 
                    'tørr', 'dyrt', 'fornøyd', 'glatt',
                    'dårlig', 'grundig', 'lyst', 'lavt'],
                correctAnswers: [
                    [false, true, false, false], 
                    [false, false, true, false],  
                    [false, true, false, false],
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Bilen kjører veldig _______.',
                    'De lærer norsk _______.',
                    'Han kjører _______ til jobb.',
                ],
                allAnswers: ['klart', 'punktlig', 'fort', 'høyt', 
                    'sliten', 'stadig', 'koselig', 'kaldt',
                    'hardt', 'forsiktig', 'tålmodig', 'sammen'],
                correctAnswers: [
                    [false, false, true, false], 
                    [false, true, false, false],  
                    [false, true, false, false], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Hun venter _______ på bussen.',
                    'De snakker _______ om politikk.',
                    'Hun lager mat _______.'
                ],
                allAnswers: [ 
                    'snart', 'bredt', 'tydelig', 'tålmodig', 
                    'mett', 'glatt', 'ofte', 'dårlig', 
                    'kort', 'raskt', 'stort', 'høyt'],
                correctAnswers: [
                    [false, false, false, true],  
                    [false, false, true, false], 
                    [false, true, false, false], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Han snakker _______ når han er nervøs.',
                    'Vannet føles _______ i dag.',
                    'De møtes _______ på kafeen.',
                ],
                allAnswers: ['raskt', 'kjølig', 'ung', 'trist', 
                    'bred', 'kaldt', 'tomt', 'nytt', 
                    'sint', 'skarp', 'vanligvis', 'sur',],
                correctAnswers: [
                    [true, false, false, false],  
                    [false, true, false, false], 
                    [false, false, true, false],  
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 4,
                questions: [
                    'Hun kjører _______ fordi veiene er glatte.',
                    'Barna spiser _______ om morgenen.',
                    'Han jobber _______ hele dagen.',
                    'Været er _______ i juli.',
                ],
                allAnswers: ['forsiktig', 'trøtt', 'sunn', 'tykk',
                    'tørst', 'raskt', 'kjedelig', 'rik', 
                    'tynn', 'farlig', 'hardt', 'mulig', 
                    'lokal', 'sjalu', 'stiv', 'varmt'],
                correctAnswers: [
                    [true, false, false, false], 
                    [false, true, false, false],  
                    [false, false, true, false], 
                    [false, false, false, true], 
                ],
            }
        ],
        type6: [
            {
                typeOfScreen: '6',
                leftTitle: 'adverb',
                rightTitle: 'verb',
                correctAnswers: [
                    ['raskt', 'sakte', 'høyt', 'lavt', 'godt'],
                    ['løper', 'går', 'snakker', 'hvisker', 'smaker']
                ],
                words: [
                    '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 
                    'snakker', 'hvisker', 'raskt', 'løper', 'sakte', 'høyt', 'godt', 'går', 'smaker', 'lavt'
                ]
            },
            {
                typeOfScreen: '6',
                leftTitle: 'adverb',
                rightTitle: 'adjective',
                correctAnswers: [
                    ['veldig', 'ganske', 'altfor', 'litt', 'nesten'],
                    ['glad', 'stor', 'varm', 'tung', 'mørk']
                ],
                words: [
                    '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 
                    'tung', 'mørk', 'veldig', 'altfor', 'glad', 'litt', 'nesten', 'ganske', 'stor', 'varm', 
                ]
            },
            {
                typeOfScreen: '6',
                leftTitle: 'adverb',
                rightTitle: 'adjective',
                correctAnswers: [
                    ['alltid', 'sjelden', 'ofte', 'aldri', 'noen ganger'],
                    ['lykkelig', 'opptatt', 'ledig', 'sulten']
                ],
                words: [
                    '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 
                    'alltid', 'opptatt', 'sjelden', 'noen ganger', 
                    'lykkelig','ofte', 'ledig', 'sulten', 'aldri',
                ]
            },
            {
                typeOfScreen: '6',
                leftTitle: 'adverbs',
                rightTitle: 'adjectives',
                correctAnswers: [
                    ['raskt', 'høyt', 'lavt', 'ofte'],
                    ['rask', 'høy', 'lav', 'mørk']
                ],
                words: [
                    '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 
                    'høyt', 'høy', 'lavt', 'ofte', 
                    'rask', 'raskt', 'lav', 'mørk'
                ]
            },
            {
                typeOfScreen: '6',
                leftTitle: 'adverbs',
                rightTitle: 'adjectives',
                correctAnswers: [
                    ['raskt', 'tydelig', 'plutselig', 'ofte'],  
                    ['glad', 'stor', 'ny', 'ung']
                ],
                words: [
                    '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 
                    'raskt', 'plutselig', 'stor', 'ofte', 
                    'glad', 'ny', 'tydelig', 'ung'
                ]
            }
        ],
        type7: [
            {
                typeOfScreen: '7',
                wordsCorrect: ['En', 'liten', 'gutt', 'heter', 'Lukas.', 'Han', 'er', 'alltid', 'glad', 'og', 'smiler', 'ofte.', 'En', 'solrik', 'dag', 'gikk', 'Lukas', 'ut', 'for', 'å', 'leke.', 'Han', 'løp', 'raskt', 'til', 'parken', 'og', 'fant', 'en', 'stor,', 'fargerik', 'sommerfugl.'],
                words: ['En', 'lita', 'gutt', 'heter', 'Lukas.', 'Han', 'er', 'alltid', 'glade', 'og', 'smiler', 'ofte.', 'En', 'solrik', 'dag', 'gikte', 'Lukas', 'ut', 'for', 'å', 'leke.', 'Han', 'løp', 'rask', 'til', 'parken', 'og', 'fant', 'en', 'stort,', 'fargerik', 'sommerfugl.'],
                mistakesIndex: [] 
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['En', 'ung', 'jente,', 'som', 'heter', 'Emma,', 'bor', 'i', 'en', 'liten', 'by.', 'Hun', 'går', 'ofte', 'til', 'skolen', 'med', 'sin', 'beste', 'venn.', 'På', 'veien', 'ser', 'de', 'mange', 'vakre', 'blomster', 'og', 'hører', 'fuglene', 'synge.', 'Emma', 'er', 'alltid', 'nysgjerrig', 'og', 'stiller', 'mange', 'spørsmål.', 'Etter', 'skolen', 'leser', 'hun', 'en', 'spennende', 'bok', 'hjemme.'],
                words: ['En', 'ungt', 'jente,', 'som', 'hette', 'Emma,', 'bor', 'i', 'en', 'liten', 'by.', 'Hun', 'går', 'ofte', 'til', 'skolen', 'med', 'sin', 'beste', 'venn.', 'På', 'veien', 'ser', 'de', 'mange', 'vakker', 'blomster', 'og', 'hører', 'fuglene', 'synge.', 'Emma', 'er', 'alltid', 'nyskjerrig', 'og', 'stiller', 'mange', 'spørsmål.', 'Etter', 'skolen', 'lese', 'hun', 'en', 'spennende', 'bok', 'hjemme.'],
                mistakesIndex: [] 
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['En', 'liten', 'hund', 'leker', 'i', 'en', 'stor', 'hage.', 'Den', 'løper', 'raskt', 'etter', 'en', 'gul', 'ball.', 'Hunden', 'er', 'alltid', 'energisk', 'og', 'glad.', 'På', 'ettermiddagen', 'hviler', 'den', 'under', 'et', 'skyggefullt', 'tre.', 'Eieren', 'kommer', 'ut', 'og', 'gir', 'den', 'mat', 'og', 'friskt', 'vann.'],
                words: ['En', 'lita', 'hund', 'leker', 'i', 'en', 'stort', 'hage.', 'Den', 'løper', 'raskt', 'etter', 'en', 'gul', 'ball.', 'Hunden', 'er', 'alltid', 'energisk', 'og', 'glade.', 'På', 'ettermiddagen', 'hviler', 'den', 'under', 'et', 'skyggefullt', 'tre.', 'Eieren', 'kommer', 'ut', 'og', 'gir', 'den', 'mat', 'og', 'frisk', 'vann.'],
                mistakesIndex: [] 
            }
        ],
        type8: [],
    },
    presentTense: {
        type1: [
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Hun ', 'lagde', 'lager', ' middag nå.'], 
                    ['Vi ', 'snakkes', 'snakker', ' norsk hver dag.'], 
                    ['Katten ', 'sover', 'sove', ' på sofaen.'], 
                    ['De ', 'synger', 'synges', ' i kor hver torsdag.'], 
                    ['Han ', 'studere', 'studerer', ' norsk på universitetet.'], 
                ],
                correctAnswers: [2, 2, 1, 1, 2],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Barnet ', 'leker', 'elsker', ' i parken.'], 
                    ['Hunden ', 'sover', 'løper', ' raskt.'],
                    ['De ', 'ser', 'ses', ' en film nå.'], 
                    ['Jeg ', 'elsker', 'reiser', ' å lære norsk.'], 
                    ['Bussen ', 'ser', 'stopper', ' ved neste stasjon.'], 
                ],
                correctAnswers: [1, 2, 1, 1, 2],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Mamma ', 'lager', 'lage', ' frokost hver morgen.'], 
                    ['Vinduet ', 'har', 'er', ' åpent.'], 
                    ['Vi ', 'reiser', 'reiste', ' til Bergen i morgen.'], 
                    ['Han ', 'drikker', 'spiser', ' kaffe hver morgen.'], 
                    ['Læreren ', 'forklare', 'forklarer', ' leksjonen godt.'], 
                ],
                correctAnswers: [1, 2, 1, 1, 2],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Barna ', 'spiser', 'synger', ' frokost nå.'], 
                    ['Hun ', 'snakker', 'sykler', ' til skolen.'], 
                    ['Det ', 'regner', 'jobber', ' i dag.'], 
                    ['Han ', 'lese', 'leser', ' en bok.'], 
                    ['Vi ', 'bor', 'svarer', ' i Oslo.'], 
                ],
                correctAnswers: [1, 2, 1, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Fuglene ', 'syr', 'synger', ' om morgenen.'], 
                    ['Hun ', 'snakker', 'spiser', ' norsk og engelsk.'], 
                    ['Bilen ', 'står', 'ligger', ' utenfor huset.'], 
                    ['Klokken ', 'er', 'har', ' ni.'], 
                    ['De ', 'sover', 'jobber', ' hardt hver dag.'], 
                ],
                correctAnswers: [2, 1, 1, 1, 2],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Hunden ', 'sover', 'leser', ' under bordet.'], 
                    ['Jeg ', 'gråter', 'kjøper', ' ny sykkel.'],
                    ['Han ', 'spiller', 'sykler', ' fotball.'], 
                    ['De ', 'ser', 'synger', ' på TV.'], 
                    ['Læreren ', 'undervise', 'underviser', ' i klasserommet.'], 
                ],
                correctAnswers: [1, 2, 1, 1, 2],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Været ', 'er', 'kan', ' fint i dag.'], 
                    ['Jeg ', 'hører', 'skriver', ' musikk.'], 
                    ['Hun ', 'lage', 'lager', ' kaffe.'],
                    ['Vi ', 'studere', 'studerer', ' sammen.'], 
                    ['Barnet ', 'gråter', 'jager', ' ofte.'], 
                ],
                correctAnswers: [1, 1, 2, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Han ', 'skriver', 'tar', ' en e-post.'], 
                    ['Katten ', 'jager', 'kommer', ' en mus.'], 
                    ['De ', 'tenker', 'danser', ' i festen.'], 
                    ['Jeg ', 'får', 'lærer', ' norsk.'], 
                    ['Vi ', 'møter', 'snakker', ' venner i kveld.'], 
                ],
                correctAnswers: [1, 1, 2, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Han ', 'går', 'synes', ' til butikken.'], 
                    ['Hun ', 'snakker', 'leser', ' en bok.'], 
                    ['Bussen ', 'kommer', 'kom', ' om fem minutter.'], 
                    ['Vi ', 'prove', 'lager', ' middag sammen.'], 
                    ['Katten ', 'jager', 'tror', ' en fugl.'], 
                ],
                correctAnswers: [1, 2, 1, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Jeg ', 'snakker', 'stoler', ' med vennene mine.'], 
                    ['De ', 'studere', 'studerer', ' norsk nå.'], 
                    ['Han ', 'ser', 'sykler', ' til jobb.'], 
                    ['Hun ', 'kan', 'svarer', ' på e-posten.'], 
                    ['Vi ', 'ser', 'hører', ' på TV hver kveld.'], 
                ],
                correctAnswers: [1, 2, 2, 2, 1],
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Barnet ', 'gråter', 'gråtet', ' nå.'], 
                    ['Hunden ', 'sover', 'skriver', ' i sengen.'], 
                    ['De ', 'bor', 'spiller', ' fotball i parken.'], 
                    ['Jeg ', 'tegner', 'lærer', ' norsk.'], 
                    ['Han ', 'kjører', 'sykler', ' bilen.'], 
                ],
                correctAnswers: [1, 1, 2, 2, 1],
                instructions: {
                    eng: 'Choose the correct form in Present Tense.',
                    pl: 'Wybierz poprawną formę w czasie teraźniejszym.',
                    ar: 'اختر الصيغة الصحيحة في زمن المضارع.',
                    ger: 'Wähle die richtige Form im Präsens.',
                    lt: 'Pasirinkite teisingą formą dabarties laike.',
                    ua: 'Виберіть правильну форму в теперішньому часі.',
                    sp: 'Elige la forma correcta en tiempo presente.',
                }
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Hun ', 'tenker', 'skriver', ' en artikkel.'], 
                    ['Vi ', 'lever', 'reiser', ' til Norge.'], 
                    ['Læreren ', 'forklarer', 'drar', ' regelen.'],
                    ['Katten ', 'spiser', 'dirkker', ' maten sin.'], 
                    ['De ', 'liker', 'bor', ' i en stor by.'], 
                ],
                correctAnswers: [2, 2, 1, 1, 2],
                instructions: {
                    eng: 'Choose the correct form in Present Tense.',
                    pl: 'Wybierz poprawną formę w czasie teraźniejszym.',
                    ar: 'اختر الصيغة الصحيحة في زمن المضارع.',
                    ger: 'Wähle die richtige Form im Präsens.',
                    lt: 'Pasirinkite teisingą formą dabarties laike.',
                    ua: 'Виберіть правильну форму в теперішньому часі.',
                    sp: 'Elige la forma correcta en tiempo presente.',
                }
            },
            {
                typeOfScreen: '1',
                nuberOfQuestions: 5,
                questions: [
                    ['Han ', 'drikker', 'trekker', ' vann.'],
                    ['Vi ', 'går', 'sover', ' en tur.'], 
                    ['Hun ', 'spiser', 'synger', ' en sang.'], 
                    ['Barnet ', 'tegner', 'tegnet', ' et bilde.'], 
                    ['Klokken ', 'drar', 'er', ' ti.'], 
                ],
                correctAnswers: [1, 1, 2, 1, 2],
                instructions: {
                    eng: 'Choose the correct form in Present Tense.',
                    pl: 'Wybierz poprawną formę w czasie teraźniejszym.',
                    ar: 'اختر الصيغة الصحيحة في زمن المضارع.',
                    ger: 'Wähle die richtige Form im Präsens.',
                    lt: 'Pasirinkite teisingą formą dabarties laike.',
                    ua: 'Виберіть правильну форму в теперішньому часі.',
                    sp: 'Elige la forma correcta en tiempo presente.',
                }
            }
        ],
        type2: [
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Hun lager middag', 
                    'Vi snakker norsk', 
                    'Katten sover på sofaen', 
                    'De synger i kor', 
                    'Han studerer på universitetet'
                ],
                leftSideWords: [
                    'Hun lager ', 
                    'Vi snakker ', 
                    'Katten sover ', 
                    'De synger ', 
                    'Han studerer '
                ],
                rightSideWords: [
                    'på universitetet', 
                    'middag', 
                    'på sofaen', 
                    'i kor', 
                    'norsk'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Barna leker i parken', 
                    'Hunden løper raskt', 
                    'De ser en film nå', 
                    'Jeg elsker å lære norsk', 
                    'Bussen stopper ved neste stasjon'
                ],
                leftSideWords: [
                    'Barna leker ', 
                    'Hunden løper ', 
                    'De ser ', 
                    'Jeg elsker ', 
                    'Bussen stopper '
                ],
                rightSideWords: [
                    'raskt', 
                    'en film nå', 
                    'ved neste stasjon', 
                    'i parken', 
                    'å lære norsk'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Jeg kjøper ny sykkel', 
                    'Han spiller fotball', 
                    'Læreren underviser i klasserommet', 
                    'Vi møter venner i kveld', 
                    'Hun svarer på e-posten'
                ],
                leftSideWords: [
                    'Jeg kjøper ', 
                    'Han spiller ', 
                    'Læreren underviser ', 
                    'Vi møter ', 
                    'Hun svarer '
                ],
                rightSideWords: [
                    'venner i kveld', 
                    'i klasserommet', 
                    'på e-posten', 
                    'ny sykkel', 
                    'fotball'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Jeg hører på musikk', 
                    'Hun lager kaffe', 
                    'Vi studerer sammen', 
                    'Barnet gråter ofte', 
                    'Han skriver en e-post'
                ],
                leftSideWords: [
                    'Jeg hører ', 
                    'Hun lager ', 
                    'Vi studerer ', 
                    'Barnet gråter ', 
                    'Han skriver '
                ],
                rightSideWords: [
                    'ofte', 
                    'en e-post', 
                    'kaffe', 
                    'sammen', 
                    'på musikk'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Fuglene synger om morgenen', 
                    'Hun snakker norsk og engelsk', 
                    'Bilen står utenfor huset', 
                    'Klokken er ni', 
                    'De jobber hardt hver dag'
                ],
                leftSideWords: [
                    'Fuglene synger ', 
                    'Hun snakker ', 
                    'Bilen står ', 
                    'Klokken er ', 
                    'De jobber '
                ],
                rightSideWords: [
                    'utenfor huset', 
                    'om morgenen', 
                    'norsk og engelsk', 
                    'hardt hver dag', 
                    'ni'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Hun lager middag', 
                    'Barna leker i parken', 
                    'Vi studerer norsk', 
                    'Læreren forklarer leksjonen', 
                    'Hunden sover på sofaen'
                ],
                leftSideWords: [
                    'Hun lager ', 
                    'Barna leker ', 
                    'Vi studerer ', 
                    'Læreren forklarer ', 
                    'Hunden sover '
                ],
                rightSideWords: [
                    'i parken', 
                    'middag', 
                    'på sofaen', 
                    'norsk', 
                    'leksjonen'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Han drikker kaffe om morgenen', 
                    'Jenta tegner hjelp', 
                    'Katten jakter på en mus', 
                    'Fuglene synger utenfor vinduet', 
                    'De reiser til Norge'
                ],
                leftSideWords: [
                    'Han drikker ', 
                    'Jenta tegner ', 
                    'Katten jakter ', 
                    'Fuglene synger ', 
                    'De reiser '
                ],
                rightSideWords: [
                    'på en mus', 
                    'til Norge', 
                    'kaffe om morgenen', 
                    'hjelp', 
                    'utenfor vinduet'
                ]
            },
            {
                typeOfScreen: '2',
                correctAnswers: [
                    'Jeg hører på musikk', 
                    'Barna hopper i vannet', 
                    'Hun skriver et brev', 
                    'De diskuterer et prosjekt', 
                    'Han vasker bilen'
                ],
                leftSideWords: [
                    'Jeg hører ', 
                    'Barna hopper ', 
                    'Hun skriver ', 
                    'De diskuterer ', 
                    'Han vasker '
                ],
                rightSideWords: [
                    'i vannet',
                  'et brev',  
                    'på musikk', 
                    'bilen', 
                    'et prosjekt'
                ]
            }
        ],
        type3: [
            {
                typeOfScreen: '3',
                correctAnswers: ['Jeg', 'går', 'til', 'butikken', 'og', 'kjøper', 'brød.', 'På', 'veien', 'hjem', 'ser', 'jeg', 'en', 'katt', 'som', 'leker', 'i', 'parken.', 'Når', 'jeg', 'kommer', 'hjem', 'lager', 'jeg', 'kaffe', 'og', 'leser', 'avisen.'],
                wordsWithGaps: ['Jeg', '            ', 'til', 'butikken', 'og', '            ', 'brød.', 'På', 'veien', 'hjem', '            ', 'jeg', 'en', 'katt', 'som', '            ', 'i', 'parken.', 'Når', 'jeg', 'kommer', 'hjem', '            ', 'jeg', 'kaffe', 'og', '            ', 'avisen.', '!!!', 'leser', 'ser', 'leker', 'går', 'lager', 'kjøper'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Marius', 'bor', 'i', 'Oslo', 'og', 'jobber', 'som', 'lærer.', 'Hver', 'dag', 'går', 'han', 'til', 'skolen', 'og', 'underviser', 'barna.', 'Etter', 'jobb', 'møter', 'han', 'venner', 'eller', 'trener', 'i', 'gymmen.'],
                wordsWithGaps: ['Marius', '            ', 'i', 'Oslo', 'og', '            ', 'som', 'lærer.', 'Hver', 'dag', '            ', 'han', 'til', 'skolen', 'og', '            ', 'barna.', 'Etter', 'jobb', '            ', 'han', 'venner', 'eller', '            ', 'i', 'gymmen.', '!!!', 'trener', 'jobber', 'underviser',  'bor', 'møter', 'går'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Emma', 'reiser', 'til', 'jobben', 'med', 'buss.', 'Hun', 'elsker', 'å', 'lytte', 'til', 'musikk', 'mens', 'hun', 'venter.', 'På', 'kontoret', 'snakker', 'hun', 'med', 'kollegaer', 'og', 'drikker', 'kaffe.'],
                wordsWithGaps: ['Emma', '            ', 'til', 'jobben', 'med', 'buss.', 'Hun', '            ', 'å', 'lytte', 'til', 'musikk', 'mens', 'hun', 'venter.', 'På', 'kontoret', '            ', 'hun', 'med', 'kollegaer', 'og', '            ', 'kaffe.', '!!!', 'snakker', 'spiser', 'elsker', 'drikker', 'reiser'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Lars', 'står', 'opp', 'tidlig', 'og', 'lager', 'frokost.', 'Han', 'leser', 'avisen', 'og', 'drikker', 'te.', 'Etterpå', 'går', 'han', 'ut', 'med', 'hunden', 'sin.', 'Om', 'kvelden', 'ser', 'han', 'på', 'TV', 'eller', 'leser', 'en', 'bok.'],
                wordsWithGaps: ['Lars', '            ', 'opp', 'tidlig', 'og', '            ', 'frokost.', 'Han', 'leser', 'avisen', 'og', '            ', 'te.', 'Etterpå', '            ', 'han', 'ut', 'med', 'hunden', 'sin.', 'Om', 'kvelden', '            ', 'han', 'på', 'TV', 'eller', '            ', 'en', 'bok.', '!!!', 'ser', 'drikker', 'lager', 'leser', 'går', 'står'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Sofia', 'jobber', 'som', 'grafisk', 'designer', 'og', 'skaper', 'reklamer.', 'Hun', 'bruker', 'mange', 'timer', 'på', 'datamaskinen', 'hver', 'dag.', 'I', 'pausene', 'snakker', 'hun', 'med', 'venner', 'på', 'telefonen', 'og', 'spiser', 'lunsj.'],
                wordsWithGaps: ['Sofia', '            ', 'som', 'grafisk', 'designer', 'og', '            ', 'reklamer.', 'Hun', '            ', 'mange', 'timer', 'på', 'datamaskinen', 'hver', 'dag.', 'I', 'pausene', '            ', 'hun', 'med', 'venner', 'på', 'telefonen', 'og', '            ', 'lunsj.', '!!!', 'snakker', 'jobber', 'tenker', 'bruker', 'spiser', 'skaper'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Erik', 'reiser', 'med', 'tog', 'til', 'arbeidet', 'hver', 'morgen.', 'Han', 'nyter', 'utsikten', 'og', 'lytter', 'til', 'podcaster.', 'På', 'ettermiddagen', 'går', 'han', 'på', 'kafé', 'og', 'møter', 'venner.'],
                wordsWithGaps: ['Erik', '            ', 'med', 'tog', 'til', 'arbeidet', 'hver', 'morgen.', 'Han', '            ', 'utsikten', 'og', '            ', 'til', 'podcaster.', 'På', 'ettermiddagen', '            ', 'han', 'på', 'kafé', 'og', '            ', 'venner.', '!!!', 'lytter', 'får', 'går' , 'møter', 'nyter', 'reiser'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            },
            {
                typeOfScreen: '3',
                correctAnswers: ['Anna', 'studerer', 'biologi.', 'Hun', 'deltar', 'i', 'forskjellige', 'prosjekter', 'og', 'skriver', 'rapporter.', 'Etter', 'forelesninger', 'treffer', 'hun', 'vennene', 'sine', 'på', 'biblioteket', 'for', 'å', 'lese', 'sammen.'],
                wordsWithGaps: ['Anna', '            ', 'biologi.', 'Hun', '            ', 'i', 'forskjellige', 'prosjekter', 'og', '            ', 'rapporter.', 'Etter', 'forelesninger', '            ', 'hun', 'vennene', 'sine', 'på', 'biblioteket', 'for', 'å', '            ', 'sammen.', '!!!', 'treffer', 'lese', 'bor', 'deltar', 'skriver', 'studerer'],
                gapsIndex: [],
                textIndex: [],
                lineBreaker: [],
            }
        ],
        type4: [
            {
                typeOfScreen: '4',
                nuberOfQuestions: 4,
                questions: [
                    ['Hun ', 'en bok.'],             
                    ['Vi ', 'på skolen.'],           
                    ['Han ', 'norsk.'],              
                    ['Barna ', 'i parken.'],        
                ],
                correctAnswers: [['leser'], ['lærer'], ['snakker'], ['leker']],
                translations: {
                    eng: ['reads', 'learn', 'speaks', 'play'],
                    pl: ['czyta', 'uczą się', 'mówi', 'bawią się'],
                    ar: ['تقرأ', 'يتعلمون', 'يتحدث', 'يلعبون'],
                    ger: ['liest', 'lernen', 'spricht', 'spielen'],
                    lt: ['skaito', 'mokosi', 'kalba', 'žaidžia'],
                    ua: ['читає', 'вчаться', 'говорить', 'грають'],
                    sp: ['lee', 'aprenden', 'habla', 'juegan'],
                },
                instructions: {
                    eng: 'Type the correct verb in present tense.',
                    pl: 'Wpisz odpowiedni czasownik w czasie teraźniejszym.',
                    ar: 'اكتب الفعل الصحيح في زمن المضارع',
                    ger: 'Gib das richtige Verb im Präsens ein.',
                    lt: 'Įvesk teisingą veiksmažodį esamuoju laiku.',
                    ua: 'Введіть правильне дієслово у теперішньому часі.', 
                    sp: 'Escribe el verbo correcto en tiempo presente.',
                },
            },
            {
                typeOfScreen: '4',
                nuberOfQuestions: 4,
                questions: [
                    ['Katten ', 'melk.'],         
                    ['De ', 'i butikken.'],      
                    ['Jeg ', 'til musikk.'],      
                    ['Bilen ', 'raskt.'],   
                ],
                correctAnswers: [['drikker'], ['jobber'], ['lytter'], ['kjører']],
                translations: {
                    eng: ['drinks', 'work', 'listen', 'drives'],
                    pl: ['pije', 'pracują', 'słucha', 'jedzie'],
                    ar: ['يشرب', 'يعملون', 'يستمع', 'يقود'],
                    ger: ['trinkt', 'arbeiten', 'hört', 'fährt'],
                    lt: ['geria', 'dirba', 'klauso', 'važiuoja'],
                    ua: ['п’є', 'працюють', 'слухає', 'їде'],
                    sp: ['bebe', 'trabajan', 'escucha', 'conduce'],
                },
                instructions: {
                    eng: 'Type the correct verb in present tense.',
                    pl: 'Wpisz odpowiedni czasownik w czasie teraźniejszym.',
                    ar: 'اكتب الفعل الصحيح في زمن المضارع',
                    ger: 'Gib das richtige Verb im Präsens ein.',
                    lt: 'Įvesk teisingą veiksmažodį esamuoju laiku.',
                    ua: 'Введіть правильне дієслово у теперішньому часі.', 
                    sp: 'Escribe el verbo correcto en tiempo presente.',
                },
            },
            {
                typeOfScreen: '4',
                nuberOfQuestions: 4,
                questions: [
                    ['Fuglene ', 'tidlig.'],        
                    ['Hun ', 'en bok.'],             
                    ['Barna ', 'på skolen.'],    
                    ['Vi ', 'middag nå.'],         
                ],
                correctAnswers: [['synger'], ['leser'], ['leker'], ['lager']],
                translations: {
                    eng: ['sing', 'read', 'play', 'make'],
                    pl: ['śpiewają', 'czyta', 'bawią się', 'robią'],
                    ar: ['يغنون', 'تقرأ', 'يلعبون', 'يصنعون'],
                    ger: ['singen', 'liest', 'spielen', 'machen'],
                    lt: ['dainuoja', 'skaito', 'žaidžia', 'ruošia'],
                    ua: ['співають', 'читає', 'грають', 'готують'],
                    sp: ['cantan', 'lee', 'juegan', 'hacen'],
                },
                instructions: {
                    eng: 'Type the correct verb in present tense.',
                    pl: 'Wpisz odpowiedni czasownik w czasie teraźniejszym.',
                    ar: 'اكتب الفعل الصحيح في زمن المضارع',
                    ger: 'Gib das richtige Verb im Präsens ein.',
                    lt: 'Įvesk teisingą veiksmažodį esamuoju laiku.',
                    ua: 'Введіть правильне дієслово у теперішньому часі.', 
                    sp: 'Escribe el verbo correcto en tiempo presente.',
                },
            },
            {
                typeOfScreen: '4',
                nuberOfQuestions: 4,
                questions: [
                    ['Jeg ', 'i Oslo.'],           
                    ['Du ', 'norsk.'],             
                    ['Hunden ', 'maten.'],         
                    ['Læreren ', 'i klasserommet.'], 
                ],
                correctAnswers: [['bor'], ['snakker', 'prater'], ['spiser'], ['underviser']],
                translations: {
                    eng: ['live', 'speak', 'eats', 'teaches'],
                    pl: ['mieszka', 'mówi', 'je', 'uczy'],
                    ar: ['يعيش', 'يتحدث', 'يأكل', 'يعلم'],
                    ger: ['wohnt', 'spricht', 'isst', 'unterrichtet'],
                    lt: ['gyvena', 'kalba', 'valgo', 'moko'],
                    ua: ['живе', 'говорить', 'їсть', 'вчить'],
                    sp: ['vive', 'habla', 'come', 'enseña'],
                },
                instructions: {
                    eng: 'Type the correct verb in present tense.',
                    pl: 'Wpisz odpowiedni czasownik w czasie teraźniejszym.',
                    ar: 'اكتب الفعل الصحيح في زمن المضارع',
                    ger: 'Gib das richtige Verb im Präsens ein.',
                    lt: 'Įvesk teisingą veiksmažodį esamuoju laiku.',
                    ua: 'Введіть правильне дієслово у теперішньому часі.', 
                    sp: 'Escribe el verbo correcto en tiempo presente.',
                },
            },
            {
                typeOfScreen: '4',
                nuberOfQuestions: 4,
                questions: [
                    ['Barnet ', 'med lekene.'],           
                    ['Han ', 'på datamaskinen.'],        
                    ['Vi ', 'på musikken.'],          
                    ['Hun ', 'på treningsstudioet.'],  
                ],
                correctAnswers: [['leker'], ['jobber'], ['hører'], ['trener']],
                translations: {
                    eng: ['plays', 'works', 'listens', 'exercises'],
                    pl: ['bawi się', 'pracuje', 'słucha', 'ćwiczy'],
                    ar: ['يلعب', 'يعمل', 'يستمع', 'يتمرن'],
                    ger: ['spielt', 'arbeitet', 'hört zu', 'trainiert'],
                    lt: ['žaidžia', 'dirba', 'klauso', 'treniruojasi'],
                    ua: ['грається', 'працює', 'слухає', 'тренується'],
                    sp: ['juega', 'trabaja', 'escucha', 'ejercita'],
                },
                instructions: {
                    eng: 'Type the correct verb in present tense.',
                    pl: 'Wpisz odpowiedni czasownik w czasie teraźniejszym.',
                    ar: 'اكتب الفعل الصحيح في زمن المضارع',
                    ger: 'Gib das richtige Verb im Präsens ein.',
                    lt: 'Įvesk teisingą veiksmažodį esamuoju laiku.',
                    ua: 'Введіть правильне дієслово у теперішньому часі.', 
                    sp: 'Escribe el verbo correcto en tiempo presente.',
                },
            }
        ],
        type5: [
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Han ________ en bok nå.', 
                    'Hun ________ i parken hver dag.', 
                    'Vi ________ norsk sammen.', 
                    
                ],
                allAnswers: ['leser', 'tror', 'tenker', 'leker', 'skriver', 'loper', 'får', 'løper', 'sitter', 'drømmer', 'studerer', 'liker'],
                correctAnswers: [
                    [true, false, false, false], 
                    [false, false, false, true], 
                    [false, false, true, false], 
                    
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Hun ________ norsk på kveldene.', 
                    'Bussen ________ klokken åtte.',
                    'Han ________ kaffe om morgenen.', 
                ],
                allAnswers: ['studere', 'ønsker', 'studerer', 'spiser', 'løper', 'leker', 'sover','forlater', 'drikker', 'spør', 'ber', 'spiller'],
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
                    'Han ________ alltid tidlig.', 
                    'Vi ________ mye kaffe hver dag.', 
                    'Læreren ________ spennende historier.', 
                ],
                allAnswers: ['flytter', 'gir', 'våkner', 'tenker', 'løper', 'spiser', 'løper', 'drikker', 'forteller', 'låner', 'flyr', 'fortelle'],
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
                    'Hun ________ alltid tidlig til jobben.',
                    'Fuglene ________ utenfor vinduet mitt.', 
                    'Vi ________ på en ny restaurant i kveld.', 
                ],
                allAnswers: ['ankommer', 'tror', 'bruker', 'sender', 'forteller', 'kjører', 'synger', 'jobber', 'leker', 'spiller', 'spiser', 'studere'],
                correctAnswers: [
                    [true, false, false, false],
                    [false, false, true, false], 
                    [false, false, true, false], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Barna ________ seg for skolen nå.',
                    'Han ________ godt norsk etter ett år.', 
                    'Vi ________ til musikk når vi jobber.', 
                ],
                allAnswers: ['drikker', 'tilbringer', 'forbereder', 'lytter', 'snakker', 'spiser', 'leker', 'gir', 'lyter', 'bor', 'tenker', 'lytter'],
                correctAnswers: [
                    [false, false, true, false], 
                    [true, false, false, false], 
                    [false, false, false, true], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Han ________ fotball hver lørdag.', 
                    'Vi ________ norsk på språkskolen.', 
                    'Hunden vår ________ når den er glad.', 
                ],
                allAnswers: ['våkner', 'forteller', 'spiller', 'løper', 'synger', 'danser', 'leker', 'lærer', 'tenker', 'bjeffer', 'snakker', 'tror'],
                correctAnswers: [
                    [false, false, true, false], 
                    [false, false, false, true], 
                    [false, true, false, false], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'Barna ________ med sine leker.', 
                    'Katten ________ på sofaen.', 
                    'Jeg ________ til musikk.', 
                ],
                allAnswers: ['leser', 'løper', 'studerer', 'leker', 'sover', 'lærer', 'tar', 'bjeffer', 'gir', 'sykler', 'bor', 'lytter'],
                correctAnswers: [
                    [false, false, false, true], 
                    [true, false, false, false], 
                    [false, false, false, true], 
                ],
            },
            {
                typeOfScreen: '5',
                nuberOfQuestions: 3,
                questions: [
                    'De ________ fotball i parken.', 
                    'Katten ________ på vinduskarmen.', 
                    'Barna ________ seg for skolen.', 
                ],
                allAnswers: ['ber', 'spiller', 'vasker', 'går', 'tar', 'gjør', 'gir', 'sitter', 'tror', 'forbereder', 'bor', 'forberede'],
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
                    'Bussen ________ hvert tiende minutt.', 
                    'De ________ fotball hver søndag.', 
                    'De ________ mye tid sammen i helgene.',
                ],
                allAnswers: ['kjører', 'synger', 'spiser', 'drikker', 'leker', 'jobber', 'studere', 'spiller', 'spør', 'tilbringer', 'tenker', 'tror'],
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
                    'Om morgenen ________ hun alltid kaffe.', 
                    'Hver morgen ________ jeg og jogger.', 
                    'De ________ alltid gode historier.', 
                ],
                allAnswers: ['løper', 'viser', 'bor', 'drikker', 'våkner', 'ønsker', 'tror', 'tenker', 'leker', 'forteller', 'spør', 'kjører'],
                correctAnswers: [
                    [false, false, false, true], 
                    [true, false, false, false],
                    [false, true, false, false], 
                ],
            },
        ],
        type6: [
            {
                typeOfScreen: '6',
                leftTitle: 'Verb',
                rightTitle: 'Noun',
                correctAnswers: [
                    ['spise', 'leke', 'studere', 'drikke', 'løpe'], 
                    ['bok', 'kaffe', 'hund', 'skole', 'bil'] 
                ],
                words: [
                    '???', '???', '???', '???', '???', 
                    '???', '???', '???', '???', '???', 
                    'kaffe', 'hund', 'spise', 'leke',  'skole', 'studere', 'bil', 'drikke', 'løpe',
                    'bok', 
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Verb',
                rightTitle: 'Noun',
                correctAnswers: [
                    ['synge', 'lære', 'gå', 'se', 'skrive'], 
                    ['bord', 'billett', 'by', 'klokke', 'katt'] 
                ],
                words: [
                    '???', '???', '???', '???', '???',
                    '???', '???', '???', '???', '???',
                    'billett', 'synge', 'lære', 'by', 'gå', 
                    'bord','klokke', 'se', 'skrive', 'katt'
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Verb',
                rightTitle: 'Noun',
                correctAnswers: [
                    ['sove', 'jobbe', 'lese', 'svømme', 'kjøre'], 
                    ['eple', 'bok', 'hav', 'bygning', 'klokke'] 
                ],
                words: [
                    '???', '???', '???', '???', '???',
                    '???', '???', '???', '???', '???',
                    'sove',  'bygning', 'jobbe', 'hav', 'lese', 
                    'eple', 'bok',  'klokke', 'svømme', 'kjøre'
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Verb',
                rightTitle: 'Noun',
                correctAnswers: [
                    ['male', 'sykle', 'lage', 'studere', 'lese'], 
                    ['stol', 'telefon', 'kake', 'bil', 'gate'] 
                ],
                words: [
                    '???', '???', '???', '???', '???', 
                    '???', '???', '???', '???', '???', 
                    'kake', 'male', 'lage', 'telefon', 'bil', 'studere', 'lese', 
                    'stol', 'gate', 'sykle',
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Verb',
                rightTitle: 'Adjective',
                correctAnswers: [
                    ['snakke', 'hoppe', 'lære', 'vaske'], 
                    ['glad', 'rask', 'ung', 'stor', 'vakker'] 
                ],
                words: [
                    '???', '???', '???', '???', '???',
                    '???', '???', '???', '???', '???',
                    'snakke', 'ung', 'hoppe',  'vaske', 'rask',
                    'glad', 'stor', 'vakker', 'lære'
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Verb',
                rightTitle: 'Adjective',
                correctAnswers: [
                    ['danse', 'tegne', 'kjøpe', 'lese'], 
                    ['ny', 'gammel', 'kald', 'varm', 'liten'] 
                ],
                words: [
                    '???', '???', '???', '???', '???',
                    '???', '???', '???', '???', '???',
                    'danse', 'gammel', 'tegne', 'lese',
                    'ny', 'kjøpe', 'kald', 'varm', 'liten', 
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Adjective',
                rightTitle: 'Noun',
                correctAnswers: [
                    ['blå', 'ung', 'stor', 'vakker', 'rask'], 
                    ['bok', 'by', 'bil', 'elv', 'fjell'] 
                ],
                words: [
                    '???', '???', '???', '???', '???',
                    '???', '???', '???', '???', '???',
                    'stor', 'bil', 'vakker', 'by', 'rask',
                    'bok', 'elv', 'blå', 'ung', 'fjell'
                ],
            },
            {
                typeOfScreen: '6',
                leftTitle: 'Adjective',
                rightTitle: 'Noun',
                correctAnswers: [
                    ['gammel', 'lykkelig', 'kald', 'liten', 'lang'], 
                    ['klokke', 'hund', 'hus', 'hage', 'bro'] 
                ],
                words: [
                    '???', '???', '???', '???', '???',
                    '???', '???', '???', '???', '???',
                    'gammel',  'hund', 'lykkelig', 'lang',
                    'klokke', 'kald', 'liten', 'hus', 'hage', 'bro'
                ],
            }
        ],
        type7: [
            {
                typeOfScreen: '7',
                wordsCorrect: ['Hun', 'lager', 'middag', 'nå', 'og', 'lytter', 'til', 'radioen.'],
                words: ['Hun', 'lage', 'middag', 'na', 'og', 'lytter', 'til', 'radioen.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Han', 'leser', 'en', 'bok', 'og', 'drikker', 'te.'],
                words: ['Han', 'leser', 'et', 'bok', 'og', 'drikke', 'te.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Vi', 'spiser', 'frokost', 'sammen', 'hver', 'morgen.'],
                words: ['Vi', 'spise', 'frokost', 'sammen', 'hvert', 'morgen.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Barna', 'leker', 'ute', 'og', 'hunden', 'sover', 'inne.'],
                words: ['Barna', 'leker', 'ut', 'og', 'hunden', 'sove', 'inne.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Hun', 'snakker', 'norsk', 'og', 'engelsk', 'med', 'vennene', 'sine.'],
                words: ['Hun', 'snakke', 'norsk', 'og', 'engelsk', 'med', 'vennene', 'sine.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['De', 'ser', 'på', 'en', 'film', 'i', 'kveld.'],
                words: ['De', 'se', 'på', 'et', 'film', 'i', 'kveld.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Han', 'kjøper', 'en', 'ny', 'bil', 'i', 'morgen.'],
                words: ['Han', 'kjøpe', 'en', 'ny', 'biler', 'i', 'morgen.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Vi', 'lærer', 'norsk', 'på', 'skolen', 'hver', 'dag.'],
                words: ['Vi', 'lære', 'norsk', 'til', 'skolen', 'hver', 'dag.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Katten', 'sover', 'på', 'senga', 'om', 'natten.'],
                words: ['Katten', 'sove', 'på', 'senga', 'om', 'natten.'],
                mistakesIndex: []
            },
            {
                typeOfScreen: '7',
                wordsCorrect: ['Hun', 'leker', 'i', 'hagen', 'med', 'hunden', 'sin.'],
                words: ['Hun', 'lekere', 'i', 'hagen', 'om', 'hunden', 'sin.'],
                mistakesIndex: []
            }
        ],
        type8: [
            {
                typeOfScreen: '8',
                nuberOfQuestions: 2,
                wordsCorrect: [
                    [
                        ['hun', 'lager', 'middag', 'nå'],
                        ['nå', 'lager', 'hun', 'middag'],
                        ['middag', 'lager', 'hun', 'nå']
                    ],
                    [
                        ['de', 'spiller', 'fotball', 'i', 'parken'],
                        ['i', 'parken', 'spiller', 'de', 'fotball'],
                        ['fotball', 'spiller', 'de', 'i', 'parken']
                    ],[
                        
                    ],[
            
                    ]
                ],
                words1: ['middag', 'Hun', 'nå', 'lager'],
                words2: ['fotball', 'De', 'i', 'spiller', 'parken'],
                words3: [],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 2,
                wordsCorrect: [
                    [
                        ['hunden', 'sover', 'under', 'bordet'],
                        ['under', 'bordet', 'sover', 'hunden'],
                    ],
                    [
                        ['jeg', 'leser', 'en bok', 'og', 'drikker', 'kaffe'],
                        ['en bok', 'leser', 'jeg', 'og', 'drikker', 'kaffe'],
                        ['jeg', 'drikker', 'kaffe', 'og', 'leser', 'en bok'],
                        ['kaffe', 'drikker', 'jeg', 'og', 'leser', 'en bok']
                    ],[
                        
                    ],[
            
                    ]
                ],
                words1: ['bordet', 'Hunden', 'under', 'sover'],
                words2: ['leser', 'og', 'en bok', 'kaffe', 'Jeg', 'drikker'],
                words3: [],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 2,
                wordsCorrect: [
                    [
                        ['barna', 'spiser', 'frokost', 'på', 'kjøkkenet'],
                        ['på', 'kjøkkenet', 'spiser', 'barna', 'frokost'],
                        ['frokost', 'spiser', 'barna', 'på', 'kjøkkenet']
                    ],
                    [
                        ['han', 'skriver', 'en e-post', 'på', 'datamaskinen'],
                        ['en e-post', 'skriver', 'han', 'på', 'datamaskinen'],
                        ['på', 'datamaskinen', 'skriver', 'han', 'en e-post']
                    ],[
                        
                    ],[
            
                    ]
                ],
                words1: ['frokost', 'Barna', 'på', 'spiser', 'kjøkkenet'],
                words2: ['en e-post', 'på', 'skriver','Han', 'datamaskinen'],
                words3: [],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 2,
                wordsCorrect: [
                    [
                        ['læreren', 'underviser', 'elevene', 'i', 'klasserommet'],
                        ['i', 'klasserommet', 'underviser', 'læreren', 'elevene'],
                    ],
                    [
                        ['hun', 'lytter', 'til', 'musikk'],
                        ['til', 'musikk', 'lytter', 'hun']
                    ],[
                        
                    ],[
            
                    ]
                ],
                words1: ['elevene', 'Læreren', 'i', 'underviser', 'klasserommet'],
                words2: ['til', 'Hun', 'musikk', 'lytter'],
                words3: [],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 2,
                wordsCorrect: [
                    [
                        ['hun', 'kjøper', 'frukt', 'på', 'markedet'],
                        ['på', 'markedet', 'kjøper', 'hun', 'frukt'],
                        ['frukt', 'kjøper', 'hun', 'på', 'markedet']
                    ],
                    [
                        ['de', 'ser', 'på', 'stjernene', 'om', 'natten'],
                        ['om', 'natten', 'ser', 'de', 'på', 'stjernene'],
                        ['på', 'stjernene', 'ser', 'de', 'om', 'natten']
                    ],[
                        
                    ],[
            
                    ]
                ],
                words1: ['frukt', 'på', 'kjøper', 'Hun', 'markedet'],
                words2: ['på', 'De', 'stjernene', 'ser', 'om', 'natten'],
                words3: [],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 3,
                wordsCorrect: [
                    [
                        ['han', 'leser', 'en avis', 'på', 'toget'],
                        ['på', 'toget', 'leser', 'han', 'en avis'],
                        ['en avis', 'leser', 'han', 'på', 'toget']
                    ],
                    [
                        ['katten', 'sover', 'på', 'teppet'],
                        ['på', 'teppet', 'sover', 'katten']
                    ],
                    [
                        ['vi', 'spiser', 'middag', 'klokken', 'seks'],
                        ['middag', 'spiser', 'vi', 'klokken', 'seks'],
                        ['klokken', 'seks', 'spiser', 'vi', 'middag']
                    ],[
                        
                    ]
                ],
                words1: ['på', 'Han', 'en avis', 'leser', 'toget'],
                words2: ['på', 'sover', 'Katten', 'teppet'],
                words3: ['klokken', 'middag', 'seks', 'spiser', 'Vi'],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 3,
                wordsCorrect: [
                    [
                        ['hun', 'synger', 'i', 'kor'],
                        ['i', 'kor', 'synger', 'hun'],
                    ],
                    [
                        ['barnet', 'tegner', 'en tegning', 'på', 'papiret'],
                        ['på', 'papiret', 'tegner', 'barnet', 'en tegning'],
                        ['en tegning', 'tegner', 'barnet', 'på', 'papiret']
                    ],
                    [
                        ['de', 'trener', 'fotball', 'etter', 'skolen'],
                        ['etter', 'skolen', 'trener', 'de', 'fotball'],
                        ['fotball', 'trener', 'de', 'etter', 'skolen']
                    ],[
                        
                    ]
                ],
                words1: ['i', 'synger', 'kor', 'Hun'],
                words2: ['tegner', 'på', 'Barnet', 'en tegning', 'papiret'],
                words3: ['etter', 'De', 'fotball', 'trener', 'skolen'],
                words4: [],
            },
            {
                typeOfScreen: '8',
                nuberOfQuestions: 3,
                wordsCorrect: [
                    [
                        ['han', 'drikker', 'kaffe', 'hver', 'morgen'],
                        ['hver', 'morgen', 'drikker', 'han', 'kaffe'],
                        ['kaffe', 'drikker', 'han', 'hver', 'morgen']
                    ],
                    [
                        ['de', 'går', 'på', 'skole', 'mandag', 'til', 'fredag'],
                        ['mandag', 'til', 'fredag', 'går', 'de', 'på', 'skole'],
                        ['på', 'skole', 'går', 'de', 'mandag', 'til', 'fredag']
                    ],
                    [
                        ['jeg', 'jobber', 'i dag'],
                        ['i dag', 'jobber', 'jeg']
                    ],[
                        
                    ]
                ],
                words1: ['hver', 'Han', 'kaffe', 'morgen', 'drikker'],
                words2: ['mandag', 'De', 'på', 'skole', 'til', 'går', 'fredag'],
                words3: [ 'jobber', 'i dag' ,'Jeg'],
                words4: [],
            }
        ],
    }
}