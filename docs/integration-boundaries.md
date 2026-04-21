# Integration boundaries

This document defines how host apps should integrate M-MCP without creating architectural drift.

## Rule 1 — One boundary per host app

Each host app should define a small integration layer for M-MCP.

Examples:

**InfinityPaste**

```text
src/lib/mmcp/
```

**Studio-OS-Chat**

```text
src/lib/mmcp/
```

## Rule 2 — Do not scatter capability imports

Host UI, storage, and feature modules should not import worker/tool adapters directly from random protocol files.

Instead, they should call host-local integration functions.

## Rule 3 — Host apps own UX and persistence

M-MCP owns:

- capability protocol
- envelope contract
- bounded execution
- traces

Host apps own:

- UI
- persistence
- feature routing
- product decisions

## Rule 4 — Do not treat M-MCP as a server

M-MCP is a runtime/protocol layer, not a background server process.

## Rule 5 — Keep adapters explicit

Any host-specific adaptation should live in the host app, not be smuggled into protocol core modules.
