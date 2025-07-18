"use strict";


/**
 * Erstellt und gibt einen Supabase-Client zurück:
 * 
 * * Erstes Argument: Basis-URL des Supabase-Projekts, kann im Supabase-Dashboard des 
 *   Projekts unter "Settings | Data API" gefunden werden.
 * 
 * * Zweite Argument: API-Key, kann in Supabase-Dashboard des Projekts unter
 *   "Settings | API Keys" gefunden werden. 
 * 
 * @returns {SupabaseClient} Supabase-Client-Objekt, muss noch authentifiziert werden
 */
function holeSupabaseClient() {

    const supabaseClient = supabase.createClient(
            "https://annymgkbnrknvkjnhdhy.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubnltZ2tibnJrbnZram5oZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDM4NzAsImV4cCI6MjA2NzgxOTg3MH0.tJTJmU_jrlEBHpFk3_TUWVLyvVDLoVPk64Dnq7hgf6U"
    );

    return supabaseClient;
}
