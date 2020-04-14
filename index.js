var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.config();
var Promise = require('bluebird');
var streams = require('./routes/streams');
var uploads = require('./routes/upload');
const { Server } = require('ws');

//create an express server on the PORT
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log("App listening on port" + PORT);

//create a websocket server for the same express server
const wss = new Server({ port: PORT});
wss.on('connection', function connection(ws) {
  console.log('ws connection succeeded')
  ws.on('message', function incoming(data) {
    console.log('ws server recieved a message')
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

global.app = app;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//db connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use("/streams", streams);
app.use("/upload", uploads);

app.use(express.static(path.join(__dirname, "client", "build")));

app.locals.appExpress = app;

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client","build","index.html"));
});

// app.listen(8080, () => console.log("Running on host"));