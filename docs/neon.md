# Neon PostgreSQL

The portfolio keeps the existing Payload PostgreSQL adapter. Neon hosts PostgreSQL remotely; no Docker service is needed for the app after the connection is switched.

## Connect

Run `npm run setup:neon` to create `.env` if it does not exist. Existing credentials are never overwritten by this command.

In Neon, select a project and branch and open **Connect**. Use the exported Neon names: put the direct URL in `DATABASE_URL` and the pooled URL in `DATABASE_URL_POOLED`, for the same branch, database, and role. The previous `DATABASE_URL` (pooled) + `DATABASE_URL_DIRECT` naming remains supported. Keep Neon's TLS parameters, including `sslmode=require`. Keep the existing `PAYLOAD_SECRET` when moving an existing database. Never use a `NEXT_PUBLIC_` prefix for database credentials.

Alternatively, provide a Neon API key through the ignored `.env` as `NEON_API_KEY`. This is only a provisioning credential; the running site needs the database URLs, not the API key. Do not paste credentials into chat or commit them.

## Preserve existing content before switching

Changing the URL does not copy local data. If the local database contains content, first export it with `pg_dump` and restore it to an empty Neon database using the direct URL. Preserve the original database until row counts and CMS access have been verified. Keep the existing local `media/` files as well: moving PostgreSQL does not move uploads. On deployment, configure the existing S3 adapter for persistent media.

Do not seed or apply the initial migration on top of a restored database blindly. Check `npm run db:status` first. A database originally created with development schema push may need its existing schema reconciled with the migration history before subsequent migrations.

For a **new empty** Neon database, run:

```sh
npm run db:migrate
npm run seed
npm run dev
```

Open `http://127.0.0.1:3000/admin`. If this is a fresh database, create your administrator with `ALLOW_FIRST_USER=true`, then set it to `false` and restart. Seeding does not migrate existing data or create an administrator.

## Schema changes

Cloud connections always disable automatic schema push, even when Next.js runs in development mode. Use reviewed migrations. `npm run db:migrate`, `npm run db:migration`, and `npm run db:status` use `DATABASE_URL_DIRECT` when provided. Runtime requests prefer `DATABASE_URL_POOLED`, falling back to `DATABASE_URL`, with a five-connection pool and a 20-second connection timeout to accommodate a sleeping Neon compute.

The old `setup:local` command and Docker compose file remain available for recovery; they are optional and are not part of the Neon workflow.

References: [Neon connections](https://neon.com/docs/connect/connect-from-any-app), [Payload PostgreSQL](https://payloadcms.com/docs/database/postgres), [Payload migrations](https://payloadcms.com/docs/database/migrations).

## Neon Object Storage

The existing Payload S3 adapter accepts Neon's exported names directly:

- `AWS_ENDPOINT_URL_S3`: branch storage endpoint.
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: storage credentials, not a Neon management API key.
- `AWS_REGION`: use the exact region Neon supplies.
- `S3_BUCKET`: an existing bucket, such as `projects`.

The previous `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` aliases still work. Path-style addressing remains enabled, and Payload continues enforcing media access through its API. No API key or extra Neon SDK is required when these connection credentials are available. Keep `PAYLOAD_SECRET` and `NEXT_PUBLIC_SERVER_URL` alongside the Neon values in `.env`.
