// client.js will run in each browser tab

const statusElement = document.querySelector("#status");
const userCount = document.querySelector("#user-count");
const messages = document.querySelector("#messages");
const form = document.querySelector("#message-form");
const input = document.querySelector("#message-input");

const username = `User-${Math.floor(Math.random() * 1000)}`;

// Connect to the WebSocket server
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  statusElement.textContent = `Connected as ${username}`;
});

socket.addEventListener("close", () => {
  statusElement.textContent = "Disconnected";
});

// Handler for broadcasts
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  if (message.type === "chat") {
    const element = document.createElement("p");

    element.textContent = `${message.username}: ${message.text}`;

    messages.appendChild(element);
  }

  if (message.type === "users") {
    userCount.textContent = message.count;
  }
});

// Handler for sending messages
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!input.value.trim()) {
    return;
  }

  socket.send(
    JSON.stringify({
      username,
      text: input.value,
    }),
  );

  input.value = "";
});
