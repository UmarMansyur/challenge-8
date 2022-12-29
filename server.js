const app = require("./app.js");
const io = require("./utils/socket.js");
const axios = require("axios");
const server = app.listen(8080, () => {
  console.log("listening on *:8080");
});

io.on('connection', async (socket) => {
  const userId = 1;
  const { data } = await axios.get(`http://localhost:8080/notification/${userId}`);
  socket.on('LOAD_NOTIFICATIONS', (userId) => {
      io.emit(`NOTIFICATIONS-${userId}`, data.data);
  });

  socket.on('READ_NOTIFICATION', (userId) => {
      io.emit(`NOTIFICATIONS-${userId}`, data.data);
  });      
});

module.exports = server;
