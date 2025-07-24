const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    // Show user's message
    io.to(socket.id).emit('chat message', { user: msg.user, text: msg.text });

    // Generate bot response
    const botReply = getBotReply(msg.text);
    setTimeout(() => {
      io.to(socket.id).emit('chat message', { user: 'Bot 🤖', text: botReply });
    }, 600);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

function getBotReply(text) {
  const message = text.toLowerCase();

  if (message.includes("hello") || message.includes("hi")) return "Hello! How can I help you today?";
  if (message.includes("how are you")) return "I'm just code, but I'm doing great! 😄";
  if (message.includes("your name")) return "I'm ChatBot 🤖, your assistant.";
  if (message.includes("bye")) return "Goodbye! Have a great day!";
  if (message.includes("help")) return "I can answer basic questions like weather, date, time, and more!";
  if (message.includes("what is the time")) return `Current time is ${new Date().toLocaleTimeString()}`;
  if (message.includes("what is the date")) return `Today's date is ${new Date().toLocaleDateString()}`;
  if (message.includes("what is javascript")) return "JavaScript is a programming language used for web development.";
  if (message.includes("who created you")) return "I was created by a developer MD shayaan ali using Node.js and Socket.io!";
  if (message.includes("what can you do")) return "I can chat with you and answer basic questions. More features coming soon!";

  return "Sorry, I didn't understand that. Try asking something like 'what is JavaScript?' or 'what is the time?'";
}

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
