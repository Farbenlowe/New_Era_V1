/*––––––––––––––––––––––––––––––– DIE GESAMTE CLIENTSEITIGE FUNKTIONALITÄT ––––––––––––––––––––––––––––––––*/

// Beim Laden der Seite wird der Focus direkt auf das Suchfeld gesetzt

window.onload = () => document.getElementById('eingabe').focus();

// Eventlistener für die Entertaste, der das Programm startet

window.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        suchen();
        document.getElementById('loader').classList.remove('hidden');
        document.getElementById('alert').innerHTML = '';
    }
});