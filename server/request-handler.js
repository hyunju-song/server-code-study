const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors);
app.use(bodyParser);

var corsOptions = {
  origin: '*' ,
  optionsSuccessStatus: 200 
}

let messages = [];

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/messages',cors(corsOptions),function(req,res){
  res.send(JSON.stringify(messages))
});
router.post('/messages',cors(corsOptions),function(req,res){
  let message = req.body;
  messages.push(message);
  res.send(messages)
});
router.options('/messages', cors(corsOptions))


module.exports = router;
