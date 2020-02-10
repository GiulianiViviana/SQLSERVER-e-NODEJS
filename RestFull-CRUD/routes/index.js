var express = require('express')
var router = express.Router();
var cors = require('cors');
var app = express();

app.use(cors())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const path = require('path');

app.get('/',function(req,res){
 res.sendFile(path.join(__dirname+'/index.html')); //__dirname : Ritorna la cartella del progetto
});

module.exports = router;
