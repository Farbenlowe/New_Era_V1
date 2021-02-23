/*––––––––––––––––––––––––––––––––––––––––––//===================\\––––––––––––––––––––––––––––––––––––––––––*/
/*============================================ SERVER NEW ERA V1 ============================================*/
/*––––––––––––––––––––––––––––––––––––––––––\\===================//––––––––––––––––––––––––––––––––––––––––––*/

const request = require('request');
const express = require('express');
const cors = require('cors');
const merge = require('easy-pdf-merge');

const app = express();

let _produkt;
let produkt_quantity;
let reqLength;
let PDF;
let pdf_merger_id;

app.listen(3000, () => console.log('Server is listening at Port 3000'));
app.use(express.static('public'));
app.use(express.json());

let corsOptions = {
    origin: 'https://new-era.farbenloewe.de',
    optionsSuccessStatus: 200
}

app.post('/api/orders', cors(corsOptions), (req, res) => {

    console.log(req.body);
    console.log(req.headers.pdfidentifier);

    pdf_merger_id = req.headers.pdfidentifier;

    function getProductTitle(id) {

        if (id.Id == '') {
            sendError_404();
            return;
        }

        const options = {
            url: 'https://app.billbee.io/api/v1/orders/' + id.Id,
            credentials: 'include',
            headers: {
                'X-Billbee-Api-Key': '6BE75E3B-5827-4EAE-B4AE-A5B8CD47F4E6',
                'Authorization': 'Basic ZmxlaXNjaGVyQGZhcmJlbmxvZXdlLmRlOmpvbmFocnVzY2g=',
                'Content-Type': 'application/json',
            }
        };

        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let produktTitel = JSON.parse(body);
                reqLength = produktTitel.Data.OrderItems.length;
                for (let i = 0; i < reqLength; i++) {
                    _produkt = produktTitel.Data.OrderItems[i].Product.Title;
                    produkt_quantity = produktTitel.Data.OrderItems[i].Quantity;
                    console.log(_produkt);
                    console.log('algo 1 starten');
                    let auftrag = algo_1(_produkt);
                    console.log('algo 2 starten');
                    let auftragCode = algo_2(auftrag);
                    console.log('algo 3 starten');
                    let auftragPdf = algo_3(auftragCode, produkt_quantity);
                    if (reqLength - 1 == i) {
                        console.log('sendback starten');
                        sendBack(auftragPdf);
                    }
                }
            } else {
                console.log('An Error occured: ' + error);
                sendError_404();
            }
        })
    }
    getProductTitle(req.body);

    function sendError_404() {
        res.json({
            Meldung: 'Fehler 404 – Diese Bestellung konnte nicht gefunden werden'
        });
        res.end();
    }

    function sendBack(auftragPdf) {
        res.json({
            path: auftragPdf
        });
        res.end();
    }
})

/*–––––––––––––––––––––––––––––––––––– ALGORHYTMUS ZUM ERKENNEN DES PRODUKTES (ALGO 1) ––––––––––––––––––––––––––––––––––––*/

function algo_1(prdtkTitel) {

    let zeichen = [];

    let Auftrag_Id = {
        Produkt: '',
        Marke: '',
        Glanz: '',
        RAL: '',
        Menge: ''
    };

    let prdktString = '';
    prdktString = prdtkTitel;

    class Zeichen {
        constructor(name, indicator, index) {
            this.name = name;
            this.indicator = indicator;
            this.index = index;
        }
    }

    function auslesen(string) {

        let stringLength = string.length;

        // Die Zeichenkette wird in einzelne Zeichen zerlegt. Die einzelnen Zeichen werden jeweils in einem Objekt abgespeichert

        for (let i = 0; i < stringLength; i++) {
            let _zeichen = 'zeichen' + i;
            let indicator = string.slice(i, i + 1);
            zeichen[i] = new Zeichen(_zeichen, indicator, i);
        }

        // Keyword-basierte Suche nach dem Produktnamen

        for (let i = 0; i < stringLength; i++) {

            if (Auftrag_Id.Produkt != '') {
                break;
            }

            for (let x = 0; x < prKey.length; x++) {
                let relevantLength = zeichen[i].index + prKey[x].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (prKey[x] == _prKey) {
                    switch (prKey[x]) {
                        case 'Holzschutzfarbe':
                            prdktHolzschutz();
                            break;
                        case 'Metallschutzlack':
                            prdktMetallschutz();
                            break;
                        case 'Bootslack':
                            prdktBoots();
                            break;
                        case 'Schwimmbeckenfarbe':
                            prdktSchwimm();
                            break;
                        default:
                            Auftrag_Id.Produkt = prKey[x];
                            break;
                    }
                }
            }
        }

        function prdktHolzschutz() {
            for (let i = 0; i < stringLength; i++) {

                let relevantLength = zeichen[i].index + prKey[22].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (prKey[22] == _prKey) {
                    Auftrag_Id.Produkt = prKey[22];
                    break;
                }

                if (i == stringLength - 1 && Auftrag_Id.Produkt == '') {
                    Auftrag_Id.Produkt = 'Holzschutzfarbe';
                }

            }

        }

        function prdktMetallschutz() {
            const metallschutz = ['3in1', '3-in-1', '3 in 1'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < metallschutz.length; x++) {
                    let relevantLength = zeichen[i].index + metallschutz[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (metallschutz[x] == _prKey) {
                        Auftrag_Id.Produkt = metallschutz[0];
                        break;
                    }

                    if (i == stringLength - 1 && Auftrag_Id.Produkt == '') {
                        Auftrag_Id.Produkt = 'Metallschutzlack';
                    }
                }
            }
        }

        function prdktBoots() {
            const bootsl = ['2K', '2 K', '2-K', 'GFK'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < bootsl.length; x++) {
                    let relevantLength = zeichen[i].index + bootsl[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (bootsl[x] == _prKey) {
                        Auftrag_Id.Produkt = '2K Bootslack';
                        break;
                    }

                    if (i == stringLength - 1 && Auftrag_Id.Produkt == '') {
                        Auftrag_Id.Produkt = 'Bootslack';
                    }
                }
            }
        }

        function prdktSchwimm() {
            const schwimm = ['2K', '2 K', '2-K', 'GFK'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < schwimm.length; x++) {
                    let relevantLength = zeichen[i].index + schwimm[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (schwimm[x] == _prKey) {
                        Auftrag_Id.Produkt = '2K Schwimmbeckenfarbe';
                        break;
                    }

                    if (i == stringLength - 1 && Auftrag_Id.Produkt == '') {
                        Auftrag_Id.Produkt = 'Schwimmbeckenfarbe';
                    }
                }
            }
        }


        // Keyword-basierte Suche nach der Marke

        for (let i = 0; i < stringLength; i++) {

            if (Auftrag_Id.Marke != '') {
                break;
            }

            for (let x = 0; x < marke.length; x++) {
                let relevantLength = zeichen[i].index + marke[x].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (marke[x] == _prKey) {
                    Auftrag_Id.Marke = marke[x];
                    break;
                }
            }
        }

        // Suche nach vier zusammenhängenden Zeichen, die jeweils eine Zahl sind (RAL Nummer)

        for (let i = 0; i < stringLength; i++) {

            // if (Auftrag_Id.RAL != '') {
            //     break;
            // }

            for (let x = 0; x < validNumbers.length; x++) {

                if (zeichen[i].indicator == validNumbers[x]) {
                    ralWert(i);
                    break;
                }
            }

            function ralWert(index) {

                if (!zeichen[index + 3]) {
                    keinRAL();
                } else if (!zeichen[index + 2]) {
                    keinRAL();
                } else if (!zeichen[index + 1]) {
                    keinRAL();
                } else {
                    let a = (validNumbers.indexOf(zeichen[index + 1].indicator) + 1) / (validNumbers.indexOf(zeichen[index + 1].indicator) + 1);
                    let b = (validNumbers.indexOf(zeichen[index + 2].indicator) + 1) / (validNumbers.indexOf(zeichen[index + 2].indicator) + 1);
                    let c = (validNumbers.indexOf(zeichen[index + 3].indicator) + 1) / (validNumbers.indexOf(zeichen[index + 3].indicator) + 1);

                    if (a == 1 && b == 1 && c == 1) {
                        let anRAL = andererRAL();
                        if (anRAL == false) {
                            Auftrag_Id.RAL = prdktString.slice(index, index + 4);
                        }
                    }
                }
            }

            // Wenn keine vier zusammenhängenden Zahlen gefunden wurden, wird eine Keyword-basierte Suche nach Farben gestartet

            if (i == stringLength - 1 && Auftrag_Id.RAL == '') {
                keinRAL();
            }

            function keinRAL() {
                // Holzschutzfarbe gibt es nicht in den gängigen RAL-Tönen, deshalb eine separate Suche, wenn das Produkt = Holzschutzfarbe ist

                if (Auftrag_Id.Produkt == 'Holzschutzfarbe') {

                    for (let i = 0; i < stringLength; i++) {

                        // if (Auftrag_Id.RAL != '') {
                        //    break;
                        // }

                        for (let x = 0; x < farben_Holzschutzfarbe.length; x++) {
                            let relevantLength = zeichen[i].index + farben_Holzschutzfarbe[x].Farbe.length;
                            let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                            if (farben_Holzschutzfarbe[x].Farbe == _prKey) {
                                let anRAL = andererRAL();
                                if (anRAL == false) {
                                    Auftrag_Id.RAL = farben_Holzschutzfarbe[x].Nummer;
                                    break;
                                }
                            }
                        }
                    }

                    // Holzlasur hat ebenfalls eigene Farbtöne

                } else if (Auftrag_Id.Produkt == 'Holzlasur') {

                    for (let i = 0; i < stringLength; i++) {

                        // if (Auftrag_Id.RAL != '') {
                        //    break;
                        //}

                        for (let x = 0; x < farben_Holzlasur.length; x++) {
                            let relevantLength = zeichen[i].index + farben_Holzlasur[x].Farbe.length;
                            let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                            if (farben_Holzlasur[x].Farbe == _prKey) {
                                let anRAL = andererRAL();
                                if (anRAL == false) {
                                    Auftrag_Id.RAL = farben_Holzlasur[x].Nummer;
                                    break;
                                }
                            }
                        }
                    }

                } else {

                    for (let i = 0; i < stringLength; i++) {

                        // if (Auftrag_Id.RAL != '') {
                        //     break;
                        // }

                        for (let x = 0; x < farben_ausgeschrieben.length; x++) {
                            let relevantLength = zeichen[i].index + farben_ausgeschrieben[x].Farbe.length;
                            let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                            if (farben_ausgeschrieben[x].Farbe == _prKey) {
                                let anRAL = andererRAL();
                                if (anRAL == false) {
                                    switch (farben_ausgeschrieben[x].Farbe) {
                                        case 'weiß':
                                        case 'Weiß':
                                            let Weiß = weiß();
                                            if (Weiß == false) {
                                                Auftrag_Id.RAL = farben_ausgeschrieben[x].Nummer;
                                                break;
                                            }
                                        case 'grau':
                                        case 'Grau':
                                            let Grau = grau();
                                            if (Grau == false) {
                                                Auftrag_Id.RAL = farben_ausgeschrieben[x].Nummer;
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function andererRAL() {

            const ralSenden = ['Anderer RAL', 'anderer RAL', 'Anderer Ral', 'anderer Ral'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < ralSenden.length; x++) {
                    let relevantLength = zeichen[i].index + ralSenden[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (ralSenden[x] == _prKey) {
                        Auftrag_Id.RAL = '????';
                        return true;
                    }
                }
                if (i == stringLength - 1) { // && Auftrag_Id.RAL == '') {
                    return false;
                }
            }

        }

        function weiß() {

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < _weiß.length; x++) {
                    let relevantLength = zeichen[i].index + _weiß[x].Farbe.length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (_weiß[x].Farbe == _prKey) {
                        Auftrag_Id.RAL = _weiß[x].Nummer;
                        return true;
                    }

                    if (i == stringLength - 1 && Auftrag_Id.RAL == '') {
                        return false;
                    }
                }
            }

        }

        function grau() {

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < _grau.length; x++) {
                    let relevantLength = zeichen[i].index + _grau[x].Farbe.length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (_grau[x].Farbe == _prKey) {
                        Auftrag_Id.RAL = _grau[x].Nummer;
                        return true;
                    }

                    if (i == stringLength - 1 && Auftrag_Id.RAL == '') {
                        return false;
                    }
                }
            }

        }

        // Keyword-basierte Suche nach der Menge

        for (let i = 0; i < stringLength; i++) {

            if (Auftrag_Id.Menge != '') {
                break;
            }

            for (let x = 0; x < menge.length; x++) {
                let relevantLength = zeichen[i].index + menge[x].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (menge[x] == _prKey) {
                    Auftrag_Id.Menge = menge[x] //.slice(0, menge[x].length - 1);
                    break;
                }
            }
        }

        // Keyword-basierte Suche nach dem Glanzgrad

        for (let i = 0; i < stringLength; i++) {

            // Holzlasur ist immer seidenmatt

            if (Auftrag_Id.Produkt == 'Holzlasur') {
                Auftrag_Id.Glanz = Glanz[0];
                break;
            }

            if (Auftrag_Id.Glanz != '') {
                break;
            }

            for (let x = 0; x < Glanz.length; x++) {
                let relevantLength = zeichen[i].index + Glanz[x].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (Glanz[x] == _prKey) {
                    Auftrag_Id.Glanz = Glanz[x];
                    break;
                }
            }

            // Wenn kein Glanzgrad gefunden wurde, wird der Default-Wert: 'Glänzend' gesetzt

            if (i == stringLength - 1 && Auftrag_Id.Glanz == '') {

                if (Auftrag_Id.Produkt == 'Holzschutzfarbe') {
                    Auftrag_Id.Glanz = Glanz[0];
                } else {
                    Auftrag_Id.Glanz = Glanz[4];
                }
            }
        }

        // Der Produkttitel wurde ausgelesen und alle relevanten Infos in einem Objekt abgelegt. Aus dem Objekt wird jetzt ein eindeutiger Code generiert
        console.log(Auftrag_Id);
    }
    auslesen(prdktString);
    return Auftrag_Id;
}

/*–––––––––––––––––––––––––––––––––––– ALGORHYTMUS ZUM GENERIEREN EINER PRODUKT-ID (ALGO_2) ––––––––––––––––––––––––––––––––––––*/

function algo_2(Auftrag_Id) {

    let code;
    code = '';

    /*___PRODUKT___*/

    switch (Auftrag_Id.Produkt) {
        case '2K-Klarlack':
        case '2K Klarlack':
            code = code + 'ZK';
            break;
        case '2K-Grundierung':
        case '2-K Grundierung':
            code = code + 'ZG';
            break;
        case '3in1':
            code = code + 'DE';
            break;
        case 'Antischimmelfarbe':
            code = code + 'AS';
            break;
        case 'Autolack':
            code = code + 'AL';
            break;
        case 'Badewannenlack':
            code = code + 'BW';
            break;
        case 'Betonfarbe':
            code = code + 'BF';
            break;
        case 'Bootslack':
            code = code + 'BL';
            break;
        case '2K Bootslack':
            code = code + 'ZB';
            break;
        case 'Buntlack':
        case 'Bunt-Lack':
            code = code + 'BN';
            break;
        case 'Fliesenlack':
            code = code + 'FL';
            break;
        case 'Holzlasur':
        case 'Holz-Lasur':
            code = code + 'HL';
            break;
        case 'Holzschutzfarbe':
            code = code + 'HS';
            break;
        case 'Lackierset X300':
            code = code + 'LS';
            break;
        case 'Metallschutzlack':
        case 'Metallschutz-lack':
            code = code + 'MS';
            break;
        case 'Parkettlack':
        case 'PARKETTLACK':
            code = code + 'PL';
            break;
        case 'Rostschutzfarbe':
            code = code + 'RS';
            break;
        case 'Schwimmbeckenfarbe':
            code = code + 'SB';
            break;
        case '2K Schwimmbeckenfarbe':
            code = code + 'ZS';
            break;
        case 'erdünnung 227':
            code = code + 'VZ';
            break;
        case 'erdünnung 2K/400':
            code = code + 'VV';
            break;
        case 'erdünnung 700':
            code = code + 'VS';
            break;
        case 'PU Holzschutzfarbe':
            code = code + 'PU';
            break;
    };


    /*___MENGE___*/

    switch (Auftrag_Id.Menge) {
        case '0,5L':
        case '0,5L':
        case '0,5 L':
        case '0,5 L':
        case '0,5kg':
        case '0,5kg':
        case '0,5 kg':
        case '0,5 kg':
        case '0,5 L)':
            code = code + '005';
            break;

        case '1L':
        case '1l':
        case '1 L':
        case '1 l':
        case '1kg':
        case '1Kg':
        case '1 kg':
        case '1 Kg':
            code = code + '010';
            break;

        case '2,5l':
        case '2,5L':
        case '2,5 l':
        case '2,5 L':
        case '2,5kg':
        case '2,5Kg':
        case '2,5 kg':
        case '2,5 Kg':
            code = code + '025';
            break;

        case '5L':
        case '5l':
        case '5 L':
        case '5 l':
        case '5kg':
        case '5Kg':
        case '5 kg':
        case '5 Kg':
            code = code + '050';
            break;

        case '10L':
        case '10l':
        case '10 L':
        case '10 l':
        case '10kg':
        case '10Kg':
        case '10 kg':
        case '10 Kg':
            code = code + '100';
            break;

        case '20L':
        case '20l':
        case '20 L':
        case '20 l':
        case '20kg':
        case '20Kg':
        case '20 kg':
        case '20 Kg':
            code = code + '200';
            break;

        case '30L':
        case '30l':
        case '30 L':
        case '30 l':
        case '30kg':
        case '30Kg':
        case '30 kg':
        case '30 Kg':
            code = code + '300';
            break;

    };

    /*___GLANZ___*/

    switch (Auftrag_Id.Glanz) {
        case 'matt':
        case 'MATT':
            code = code + 'M';
            break;

        case 'seidenmatt':
        case 'SEIDENMATT':
            code = code + 'S';
            break;

        case 'glänzend':
        case 'GLÄNZEND':
            code = code + 'G';
            break;
    };

    /*___RAL___*/

    code = code + Auftrag_Id.RAL;
    if (Auftrag_Id.RAL == '') {
        code = code + '0000'
    };

    /*___MARKE___*/

    switch (Auftrag_Id.Marke) {
        case "FARBENLÖWE":
        case 'Farben Löwe':
            code = code + 'A';
            break;
        case "Goldmeister Farben":
            code = code + 'B';
            break;
        case "Grünwalder":
            code = code + 'C';
            break;
        case "Halvar":
            code = code + 'D';
            break;
        case "Hamburger Lack-Profi":
        case "Hamburger Profi-Lack":
            code = code + 'E';
            break;
        case "Lausitzer Farbwerke":
            code = code + 'F';
            break;
        case "Paint IT!":
        case "Paint IT":
            code = code + 'G';
            break;
        case "The Flynn":
            code = code + 'H';
            break;
    };

    console.log(code);
    // algo_3(code);
    return code;
};

/*–––––––––––––––––––––––– DIE ENTSPRECHENDEN PDFs WERDEN HERAUSGESUCHT (ALGO_3) ––––––––––––––––––––––––*/

let pdfs = [];
let counter = 0;

function algo_3(code, quantity) {

    counter++;

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    };

    let replaced = (code.replaceAt(5, "xxxxx"));

    console.log(replaced);

    let _PDF = 'public/etiketten_alle/' + replaced + '.pdf';
    let _PDF_ = 'etiketten_alle/' + replaced + '.pdf';

    for (let i = 1; i <= quantity; i++) {
        pdfs.push(_PDF);
    }

    console.log(pdfs);

    console.log(reqLength);

    if (counter == reqLength) {
        if (pdfs.length > 1) {
            mergePdfs();
            counter = 0;
        } else {
            PDF = _PDF_;
            pdfs = [];
            counter = 0;
        }
    }

    function mergePdfs() {
        console.log('merger starten');
        merge(pdfs, 'public/merged/file_output_' + pdf_merger_id + '.pdf', function(err) {
            if (err) {
                return console.log(err)
            }
            console.log('PDF erfolgreich erstellt');
            pdfs = [];
        });
        PDF = 'merged/file_output_' + pdf_merger_id + '.pdf';
        trashFiles.push(PDF);
    }
    return PDF;
}



/*––––––––––––––––––––––––––––––––––––––––––––––– KEYWORDS –––––––––––––––––––––––––––––––––––––––––––––––*/



const prKey = ['Fliesenlack', 'Betonfarbe', 'Metallschutzlack', 'Holzschutzfarbe', 'Bootslack', 'Schwimmbeckenfarbe', 'Buntlack', '3in1',
    'Badewannenlack', 'Rostschutzfarbe', 'Holzlasur', 'Parkettlack', 'Antischimmelfarbe', 'Autolack', '2K Grundierung', '2K Klarlack',
    'erdünnung 700', 'erdünnung 227', 'erdünnung 2K/400', 'X300', 'schwimmbeckenfarbe', 'Holz-Lasur', 'PU Holzschutzfarbe', 'PARKETTLACK', '2-K Grundierung', 'Bunt-Lack', 'Metallschutz-lack'
];

const marke = ['Hamburger Lack-Profi', 'Halvar', 'Lausitzer Farbwerke', 'Paint IT!', 'Paint IT', 'Grünwalder', 'FARBENLÖWE', 'The Flynn', 'Goldmeister Farben', 'Hamburger Profi-Lack',
    'Farben Löwe'
];

const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const Glanz = ['seidenmatt', 'SEIDENMATT', 'matt', 'MATT', "glänzend", 'GLÄNZEND'];

/*
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
*/

const menge = [
    '0,5 L', '0,5 l', '0,5L', '0,5l',
    '1 L', '1 l', '1L', '1l',
    '2,5 L', '2,5 l', '2,5L', '2,5l',
    '5 L', '5 l', '5L', '5l',
    '10 L', '10 l', '10L', '10l',
    '20 L', '20 l', '20L', '20l',
    '30 L', '30 l', '30L', '30l',
    '0,5 Kg', '0,5 kg', '0,5Kg', '0,5kg',
    '1 Kg', '1 kg', '1Kg', '1kg',
    '2,5 Kg', '2,5 kg', '2,5Kg', '2,5kg',
    '5 Kg', '5 kg', '5Kg', '5kg',
    '10 Kg', '10 kg', '10Kg', '10kg',
    '20 Kg', '20 kg', '20Kg', '20kg',
    '30 Kg', '30 kg', '30Kg', '30kg'
];

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