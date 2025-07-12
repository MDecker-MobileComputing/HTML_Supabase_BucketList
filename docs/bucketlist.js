"use strict";


let supabaseClient = null;
let spanEmail      = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    spanEmail = document.getElementById( "spanEmail" );

    supabaseClient = supabase.createClient(
        "https://annymgkbnrknvkjnhdhy.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubnltZ2tibnJrbnZram5oZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDM4NzAsImV4cCI6MjA2NzgxOTg3MH0.tJTJmU_jrlEBHpFk3_TUWVLyvVDLoVPk64Dnq7hgf6U"
    );

    await authentifzierungWennNoetig();

});


async function authentifzierungWennNoetig() {

    const { data: { sitzung  } } = await supabaseClient.auth.getSession();

    if ( sitzung ) {

        const emailAdresse = sitzung.user.email;
        console.log( "Benutzer ist angemeldet:", sitzung.user.email );
        spanEmail.textContent = emailAdresse;

    } else {

        console.log( "Benutzer ist nicht angemeldet, versuche Anmeldung via OAuth ..." );

        await supabaseClient.auth.signInWithOAuth({
            provider: "github"
            //options: { redirectTo: "https://mdecker-mobilecomputing.github.io/HTML_Supabase_BucketList/" }
        });

    }
}

