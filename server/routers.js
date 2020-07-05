const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors);
app.use(bodyParser);
const controllers = require('./controller');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

var corsOptions = {
    origin: '*' ,
    methods: 'GET, PUT, POST, OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    maxAge: 10
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.get('/messages', cors(corsOptions), controllers.getMessageController);
router.post('/messages', cors(corsOptions), controllers.postMessageController);
router.options('/messages', cors(corsOptions))
router.use(function(req, res) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = router;