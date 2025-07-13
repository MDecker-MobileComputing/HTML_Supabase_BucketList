"use strict";

let spanEmail    = null;
let supaClient   = null;
let logoutButton = null;

let supabaseClient = null;
let benutzerId     = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    spanEmail    = document.getElementById( "spanEmail"    );
    logoutButton = document.getElementById( "logoutButton" );

    logoutButton.addEventListener( "click", abmelden );

    const registrationForm = document.getElementById( "bucketlistFormular" );
    registrationForm.addEventListener( "submit", onSpeichernButton );

    supabaseClient = holeSupabaseClient();

    const nutzer = await supabaseClient.auth.getUser();
    if ( nutzer.data.user ) {

        spanEmail.textContent = nutzer.data.user.email;
        benutzerId            = nutzer.data.user.id;
        console.log( "Benutzer-ID:", benutzerId );

    } else {

        spanEmail.textContent = "???";
    }

    console.log( "Seite für Liste initialisiert." );
});


async function onSpeichernButton( event ) {

    event.preventDefault();

    if ( benutzerId === null ) {

        alert( "Bitte zuerst anmelden!" );
        return;
    }

    const eintraegeArray = [];
    for ( let i = 1; i <= 5; i++ ) {

        const eintragText = document.getElementById( "eintrag" + i );

        const datensatz = {

            benutzer_id: benutzerId,
            eintrags_nr: i,
            titel      : eintragText.value
        }

        eintraegeArray.push( datensatz );
    }


    const { _, fehler } = await supabaseClient
                                    .from( "bucketlist" )
                                    .upsert( eintraegeArray, { 
                                        onConflict: "benutzer_id,eintrags_nr" // Schlüsselfelder
                                    });
    if ( fehler ) {

        console.error( "Fehler beim Speichern:", fehler );
        alert( "Fehler beim Speichern: " + fehler.message );

    } else {

        alert( "Liste gespeichert" );
    }
}


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

