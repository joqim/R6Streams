var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var Promise = require('bluebird');
var streams = require('./routes/streams');
var uploads = require('./routes/upload');
const http = require('http');

const WebSocket = require('ws');
dotenv.config();

const app = express();

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

const port = process.env.PORT || 5000;

var server = http.createServer(app);
server.listen(port);

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('ws connection succeeded')
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});