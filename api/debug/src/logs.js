import Express from 'express';
import bodyParser from 'body-parser';
import jsonfile from 'jsonfile';
import sockertIo from 'socket.io';
import cors from 'cors';
import path from 'path';

const app = Express();
var http = require('http').Server(app);

const serverPort = 2001;
const jsonlogFile = (id) => path.resolve(__dirname, `../logs/${id}.json`);

const getDate = () => {
  const date = new Date();
  return `${date.toLocaleString()} | ${date.getMilliseconds()}ms`;
}

const appendToFile = (deviceId, obj) => {
  const data = {
    date: getDate(),
    ...obj,
  }
  jsonfile.writeFile(jsonlogFile(deviceId), data, { flag: 'a' }, function (err) { // spaces: 2, 
    if (err) console.error(err)
  })
  return data;
}

function addHeaders(response) {
  response.set('page-size', 20);
  response.set({
    'ETag': '12345'
  });
  response.set('Access-Control-Expose-Headers', 'page-size')
}

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/logs/device/:id', (req, res) => {
  if (!req.params.id) {
    res.status(404).end();
  }

  jsonfile.readFile(jsonlogFile(req.params.id), function (err, obj) {
    if (err) {
      res.status(500).end();
    }
  })

  addHeaders(res);
  res.send({ hello: 'world' });
})

app.post("/api/log", (req, res) => {
  const { body } = req;
  const { deviceId = 'logs', ...rest } = body;

  if (Object.keys(body).length) {
    const eventData = appendToFile(deviceId, rest);
    eventData.deviceId = deviceId;
    io.emit('event', eventData);
  }

  console.log(`${getDate()} - ${deviceId} ${body.message}`);

  addHeaders(res);
  return res.sendStatus(204);
});

const server = http.listen(serverPort, () => {
  console.log(`Listening to port ${serverPort}`);
});

var io = sockertIo.listen(server, { origins: '*:*' });
