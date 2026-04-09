# Supabase Setup

1. Open the SQL Editor in your Supabase project and run [supabase/schema.sql](supabase/schema.sql).
2. Add the shop owner's email to the admin allow-list:

```sql
insert into public.admin_emails (email)
values ('owner@example.com')
on conflict (email) do nothing;
```

3. In Supabase Auth, keep Email enabled and use magic links.
4. Set the Site URL to `http://localhost:5173`.
5. Add `http://localhost:5173/admin` to the redirect URLs.
6. Start the app with `npm run dev`.
7. Open `/admin`, request a magic link, sign in with the allowed email, then use the import button to load the starter catalog into Supabase.