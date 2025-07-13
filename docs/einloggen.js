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

    const supabaseClient = supabase.createClient(
            "https://annymgkbnrknvkjnhdhy.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubnltZ2tibnJrbnZram5oZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDM4NzAsImV4cCI6MjA2NzgxOTg3MH0.tJTJmU_jrlEBHpFk3_TUWVLyvVDLoVPk64Dnq7hgf6U"
    );

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

