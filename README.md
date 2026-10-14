# ALOHAS On-Demand Ops Agent (OpsAgent)

**Cost per Run/Call:** ~$0.0012 USD (Powered by OpenAI `gpt-4o-mini`)

## What it does
OpsAgent is a lightweight, AI-native operational tool built for ALOHAS to automate pre-order campaign triage, factory Minimum Order Quantity (MOQ) tracking, and customer pre-order status lookups directly from simulated Odoo/Shopify data.

## How to run locally
1. Install dependencies: `npm install`
2. Set environment variable in `.env.local`: `OPENAI_API_KEY=your_key_here`
3. Run dev server: `npm run dev` (Open http://localhost:3000)
4. Run evals: `npm run evals`

## Why this problem?
ALOHAS operates a unique On-Demand e-commerce model where items are sold in pre-order campaigns before manufacturing. Operations teams spend hours manually comparing pre-order velocity against factory MOQs to decide when to lock campaigns and issue production orders. OpsAgent automates this triage instantly with zero SaaS overhead.

## Why this model?
We chose `gpt-4o-mini` because operational triage requires high speed, strict tool-calling capabilities, and low cost ($0.15 / 1M input tokens), avoiding expensive multi-agent pipelines for simple DB lookups.

## What I did NOT use AI for
* **Auth & Security Guardrails:** Data authorization logic (`lib/security.ts`) is deterministic TypeScript code, not an LLM prompt, ensuring 100% reliable execution.
* **MOQ Calculations:** Production threshold logic is handled deterministically in mock tools to prevent AI hallucinations on factory orders.

## Security Rule & Failure Case
* **Security Enforcement:** If a customer attempts to query another customer's order (e.g., `CUST-A` asking for `ORD-1002` belonging to `CUST-B`), the agent triggers `escalateSecurityIncident`, denies access, and logs the incident.
* **Failure Case during Iteration:** Early prompts allowed the model to summarize order data before invoking tools. **Fix:** Forced strict function calling via `zod` schemas and moved validation directly into the tool execution handler.

## To make this 10x cheaper
1. **Prompt Caching:** Enable Vercel / OpenAI prompt caching for static system prompts (~80% reduction on input tokens).
2. **Local Triage Model:** Route intent classification to an open-source model (e.g., `Llama-3.2-1B` on Cloud Run) for zero-cost routing, only calling external APIs for complex tool execution.

## To run autonomously without a human in the loop
1. **Webhook Integration:** Connect the agent directly to Shopify/Odoo webhooks to automatically send Purchase Orders to partner factories as soon as pre-order campaigns reach MOQ.
2. **Automated Evals Suite:** Expand CI/CD evals to test 100+ synthetic edge cases on every GitHub Pull Request.

## How AI was used on this project
Built using **Claude Code / Cursor**. AI was used to generate boilerplate Next.js React components and mock database structures. Manual coding was strictly applied to the `security.ts` guardrail and tool validation logic to ensure absolute deterministic execution.