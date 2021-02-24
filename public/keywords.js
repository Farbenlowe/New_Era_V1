const prKey = ['Fliesenlack', 'Betonfarbe', 'Metallschutzlack', 'Holzschutzfarbe', 'Bootslack', 'Schwimmbeckenfarbe', 'Buntlack', '3in1',
    'Badewannenlack', 'Rostschutzfarbe', 'Holzlasur', 'Parkettlack', 'Antischimmelfarbe', 'Autolack', '2K Grundierung', '2K Klarlack',
    'erdünnung 700', 'erdünnung 227', 'erdünnung 2K/400', 'X300', 'schwimmbeckenfarbe', 'Holz-Lasur', 'PU Holzschutzfarbe', 'PARKETTLACK', '2-K Grundierung', 'Bunt-Lack', 'Metallschutz-lack'
];

const marke = ['Hamburger Lack-Profi', 'Halvar', 'Lausitzer Farbwerke', 'Paint IT!', 'Paint IT', 'Grünwalder', 'FARBENLÖWE', 'The Flynn', 'Goldmeister Farben', 'Hamburger Profi-Lack',
    'Farben Löwe'
];

const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const Glanz = ['seidenmatt', 'SEIDENMATT', 'matt', 'MATT', "glänzend", 'GLÄNZEND'];

const menge = [
    '0,5l ', '0,5l,', '0,5l)', '0,5L ', '0,5L,', '0,5L)', '0,5L-', '0,5kg ', '0,5kg,', '0,5kg)', '0,5Kg ', '0,5Kg,', '0,5Kg)',
    '0,5 l ', '0,5 l,', '0,5 l)', '0,5 L ', '0,5 L,', '0,5 L)', '0,5 kg ', '0,5 kg,', '0,5 kg)', '0,5 Kg ', '0,5 Kg,', '0,5 Kg)',
    '1l ', '1l,', '1l)', '1L ', '1L,', '1L)', '1kg ', '1kg,', '1kg)', '1Kg ', '1Kg,', '1Kg)',
    '1 l ', '1 l,', '1 l)', '1 L ', '1 L,', '1 L)', '1 kg ', '1 kg,', '1 kg)', '1 Kg ', '1 Kg,', '1 Kg)',
    '2,5l ', '2,5l,', '2,5l)', '2,5L ', '2,5L,', '2,5L)', '2,5kg ', '2,5kg,', '2,5kg)', '2,5Kg ', '2,5Kg,', '2,5Kg)',
    '2,5 l ', '2,5 l,', '2,5 l)', '2,5 L ', '2,5 L,', '2,5 L)', '2,5 kg ', '2,5 kg,', '2,5 kg)', '2,5 Kg ', '2,5 Kg,', '2,5 Kg)',
    '5l ', '5l,', '5l)', '5L ', '5L,', '5L)', '5kg ', '5kg,', '5kg)', '5Kg ', '5Kg,', '5Kg)',
    '5 l ', '5 l,', '5 l)', '5 L ', '5 L,', '5 L)', '5 kg ', '5 kg,', '5 kg)', '5 Kg ', '5 Kg,', '5 Kg)',
    '10l ', '10l,', '10l)', '10L ', '10L,', '10L)', '10kg ', '10kg,', '10kg)', '10Kg ', '10Kg,', '10Kg)',
    '10 l ', '10 l,', '10 l)', '10 L ', '10 L,', '10 L)', '10 kg ', '10 kg,', '10 kg)', '10 Kg ', '10 Kg,', '10 Kg)',
    '20l ', '20l,', '20l)', '20L ', '20L,', '20L)', '20kg ', '20kg,', '20kg)', '20Kg ', '20Kg,', '20Kg)',
    '20 l ', '20 l,', '20 l)', '20 L ', '20 L,', '20 L)', '20 kg ', '20 kg,', '20 kg)', '20 Kg ', '20 Kg,', '20 Kg)',
    '30l ', '30l,', '30l)', '30L ', '30L,', '30L)', '30kg ', '30kg,', '30kg)', '30Kg ', '30Kg,', '30Kg)',
    '30 l ', '30 l,', '30 l)', '30 L ', '30 L,', '30 L)', '30 kg ', '30 kg,', '30 kg)', '30 Kg ', '30 Kg,', '30 Kg)',
]

const farben_Holzschutzfarbe = [{
        Farbe: 'Weiß',
        Nummer: '0001'
    },
    {
        Farbe: 'weiß',
        Nummer: '0001'
    },
    {
        Farbe: 'Schwarz',
        Nummer: '0002'
    },
    {
        Farbe: 'schwarz',
        Nummer: '0002'
    },
    {
        Farbe: 'Grün',
        Nummer: '0003'
    },
    {
        Farbe: 'grün',
        Nummer: '0003'
    },
    {
        Farbe: 'Rotbraun',
        Nummer: '0004'
    },
    {
        Farbe: 'rotbraun',
        Nummer: '0004'
    },
    {
        Farbe: 'Farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'Beige',
        Nummer: '0005'
    },
    {
        Farbe: 'beige',
        Nummer: '0005'
    },
    {
        Farbe: 'Dunkelbraun',
        Nummer: '0006'
    },
    {
        Farbe: 'dunkelbraun',
        Nummer: '0006'
    },
    {
        Farbe: 'Schwedenrot',
        Nummer: '0007'
    },
    {
        Farbe: 'schwedenrot',
        Nummer: '0007'
    }
];

const farben_ausgeschrieben = [{
        Farbe: 'Weiß',
        Nummer: '9010'
    },
    {
        Farbe: 'weiß',
        Nummer: '9010'
    },
    {
        Farbe: 'Schwarz',
        Nummer: '9005'
    },
    {
        Farbe: 'schwarz',
        Nummer: '9005'
    },
    {
        Farbe: 'Grau',
        Nummer: '7001'
    },
    {
        Farbe: 'grau',
        Nummer: '7001'
    },
    {
        Farbe: 'Enzianblau',
        Nummer: '5010'
    },
    {
        Farbe: 'enzianblau',
        Nummer: '5010'
    },
    {
        Farbe: 'Feuerrot',
        Nummer: '3000'
    },
    {
        Farbe: 'feuerrot',
        Nummer: '3000'
    },
    {
        Farbe: 'Hellelfenbein',
        Nummer: '1015'
    },
    {
        Farbe: 'hellelfenbein',
        Nummer: '1015'
    },
    {
        Farbe: 'Lichtblau',
        Nummer: '5012'
    },
    {
        Farbe: 'lichtblau',
        Nummer: '5012'
    },
    {
        Farbe: 'Pastelltürkis',
        Nummer: '6034'
    },
    {
        Farbe: 'pastelltürkis',
        Nummer: '6034'
    },
    {
        Farbe: 'Schokoladenbraun',
        Nummer: '8017'
    },
    {
        Farbe: 'schokoladenbraun',
        Nummer: '8017'
    },
    {
        Farbe: 'Ultramarineblau',
        Nummer: '5002'
    },
    {
        Farbe: 'ultramarineblau',
        Nummer: '5002'
    },
    {
        Farbe: 'Farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'Beige',
        Nummer: '1001'
    },
    {
        Farbe: 'beige',
        Nummer: '1001'
    }
];

const farben_Holzlasur = [{
        Farbe: 'Birke',
        Nummer: '0008'
    },
    {
        Farbe: 'birke',
        Nummer: '0008'
    },
    {
        Farbe: 'Kiefer',
        Nummer: '0009'
    },
    {
        Farbe: 'kiefer',
        Nummer: '0009'
    },
    {
        Farbe: 'Pinie',
        Nummer: '0010'
    },
    {
        Farbe: 'pinie',
        Nummer: '0010'
    },
    {
        Farbe: 'Lärche',
        Nummer: '0010'
    },
    {
        Farbe: 'lärche',
        Nummer: '0010'
    },
    {
        Farbe: 'Farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'Eiche Hell',
        Nummer: '0011'
    },
    {
        Farbe: 'eiche hell',
        Nummer: '0011'
    },
    {
        Farbe: 'Teak',
        Nummer: '0012'
    },
    {
        Farbe: 'teak',
        Nummer: '0012'
    },
    {
        Farbe: 'Kastanie',
        Nummer: '0013'
    },
    {
        Farbe: 'kastanie',
        Nummer: '0013'
    },
    {
        Farbe: 'Nussbaum',
        Nummer: '0014'
    },
    {
        Farbe: 'nussbaum',
        Nummer: '0014'
    },
    {
        Farbe: 'Mahagoni',
        Nummer: '0015'
    },
    {
        Farbe: 'mahagoni',
        Nummer: '0015'
    },
    {
        Farbe: 'Palisander',
        Nummer: '0016'
    },
    {
        Farbe: 'palisander',
        Nummer: '0016'
    },
    {
        Farbe: 'Silbergrau',
        Nummer: '0017'
    },
    {
        Farbe: 'silbergrau',
        Nummer: '0017'
    },
    {
        Farbe: 'Ebenholz',
        Nummer: '0018'
    },
    {
        Farbe: 'ebenholz',
        Nummer: '0018'
    }
];

const _grau = [{
        Farbe: 'Silbergrau',
        Nummer: '7001'
    },
    {
        Farbe: 'silbergrau',
        Nummer: '7001'
    },
    {
        Farbe: 'Anthrazitgrau',
        Nummer: '7016'
    },
    {
        Farbe: 'anthrazitgrau',
        Nummer: '7016'
    },
    {
        Farbe: 'Kieselgrau',
        Nummer: '7032'
    },
    {
        Farbe: 'kieselgrau',
        Nummer: '7032'
    },
    {
        Farbe: 'Platingrau',
        Nummer: '7036'
    },
    {
        Farbe: 'platingrau',
        Nummer: '7036'
    },
    {
        Farbe: 'Quarzgrau',
        Nummer: '7039'
    },
    {
        Farbe: 'quarzgrau',
        Nummer: '7039'
    },
    {
        Farbe: 'Steingrau',
        Nummer: '7030'
    },
    {
        Farbe: 'steingrau',
        Nummer: '7030'
    }
];

const _weiß = [{
        Farbe: 'Cremeweiß',
        Nummer: '9001'
    },
    {
        Farbe: 'cremeweiß',
        Nummer: '9001'
    },
    {
        Farbe: 'Perlweiß',
        Nummer: '1013'
    },
    {
        Farbe: 'perlweiß',
        Nummer: '1013'
    }
];