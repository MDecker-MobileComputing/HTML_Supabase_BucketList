# Bucket List mit Supabase #

<br>

Web-App via *GitHub Pages*: https://mdecker-mobilecomputing.github.io/HTML_Supabase_BucketList/

<br>

----

## Datenbank ##

<br>

Tabelle auf Datenbank anlegen:
```
create table bucketlist (
    id SERIAL PRIMARY KEY,
    benutzer_id uuid not null references auth.users(id) on delete cascade,
    eintrags_nr integer not null, 
    titel text not null,
    unique ( benutzer_id, eintrags_nr )
);
```

<br>

Wegen `on delete cascade` werden bei Löschung eines Nutzers die zugehörigen
Einträge in der Tabelle gelöscht.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>
