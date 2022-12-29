const { API_FRONT } = process.env;

const io = require("socket.io")(8181, { 
    cors: {
        origin: API_FRONT,
        methods: ["GET", "POST"]
    }
});

module.exports = io;
