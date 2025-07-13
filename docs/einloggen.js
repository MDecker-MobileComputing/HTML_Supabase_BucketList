"use strict";

let inputEmail    = null;
let inputPassword = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    inputEmail    = document.getElementById( "inputEmail"    );
    inputPassword = document.getElementById( "inputPassword" );

    const registrationForm = document.getElementById( "anmeldeFormular" );
    registrationForm.addEventListener( "submit", onAnmeldung );

    console.log( "Seite für Registrierung initialisiert." );
});


/**
 * Event-Handler für die Registrierung.
 */
async function onAnmeldung( event ) {

    event.preventDefault(); // Verhindert das Standard-Formular-Submit
    
    const email    = inputEmail.value;
    const password = inputPassword.value;

    const supabaseClient = holeSupabaseClient();

    try {

        const authObjekt = {
                                email   : email,
                                password: password, 
                           };

        const { data, fehler } = 
                await supabaseClient.auth.signInWithPassword( authObjekt );

        if ( fehler ) {
            
            console.error( "Fehler bei Anmeldung:", fehler );
            alert( "Anmeldung fehlgeschlagen: " + fehler.message );
            return;
        }

        if ( !data || !data.user || !data.user.id ) {

            console.error( "Nutzer-ID nicht gefunden in den Anmeldedaten." );
            alert( "Anmeldung fehlgeschlagen." );
            return;
        }

        console.log( "Anmeldung erfolgreich, Nutzer-ID: ", data.user.id );

        window.location.href = "liste.html";
        
    } catch ( netzwerkFehler ) {
        
        console.error( "Netzwerk-Fehler oder Server nicht erreichbar:", netzwerkFehler );
        alert( "Anmeldung fehlgeschlagen: Server nicht erreichbar." );
    }
}

