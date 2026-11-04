---
name: servicenow-sdk-operations
description: Validate, build, troubleshoot, and deploy ServiceNow SDK applications safely.
---

# ServiceNow SDK Operations

Before deployment:

1. Inspect package.json and now.config.json.
2. Never run now-sdk init.
3. Never edit generated/keys.ts manually.
4. Search source and build output for Now.UNRESOLVED.
5. Stop if unresolved references are found.
6. Build using npm run build.
7. Deploy only with the innovationsp alias.
8. Report build, deployment, and verification results.