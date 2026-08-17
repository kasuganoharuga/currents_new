# Luma API capabilities for Currents

Last verified: 17 August 2026.

## Current integration

- Calendar: `Currents Community`
- Calendar ID: `cal-97DAgWBFfaaIiye`
- The calendar page reads upcoming events through the server-side Luma API.
- The browser receives only the fields required for event cards. The API key
  remains in a server-only environment variable.
- Luma guest registration changes can be mirrored into PostgreSQL through the
  signed webhook endpoint at `POST /api/luma/webhooks`.

## What the API can do

| Area               | Supported capabilities                                                                    | Currents use case                                                         |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Events             | List, read, create, update and cancel events                                              | Replace the calendar iframe and later add an internal event-management UI |
| Event presentation | Cover, title, date, time, timezone, location, online status, description and public URL   | Branded event cards and detail pages                                      |
| Registration state | Registration open/closed, approval requirement, waitlist and remaining capacity           | Accurate card status and CTA text                                         |
| Guests             | List/get guests, add guests, invite guests, update approval status and ticket assignments | Admin-assisted registration and guest operations                          |
| Tickets            | Read and manage ticket types; support multiple tickets                                    | Display/select ticket types before Luma checkout                          |
| Coupons            | Calendar-level and event-level coupon management                                          | Partner and campaign discount codes                                       |
| Contacts           | Import, list, tag, block, remove and restore calendar contacts                            | Copy Currents applications into the Luma audience                         |
| Memberships        | List membership tiers, add members and approve/decline status                             | Future Currents membership integration after tiers are configured         |
| Webhooks           | Event, guest, ticket and calendar-person notifications                                    | Synchronise Luma registrations and status changes into PostgreSQL         |
| Organizations      | Read organization calendars and events                                                    | Future multi-city or chapter administration                               |

## Important data distinctions

### Contact

A calendar contact is an audience record. Importing a Currents applicant as a
contact does not automatically make that person a Luma follower, member or
event guest.

### Member

A member belongs to a Luma Membership Tier. Currents Community currently has
no membership tiers configured, so a website user cannot yet be synchronised
as a true Luma member.

### Guest

A guest is a registration for one event. The same person can have separate
guest records for different events. `guest.registered` and `guest.updated`
webhooks are the right source for the Currents registration mirror.

## Recommended production flow

```text
Luma API -> Currents calendar cards

Currents Register button -> Luma embedded checkout overlay
                                  |
                                  v
                         Luma registration/payment
                                  |
                                  v
                         signed Luma webhook
                                  |
                                  v
                         Currents PostgreSQL
```

For paid tickets, keep checkout, payment, approval, confirmations and refunds
inside Luma. Currents should own the presentation and local data mirror rather
than reimplementing Luma's checkout.

## Login and in-page booking feasibility

### Supported: in-page registration and payment

Luma provides an official checkout-button script:

```html
<a
  href="https://luma.com/example"
  data-luma-action="checkout"
  data-luma-event-id="evt-example"
  data-luma-utm-source="currents-calendar"
>
  Register
</a>
<script src="https://embed.lu.ma/checkout-button.js"></script>
```

The button opens the Luma registration or payment flow in an overlay without
leaving Currents. Luma owns the overlay UI. A normal event link remains the
fallback if the script is blocked. Apple Pay is not available inside embeds,
so users who specifically need Apple Pay must open the event on Luma.

### Not exposed: consumer "Sign in with Luma" OAuth

The current public OpenAPI specification exposes API-key authentication for
server integrations but no visitor OAuth authorize/token/login endpoints.
Currents therefore cannot create a native "Sign in with Luma" account-linking
flow for ordinary visitors with the public API.

Luma Enterprise SSO is a different feature: an organization configures Luma as
an OIDC application so its workforce can sign in to Luma through the
organization's identity provider. It does not make Luma an identity provider
for Currents visitors.

In the embedded checkout, Luma can still recognise an existing Luma visitor or
ask for their email/sign-in verification within Luma's own flow. Currents
should not collect or proxy Luma passwords or verification codes.

## Limits and implementation notes

- Calendar API keys have broad access to the scoped calendar and must never be
  sent to the browser or committed to Git.
- Calendar API keys are limited to approximately 200 requests per minute.
- The list endpoint does not include full descriptions, so managed events need
  a cached detail request.
- Events only listed from another calendar have restricted fields and may not
  expose their full description or management data.
- Embedded checkout supports free and paid registrations, ticket selection,
  coupons and campaign attribution.
- Luma sends a `luma:purchase` browser message after free or paid embedded
  checkout, which can be used for analytics. Authoritative registration data
  should still come from signed webhooks.

## References

- [Luma API getting started](https://docs.luma.com/reference/getting-started-with-your-api)
- [Luma API conventions](https://docs.luma.com/reference/api-conventions)
- [Embed Luma on your website](https://help.luma.com/p/embed-luma-on-your-website)
- [Luma checkout examples](https://github.com/luma-team/examples)
- [Luma webhooks](https://help.luma.com/p/webhooks)
- [Luma event registration process](https://help.luma.com/p/event-registration-process)
- [Luma Enterprise SSO](https://help.luma.com/p/sso)
- [Luma rate limits](https://docs.luma.com/reference/rate-limits)
