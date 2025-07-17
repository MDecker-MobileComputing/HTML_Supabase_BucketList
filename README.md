# Bucket List mit Supabase #

<br>

Dieses Repo enthält eine Web-Seite, die eine [Bucket List](https://www.brigitte.de/liebe/persoenlichkeit/bucket-list--152-ideen-fuer-unvergessliche-life-goals-13526550.html#was-ist-eine-bucket-list) 
implementiert. Das Backend ist mit [Supabase](https://supabase.com/) implementiert.
Für die Authentifzierung werden Email+Passwort verwendet.

<br>

Web-App via *GitHub Pages*: https://mdecker-mobilecomputing.github.io/HTML_Supabase_BucketList/ 

(funktioniert nicht, weil zugehörige Supabase-Instanz pausiert wurde)

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

SQL-Befehle um *Row Level Security* aktivieren:
```
alter table "bucketlist" enable row level security;

create policy "Benutzer können eigene Bucketlist-Einträge abrufen"
  on bucketlist
  for select
  using (benutzer_id = auth.uid());

create policy "Benutzer können eigene Bucketlist-Einträge einfügen"
  on bucketlist
  for insert
  with check (benutzer_id = auth.uid());

create policy "Benutzer können eigene Bucketlist-Einträge bearbeiten"
  on bucketlist
  for update
  using (benutzer_id = auth.uid());

create policy "Benutzer können eigene Bucketlist-Einträge löschen"
  on bucketlist
  for delete
  using (benutzer_id = auth.uid());
```

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>
