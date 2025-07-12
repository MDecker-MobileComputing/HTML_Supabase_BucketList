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

    // Listen for auth state changes
    supabaseClient.auth.onAuthStateChange((ereignis, sitzung) => {
        console.log("Auth state changed:", ereignis, sitzung);
        
        if (sitzung) {
            const emailAdresse = sitzung.user.email;
            console.log("Benutzer ist angemeldet:", emailAdresse);
            spanEmail.textContent = emailAdresse;
        } else {
            console.log("Benutzer ist nicht angemeldet");
            spanEmail.textContent = "Nicht angemeldet";
        }
    });

    await authentifzierungWennNoetig();

});


async function authentifzierungWennNoetig() {

    // Check if we're returning from OAuth (URL contains code parameter)
    const urlParams = new URLSearchParams(window.location.search);
    const isOAuthCallback = urlParams.has('code');

    if (isOAuthCallback) {
        console.log("OAuth-Callback erkannt, bereinige URL...");
        
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Let the auth state change handler deal with the session
        return;
    }

    const { data: { sitzung  } } = await supabaseClient.auth.getSession();

    if ( !sitzung ) {

        console.log( "Benutzer ist nicht angemeldet, versuche Anmeldung via OAuth ..." );

        await supabaseClient.auth.signInWithOAuth({
            provider: "github",
            options: { redirectTo: "https://mdecker-mobilecomputing.github.io/HTML_Supabase_BucketList/" }
        });
    }

}

