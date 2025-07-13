"use strict";

let spanEmail = null;
let supaClient = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    spanEmail = document.getElementById( "spanEmail" );

    const supabaseClient = holeSupabaseClient();

    const nutzer = await supabaseClient.auth.getUser();
    if ( nutzer.data.user ) {

        spanEmail.textContent = nutzer.data.user.email;

    } else {

        spanEmail.textContent = "???";
    }

    console.log( "Seite für Liste initialisiert." );
});
