# AI Agent Instructions

## Project

This repository contains a full-stack CMS + Portfolio application.

The project consists of:

```text
React frontend
        ↓
Axios service layer
        ↓
Express REST API
        ↓
Mongoose
        ↓
MongoDB
```

The frontend contains a public portfolio and authenticated admin CMS.

---

# Before Making Changes

Always inspect the existing repository first.

Do not assume code from previous conversations, prompts, or generated responses exactly matches the current repository.

The repository is the source of truth.

Before implementing a feature:

1. Inspect the relevant frontend files.
2. Inspect the relevant backend files.
3. Inspect the API contract.
4. Inspect models and validators.
5. Check existing reusable components/services.
6. Check current routes.
7. Check authentication requirements.
8. Then make the smallest appropriate change.

---

# Architecture Rules

## Frontend

Use the existing architecture:

```text
pages
 ↓
components
 ↓
services
 ↓
api.js
 ↓
backend
```

Do not introduce duplicate API clients.

Do not create another authentication context.

Do not create another routing system.

Reuse existing UI components.

---

# Backend

Follow:

```text
Route
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Model
```

when the existing implementation uses those layers.

Keep validation in the existing validator architecture.

Do not move business logic randomly between layers.

---

# API Rules

Use existing endpoints whenever possible.

Do not create aggregation endpoints simply because the frontend needs multiple resources.

Do not duplicate existing endpoints.

Before adding an endpoint, verify that the required information cannot already be obtained through an existing endpoint.

---

# React Rules

Be especially careful with:

```javascript
useEffect
```

dependencies.

Do not create effects that accidentally trigger infinite API requests.

When an API call is repeated unexpectedly, investigate:

* dependency arrays
* state updates
* context updates
* component remounting
* route changes
* authentication checks
* interceptors
* redirects

Do not solve these issues with arbitrary timeouts.

---

# Loading State Rules

Every asynchronous page should have a complete state lifecycle:

```text
loading
success
error
empty
```

Never leave a page permanently loading.

Always ensure loading state is reset after both successful and failed requests.

---

# Authentication Rules

Do not bypass authentication.

The admin area is protected through:

```text
AuthContext
ProtectedRoute
```

Preserve the existing session-expiry mechanism.

Do not create a second authentication mechanism.

---

# Database Rules

Do not create duplicate Mongoose indexes.

When modifying schemas:

* inspect existing indexes
* inspect unique constraints
* inspect validators
* inspect seed data

Never suppress database warnings without fixing their underlying cause.

---

# UI Rules

Use the existing design system.

Prefer:

```text
components/ui
```

for generic components.

Prefer:

```text
components/admin
```

for admin-specific composites.

Do not create slightly different versions of existing:

* Button
* Input
* Card
* Modal
* Toast
* PageHeader
* Skeleton

unless there is a genuine requirement.

---

# Debugging Rules

When debugging:

### Do not

* comment out broken features
* replace API calls with fake data
* remove authentication
* suppress errors
* add arbitrary delays
* hide console errors
* delete functionality to make the page appear working

### Do

Find the root cause.

For request loops, determine:

```text
request
→ caller
→ component
→ effect
→ dependency/state change
→ rerender/remount
→ second request
```

Fix the cause rather than the symptom.

---

# Change Management

Keep changes focused.

Do not rewrite unrelated files.

Do not delete files unless their removal is confirmed safe.

Before major changes, inspect the current git state.

After changes, report:

```text
Files modified
Files created
Files deleted
Reason for each change
```

---

# Verification

Where possible run:

```bash
npm run lint
npm run build
npm run dev
```

for the relevant application.

Verify:

* API requests
* routes
* authentication
* loading states
* error states
* responsive behavior

---

# Secrets

Never commit:

```text
.env
.env.local
.env.production
```

or:

* API keys
* passwords
* database credentials
* session secrets
* private tokens

---

# Phase Discipline

The project is currently targeting:

```text
Phase 4A → stable
```

Do not begin Phase 4B or later features while fixing Phase 4A bugs unless explicitly instructed.

Stability comes before feature expansion.

---

# Final Response After Work

After completing a task, provide:

## Summary

What was changed.

## Root Causes

What caused the bugs.

## Files Changed

List modified/created files.

## Verification

List commands/tests performed.

## Remaining Issues

Clearly identify anything that could not be verified.

## Next Step

Recommend the next development step without automatically implementing it.
