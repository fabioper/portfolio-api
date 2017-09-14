const { ObjectId } = require('mongoose').Types

const projects = [
    {
        _id: new ObjectId(),
        title: 'Ghost Reveries',
        description: 'Ghost Reveries was recorded at Fascination Street Studios, which are located in Örebro, Sweden. The album\'s artwork is by Travis Smith, who has contributed artwork to Opeth\'s previous releases. Ghost Reveries was released in Europe on August 29, 2005 and in North America on August 30, 2005 and peaked on the Billboard 200 at #64.',
        url: 'https://opeth.com',
        stack: ['Node.js', 'React', 'MongoDB'],
        lessonsLearned: [
            'The album\'s single is \'The Grand Conjuration\'. A music video of the song has been released, though about half the song was edited from the video due to the length of the song.',
            'This album also sees the return of death growling, and shred-like cadenzas, absent from their previous album Damnation.'
        ],
        images: [
            'https://lastfm-img2.akamaized.net/i/u/770x0/d1bf2a0cee3d4d93919114b7c1093d8e.jpg#d1bf2a0cee3d4d93919114b7c1093d8e',
        ]
    },

    {
        _id: new ObjectId(),
        title: 'Fear of a Blank Planet',
        description: 'Fear of a Blank Planet (also Transmission 6.1) is the ninth studio album by British progressive rock band Porcupine Tree which was released on April 16, 2007 in the UK and Europe, and on April 24, 2007 in the United States. Steven Wilson has mentioned that the album\'s title is a direct reference to the 1990\'s Public Enemy album, Fear of a Black Planet.',
        url: 'https://fearofblankplanet.com',
        stack: ['Python', 'Flask', 'MySQL'],
        lessonsLearned: [
            'The album was written in Tel Aviv and London between January and July of 2006.',
            'The album was highly acclaimed by the critics and gained the status of "Album Of The Year" in many magazines and websites.'
        ],
        images: [
            'https://lastfm-img2.akamaized.net/i/u/770x0/2c3c098793ab40d7b076dd2f9903d814.jpg#2c3c098793ab40d7b076dd2f9903d814',
            'https://lastfm-img2.akamaized.net/i/u/770x0/23fc51352c0b4b1b83f253c5c145fa8a.jpg#23fc51352c0b4b1b83f253c5c145fa8a'
        ]
    },

    {
        _id: new ObjectId(),
        title: 'Les voyages de l\'Âme',
        description: 'Les Voyages de l\'Âme (English: The Journeys of the Soul) is the third studio album by Alcest, released on January 6, 2012 by Prophecy Productions. \'Autre Temps\' was also released in a different version as a single, and was made into a music video.',
        url: 'https://voyages.com',
        stack: ['Ruby on Rails', 'PostgreSQL', 'Angular'],
        lessonsLearned: [
            'All lyrics written by Neige except \'Nous sommes l\'émeraude\' by Charles van Lerberghe, all music composed by Neige.'
        ],
        images: [
            'https://lastfm-img2.akamaized.net/i/u/770x0/b9f2fc6b29c04f00b6933bfc9d7cc512.jpg#b9f2fc6b29c04f00b6933bfc9d7cc512',
            'https://lastfm-img2.akamaized.net/i/u/770x0/89a352e19e2b4d32a637fa169d493989.jpg#89a352e19e2b4d32a637fa169d493989'
        ]
    },

    {
        _id: new ObjectId(),
        title: 'Remedy Lane',
        description: 'Remedy Lane is the fourth album by Swedish progressive rock band Pain of Salvation, released in Spring 2002. It is a concept album focusing on a character\'s search for self-discovery. It was described by Allmusic as Pain of Salvation\'s breakthrough album.',
        url: 'https://remedylane.com',
        stack: ['Node.js', 'React', 'MySQL'],
        lessonsLearned: [
            'On July 1st, 2016 the band released a re-issue of the album.'
        ],
        images: [
            'https://lastfm-img2.akamaized.net/i/u/770x0/636dc13084bd317bc2b5050d65942508.jpg#636dc13084bd317bc2b5050d65942508'
        ]
    }
]

module.exports = projects
