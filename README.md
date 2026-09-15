# WebSocket Demo

A simple WebSocket demo built with Node.js, Express, and the `ws` library.

The demo shows real-time communication between multiple browser clients. Messages sent from one client are immediately broadcast to all connected clients, and the number of connected users is updated automatically.

## Run the demo

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

Open the page in multiple browser tabs or windows to simulate multiple clients.

Send a message from one client and it should immediately appear in all connected clients.
