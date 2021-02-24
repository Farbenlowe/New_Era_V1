/*–––––––––––––––––––––––––––––––––– API (ABFRAGE AN DEN SERVER) –––––––––––––––––––––––––––––––––––––*/
// Wird durch client_index.js zeile 11 gestartet (Soblad ein Code gescannt wurde)

function suchen() {

    let billbee_ID = '';

    billbee_ID = document.getElementById('eingabe').value;

    let billbee_ID_data = {
        Id: billbee_ID
    };

    let id = Math.floor(Math.random() * 100000000000000);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'pdfIdentifier': id
        },
        body: JSON.stringify(billbee_ID_data),
    };

    async function getTitle() {
        let response = await fetch('http://new-era.farbenloewe.de/api/orders', options); //Der Request an den Server
        let data = await response.json(); //Die Antwort vom Server

        console.log(data);

        if (data) {
            if (data.Meldung == undefined) {
                setTimeout(() => {
                    document.getElementById('loader').classList.add('hidden');
                    let druckauftrag = window.open(data.path);
                    druckauftrag.focus();
                    druckauftrag.print();
                    data = {};
                    document.getElementById('eingabe').value = '';
                }, 1500);
            } else {
                document.getElementById('alert').innerHTML = data.Meldung;
                document.getElementById('loader').classList.add('hidden');
            }
        }
    }
    getTitle();
}