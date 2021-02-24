/*––––––––––––––––––––––– ALGORHYTMUS ZUM ERKENNEN DES PRODUKTES (ALGO_1) ––––––––––––––––––––––––*/
// Wird durch api.js zeile 27 gestartet (Sobald die Billbee Api eine Antwort geschickt hat)

/*

Zum testen des Algorhytmus kann ein Test-String eingefügt werden.
Der generierte Code ist dann in der Konsole zu sehen.
WICHTIG: Die Datei keywords.js muss ebenfalls geladen werden.

const test_string = 'Farben Löwe Alkydharzverdünnung 700 - Spezialverdünnung extra für Farben und Lacke von Farben Löwe (0,5 L)';
algo_1(test_string);

*/

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
                    Auftrag_Id.Menge = menge[x].slice(0, menge[x].length - 1);
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
        algo_2(Auftrag_Id);
    }
    auslesen(prdktString);
}

/*–––––––––––––––––––––– ALGORHYTMUS ZUM GENERIEREN EINER PRODUKT-ID (ALGO_2) –––––––––––––––––––––––*/
// Wird durch Algo_1 gestartet

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
    ersetzen(code);
};