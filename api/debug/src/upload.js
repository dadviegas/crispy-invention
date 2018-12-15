
import Express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'

const app = Express();
const serverPort = 2000;
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "../upload");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage: Storage }).any(); //Field name and max count

app.use(bodyParser.json());

app.post("/api/Upload", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    return res.end("File uploaded sucessfully!.");
  });
});

app.listen(serverPort, function (a) {
  console.log(`Listening to port ${serverPort}`);
});