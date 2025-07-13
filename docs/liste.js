"use strict";

let spanEmail    = null;
let supaClient   = null;
let logoutButton = null;

let supabaseClient = null;
let benutzerId     = null;

let inputEintragArray = [];


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    spanEmail    = document.getElementById( "spanEmail"    );
    logoutButton = document.getElementById( "logoutButton" );

    inputEintragArray = [
        document.getElementById( "eintrag1" ),
        document.getElementById( "eintrag2" ),
        document.getElementById( "eintrag3" ),
        document.getElementById( "eintrag4" ),
        document.getElementById( "eintrag5" )
    ];

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

    await ladeListe();

    console.log( "Seite für Liste initialisiert." );
});


/**
 * Lädt die Liste der Einträge für den angemeldeten Benutzer aus der Datenbank
 * und zeigt sie an.
 */
async function ladeListe() {

    const supabaseClient = holeSupabaseClient();
    
    try {

        const { data, fehler } = await supabaseClient
                                        .from( "bucketlist" )
                                        .select( "eintrags_nr, titel" )
                                        .eq( "benutzer_id", benutzerId )
                                        .order( "eintrags_nr", { ascending: true } );   
        
        console.log( "Geladene Daten:", data );
        
        if ( fehler ) {

            console.error( "Fehler beim Laden der Liste:", fehler );
            alert( "Fehler beim Laden der Liste: " + fehler.message );
            return;
        } 

        if ( !data ) {

            console.error( "Fehler beim Laden der Liste." );
            alert( "Fehler beim Laden der Liste." );
            return;
        }

        
        if ( data.length > 0 ) {

            for ( let i = 0; i < data.length; i++ ) {

                const eintrag = data[i];
                if ( eintrag && eintrag.eintrags_nr && eintrag.titel ) {

                    const index = eintrag.eintrags_nr - 1; 
                    inputEintragArray[ index ].value = eintrag.titel;
                }
            }
        }
    }
    catch ( fehler ) {

        console.error( "Unerwarteter Fehler beim Laden der Liste:", fehler );
        alert( "Unerwarteter Fehler beim Laden der Liste." );
    }
}


/**
 * Aktuelle Eingabe in Liste in Datenbanktabelle speichern.
 */
async function onSpeichernButton( event ) {

    event.preventDefault();

    if ( benutzerId === null ) {

        alert( "Daten können nicht gespeichert werden." );
        return;
    }

    const eintraegeArray = [];
    for ( let i = 1; i <= 5; i++ ) {

        const index = i - 1; 
        const eintragText = inputEintragArray[ index ].value;

        const datensatz = {

            benutzer_id: benutzerId,
            eintrags_nr: i,
            titel      : eintragText
        }

        eintraegeArray.push( datensatz );
    }

    try {

        const { data, fehler } = await supabaseClient
                                        .from( "bucketlist" )
                                        .upsert( eintraegeArray, { 
                                            onConflict: "benutzer_id,eintrags_nr" // Schlüsselfelder
                                        });
        if ( fehler ) {

            console.error( "Fehler beim Speichern:", fehler );
            alert( "Fehler beim Speichern: " + fehler.message );

        } else if ( !data ) {

            console.error( "Fehler beim Speichern." );
            alert( "Fehler beim Speichern." );

        } else {

            alert( "Liste gespeichert" );
        }
    }
    catch ( fehler ) {

        console.error( "Fehler beim Speichern der Liste:", fehler );
        alert( "Fehler beim Speichern der Liste." );
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

