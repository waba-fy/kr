# KeyRoutes Client Dashboard

## URLs

- Super Admin client management: `https://keyroutes.co/admin` → **Clients**
- Client login: `https://keyroutes.co/client`
- API base: `https://api.keyroutes.co/api`

## Adding a client

1. Open **Control Center → Clients** and create the client using the landing-page domain.
2. Open the client and add all landing-page URLs. Every landing-page domain becomes an authorized domain for that client's tracker.
3. Enter the correct GA4 Property ID and Measurement ID on each landing page/domain. Different domains may use different properties and web streams.
4. Create at least one client login. Client access can be disabled independently or by disabling the whole client.
5. Copy the generated website event-tracker script into every landing page before `</body>`.

The event tracker records page views, general clicks, form submissions, phone clicks, email clicks and WhatsApp clicks. Add `data-kr-event="event_name"` to any link, button or form when a custom event name is required.

## Analytics data

The dashboard already supports daily metrics from Google Analytics, Google Ads, Meta, website tracking or another source. Data can be entered through the Super Admin client workspace or sent to the protected daily analytics endpoint by a scheduled synchronization job.

Live Google and Meta synchronization requires production OAuth/service-account credentials and account access. IDs alone identify the properties but do not authorize reading private reporting data. Keep all access tokens and private keys in Plesk environment variables or encrypted backend storage; never place them in frontend code.

## Reports

Super Admin selects a client and date range, generates a report, and chooses **Draft** or **Published**. Only published reports appear in that client's portal. A published report is a permanent snapshot, so later analytics changes do not rewrite historical reports.
