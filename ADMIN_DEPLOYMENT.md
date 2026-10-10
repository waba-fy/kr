# KeyRoutes Admin Dashboard Deployment

## Production URLs

- Website: `https://keyroutes.co`
- API: `https://api.keyroutes.co`
- Admin dashboard: `https://keyroutes.co/admin`

## Backend environment

Copy `backend/.env.example` to the Plesk Node.js environment and provide real values. Generate `JWT_SECRET` as a long random value (at least 64 characters). Do not commit the production `.env` file.

`BACKEND_PUBLIC_URL` must be `https://api.keyroutes.co`. Email tracking pixels and tracked links use this value. Configure a separate long random `SETTINGS_ENCRYPTION_KEY`; it encrypts SMTP/app passwords saved through the dashboard and must remain stable across deployments.

## First deployment

From the backend application directory:

```text
npm ci --omit=dev
npm run create-admin
npm run migrate-content
npm start
```

`create-admin` uses the `SUPER_ADMIN_*` environment variables. `migrate-content` imports case studies, success stories, client stories and reviews without overwriting content that already exists in MongoDB.
It also imports Services, Strategy, Products, About, Careers content and the existing public job openings. Existing dashboard records are not overwritten.

From the frontend directory:

```text
npm ci
npm run build
```

Publish the generated `frontend/dist` directory as the document root for `keyroutes.co`. The production frontend already uses `https://api.keyroutes.co/api`.
Configure the frontend domain to rewrite unknown browser routes (including `/admin`) to `index.html`; otherwise refreshing a React route will return a server 404.

## Plesk configuration

- Configure the backend as a Node.js application with `backend/server.js` as the startup file.
- Map `api.keyroutes.co` to the Node.js application.
- Enable HTTPS for both domains.
- Keep `backend/uploads/resumes` outside public static serving and include it in backups.
- Ensure the Node.js process can write to `backend/uploads/resumes`.
- Restart the Node.js application after changing environment variables.

## Gmail tracking limitation

Open tracking uses a one-pixel image. Gmail can proxy or prefetch images, so an open means the tracking image was requested and is an approximate engagement signal. Tracked link clicks are more reliable. Both appear in the Emails area of the admin dashboard.

## Updating existing content

The public site falls back to its bundled JavaScript data if the API is temporarily unavailable. Once migrated, active MongoDB entries override bundled case studies, client stories, success stories and reviews. Disabling an entry in the dashboard removes it from the public API without deleting it.
