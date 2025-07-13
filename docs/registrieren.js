"use strict";

let inputEmail     = null;
let inputPassword1 = null;
let inputPassword2 = null;

let supabaseClient = null;


/**
 * Event-Handler, der aufgerufen wird, wenn die Webseite geladen wurde.
 */
window.addEventListener( "load", async function () {

    inputEmail     = document.getElementById( "inputEmail"     );
    inputPassword1 = document.getElementById( "inputPassword1" );
    inputPassword2 = document.getElementById( "inputPassword2" );

    // Event-Handler für das Registrierungsformular
    const registrationForm = document.getElementById( "registrierungsFormular" );
    registrationForm.addEventListener( "submit", onRegistrierung );

    console.log( "Seite für Registrierung initialisiert." );
});



/**
 * Event-Handler für die Registrierung.
 */
async function onRegistrierung( event ) {

    event.preventDefault(); // Verhindert das Standard-Formular-Submit
    
    const email     = inputEmail.value;
    const password1 = inputPassword1.value;
    const password2 = inputPassword2.value;
    
    // Validierung: E-Mail-Adresse muss eingegeben werden
    if ( !email || email.trim() === "" ) {
        alert( "Bitte geben Sie eine E-Mail-Adresse ein!" );
        return;
    }
    
    // Validierung: E-Mail-Format mit RegExp prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !emailRegex.test( email ) ) {

        alert( "Bitte geben Sie eine gültige E-Mail-Adresse ein!" );
        return;
    }

    // Validierung: Passwörter müssen übereinstimmen
    if ( password1 !== password2 ) {

        alert( "Passwörter stimmen nicht überein!" );
        return;
    }
    
    // Validierung: Passwort muss mindestens 6 Zeichen lang sein
    if ( password1.length < 6 ) {

        alert( "Passwort muss mindestens 6 Zeichen lang sein!" );
        return;
    }
    
    const supabaseClient = holeSupabaseClient();


    // *** Eigentliche Registrierung ***
    const { data, fehler } = await supabaseClient.auth.signUp({
                email   : email,
                password: password1,
                options : { emailRedirectTo: "liste.html" }
        });

    if ( fehler ) {

        console.error( "Fehler bei der Registrierung:", fehler );
        alert( "Registrierung fehlgeschlagen: " + fehler.message );
        return;
    }

    // Erfolgreiche Registrierung
    if ( data.user ) {
        
        console.log( "Benutzer registriert:", data.user.email );
        
        if ( data.session ) {
            
            alert( "Registrierung erfolgreich! Sie werden weitergeleitet..." );
            window.location.href = "liste.html";

        } else {
            
            alert( "Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail-Adresse." );
        }
    }

}

