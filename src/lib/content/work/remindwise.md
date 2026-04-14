---
title: "Externalising the mental load of household admin"
company: "RemindWise"
role: "Built independently"
period: "2026"
summary: "A household renewal tracker that sends reminders before things lapse. Built to solve a real problem: the invisible labour of remembering dozens of deadlines that nobody writes down."
order: 1
published: true
url: "https://remindwise.io"
---

## Context

Every household runs on a quiet infrastructure of recurring commitments. Insurance renewals, MOT dates, boiler servicing, warranty expirations, school events, subscription billing dates. Most of this lives in someone's head, usually one person's.

That person carries the load of remembering when the car insurance is up, whether the boiler was serviced this year, when parents evening is and whether the pet insurance renewed on the old or new card. None of these are difficult on their own. Taken together, they become a constant background task.

RemindWise brings this into a shared view. Commitments are captured once, reminders are sent ahead of time and everyone in the household can see what's coming up.

## Problem

The problem is simple but poorly served.

Calendars are too noisy for this. Spreadsheets work until they don't. Most reminder apps lack structure. Setting up dozens of reminders across different tools and keeping them in sync with another person is not something people stick with.

Key pain points:

- **Renewals that lapse silently.** Home insurance, breakdown cover and pet insurance can expire without notice, leaving gaps in cover or lost renewal discounts.
- **The loyalty penalty.** In the UK, insurers have historically increased prices for customers who auto-renew. Knowing when renewals are due gives time to compare.
- **Shared visibility.** One person should not be the single point of failure for whether something gets done. Both adults need to see what's outstanding.
- **Document retrieval.** Finding a policy number late in the evening should not involve searching through old emails.

## Approach

### Data model

Each household has members and records. A record represents a commitment with a name, category, renewal date, optional notes and optional document attachments. Categories cover insurance, vehicles, warranties, subscriptions, household services and family dates.

Reminders are triggered ahead of renewal, with sensible defaults.

### Shared household model

Members are invited by email and share a single view. The dashboard surfaces what needs attention, who owns it and what is coming up next.

Access control is primarily application-level. A server hook resolves the user's householdId from their membership on every request and attaches it to the request context. Every data query filters by householdId. Accessing another household's data returns a 404.

RLS is enabled on all Supabase tables but with no policies defined. Prisma connects as a superuser which bypasses RLS, so the RLS layer acts as a defensive perimeter blocking any direct PostgREST or anonymous key access to application tables. For Supabase Storage, RLS policies are defined on the document bucket, checking that the folder path matches a household the user belongs to.

### AI capture

A natural language input allows users to add records conversationally. "Car insurance renews 15 March" becomes a structured record with the correct category and date.

The pipeline has four layers. Deterministic pre-extraction runs first, using regex to pull dates, amounts and provider names as ground truth hints. The LLM then performs structured extraction (GPT-4o-mini for text, GPT-4o for documents and images) with forced JSON output. Post-processing validation cross-checks LLM output against the deterministic layer, fixing date, category and lifecycle inconsistencies. Finally, a weighted confidence score from 0.0 to 1.0 is calculated per field.

Routing depends on confidence. Scores above 0.80 auto-create the record. Between 0.50 and 0.79, the record is created but opened in edit mode. Below 0.50, the user sees a confirmation modal with per-field confidence badges and must review before anything is saved. All AI metadata including confidence scores and uncertain fields is stored on the record for audit.

This reduces friction at the point of entry, which is where most tools fail.

### Technical decisions

SvelteKit frontend, Supabase for authentication and storage and Vercel for deployment. The marketing site and application run on separate subdomains. The stack is consistent across all my side projects. SvelteKit gives strong end-user performance with minimal overhead and Supabase provides authentication, storage and Postgres without managing infrastructure. Speed of delivery matters when building outside work hours.

### Reminder pipeline

Reminders are delivered by email via Resend. Two Vercel cron jobs run at 8 AM UTC: a daily scan for records approaching their reminder window (default 7 days, configurable per record) and a weekly digest every Monday with a 7-day lookahead.

Emails include RFC 8058 one-click unsubscribe headers. Users control preferences via per-member flags for daily reminders and weekly summaries.

Idempotency is handled through a ReminderLog table with a composite key of householdId and sentDate, preventing duplicate sends. A separate ReminderDeliveryLog tracks per-member delivery status for debugging failed sends. Both cron endpoints are protected with bearer token authentication.

### Privacy position

No ads, no tracking and no third party data sharing. Anonymous analytics only. Documents are stored in private buckets with encryption at rest. OpenAI does not retain data for training.

Household data is sensitive, so this is made explicit.

## Tradeoffs

### Scope discipline

There is a clear temptation to expand into a full household platform with bill splitting, shopping lists and task management.

The scope was kept deliberately narrow. Renewals, deadlines and reminders. One job, done well.

This limits the surface area but keeps the product understandable and focused.

### AI as an input layer

AI is used to reduce friction, not as the core of the product.

The value is in structured data and reliable reminders. If the language model disappeared, the product would still function. That constraint keeps the system stable.

### Freemium pricing

The free tier allows a limited number of records and a single household member. The paid tier unlocks full usage.

Products in this space compete with free alternatives, so the upgrade needs to feel obvious rather than something users have to justify.

### UK-first approach

The product is designed around UK-specific patterns such as MOTs, council tax and insurance cycles.

Expanding internationally would require rethinking categories and defaults. A focused product is more useful than a generic one.

## Outcome

RemindWise is live and used by real households.

Usage reflects the initial assumption. Most records relate to insurance, vehicles and subscriptions, where the cost of forgetting is highest.

The technical footprint is intentionally small. Supabase handles authentication and storage, Vercel handles deployment and the codebase remains simple enough to maintain without additional overhead.
