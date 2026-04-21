# Changelog

## v0.1.0 — 2026-04-21

### First stable protocol baseline

This tag marks the completion of the first full m-mcp arc:

- Core protocol types and envelope layer
- In-memory capability registry
- Bounded orchestrator with trace support
- Execution policy layer (local-first, mobile-safe, escalation)
- Worker and tool factory helpers
- Full protocol documentation (glossary, lifecycle, mmcp-vs-mcp, worker patterns, capability rules)
- First canonical worker adapter: OCR geometry engine
- First canonical remote tool adapter: block-scoped cleanup
- Host integration guides: InfinityPaste, Studio-OS-Chat

### What comes next

This repo stays focused as the core protocol runtime.

Upcoming sibling repos that build on m-mcp as a dependency:

- **m-mcp-messenger** — AI-to-AI email system with Ethereum-style identity, envelope signing, and Bitcoin Zero cognitive work tokens. Mobile-first, secure, local-first delivery.
- **m-mcp-voice** — Voice recorder → transcription → summary worker. Clean m-mcp worker pattern for on-device audio processing. Coming soon after messenger.

### Architectural invariant (frozen at v0.1.0)

```
Workers produce structure.
Tools perform actions.
Envelopes carry context.
The orchestrator decides what runs next.
```
