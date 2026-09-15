const express = require("express");
const http = require("http");
const { WebSocketServer, WebSocket } = require("ws");

const app = express();
const server = http.createServer(app);

// Serve everything inside /public
app.use(express.static("public"));

// Attach a WebSocket server to the same HTTP server
const wss = new WebSocketServer({ server });

// Runs when client.js creates a new socket with `new WebSocket();`
wss.on("connection", (socket) => {
  console.log("Client connected");

  broadcastUserCount();

  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());

    console.log("Received:", message);

    // Send the message to every connected client
    broadcast({
      type: "chat",
      username: message.username,
      text: message.text,
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    broadcastUserCount();
  });
});

// For sending messages
function broadcast(message) {
  const data = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// For updating userCount
function broadcastUserCount() {
  broadcast({
    type: "users",
    count: wss.clients.size,
  });
}

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
