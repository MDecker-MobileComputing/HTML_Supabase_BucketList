"use strict";

let spanEmail = null;
let supaClient = null;
let logoutButton = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    spanEmail    = document.getElementById( "spanEmail"    );
    logoutButton = document.getElementById( "logoutButton" );

    logoutButton.addEventListener( "click", abmelden );

    const supabaseClient = holeSupabaseClient();

    const nutzer = await supabaseClient.auth.getUser();
    if ( nutzer.data.user ) {

        spanEmail.textContent = nutzer.data.user.email;

    } else {

        spanEmail.textContent = "???";
    }

    console.log( "Seite für Liste initialisiert." );
});


/**
 * Meldet den Benutzer ab und leitet zur Anmeldeseite weiter.
 */
async function abmelden() {
    
    const supabaseClient = holeSupabaseClient();
    
    try {

        const { error } = await supabaseClient.auth.signOut();
        
        if ( error ) {

            console.error( "Fehler beim Abmelden:", error );
            alert( "Fehler beim Abmelden: " + error.message );

        } else {

            console.log( "Erfolgreich abgemeldet" );
            window.location.href = "einloggen.html";
        }

    } catch ( error ) {

        console.error( "Unerwarteter Fehler beim Abmelden:", error );
        alert( "Unerwarteter Fehler beim Abmelden" );
    }
}