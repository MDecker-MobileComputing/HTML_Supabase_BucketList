"use strict";

let inputEmail    = null;
let inputPassword = null;

let supabaseClient = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    inputEmail    = document.getElementById( "inputEmail"    );
    inputPassword = document.getElementById( "inputPassword" );

    // Event-Handler für das Registrierungsformular
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

    const { data, fehler } = await supabaseClient.auth.signInWithPassword({
        email   : email,
        password: password,
    });


    if ( fehler ) {
        
        console.error( "Fehler bei Anmeldung:", fehler );
        alert( "Anmeldung fehlgeschlagen: " + fehler.message );
        return;
    }

    console.log( "Anmeldung erfolgreich:", data );

    window.location.href = "liste.html";
}

