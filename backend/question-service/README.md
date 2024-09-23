# Question Service

This is a simple Question Service built with Express.js.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Getting Started

Install dependencies

```bash
npm install
```

Build Typescript files

```bash
npm run build
```

Run server

```bash
npm run start
```

Service runs on port 3000.

## Validation with Zod

This service uses the Zod library for schema validation of incoming query parameters. Zod helps ensure that the data provided in API requests is of the correct type and format before processing.

### Example: Query Parameter Validation

In the /questions endpoint, we validate the following query parameters:

- id: Must be a number (optional)
- category: Must be a string or an array of strings (optional)
- difficulty: Must be either "easy", "medium", or "hard" (can also be an array of these values) (optional)
