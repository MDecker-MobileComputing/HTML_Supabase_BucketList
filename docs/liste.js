"use strict";

let spanEmail = null;
let supaClient = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    spanEmail = document.getElementById( "spanEmail" );

    supaClient = await supabase.createClient(
            "https://annymgkbnrknvkjnhdhy.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubnltZ2tibnJrbnZram5oZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDM4NzAsImV4cCI6MjA2NzgxOTg3MH0.tJTJmU_jrlEBHpFk3_TUWVLyvVDLoVPk64Dnq7hgf6U"
    );

    const nutzer = await supaClient.auth.getUser();
    if (nutzer.data.user) {

        spanEmail.textContent = nutzer.data.user.email;

    } else {

        spanEmail.textContent = "???";
    }

    console.log( "Seite für Liste initialisiert." );
});
