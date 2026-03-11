# up-modal React Example

**[Live demo](https://universal-everything.github.io/up-modal-react-example/)**

Minimal Vite + React 18 demo for [`@lukso/up-modal`](https://www.npmjs.com/package/@lukso/up-modal).

Shows a single **Connect** button that opens the LUKSO Universal Profile connection modal. Once connected, the address is displayed with a **Disconnect** button.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## How it works

- [`src/connector.ts`](src/connector.ts) — calls `setupLuksoConnector()` once at module scope and exports the `LuksoConnector` promise
- [`src/main.tsx`](src/main.tsx) — imports the connector (triggers setup early) and mounts the React app
- [`src/App.tsx`](src/App.tsx) — awaits the connector promise, subscribes to connection state via `wagmiConfig.subscribe()`, opens the modal on button click

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [`@lukso/up-modal`](https://www.npmjs.com/package/@lukso/up-modal) for the connection modal
- [`@wagmi/core`](https://wagmi.sh/core) for connection state management
