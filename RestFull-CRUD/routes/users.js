const sql = require('mssql')
var express = require('express');
var router = express.Router();
var cors = require('cors');
var app = express();
var createError = require('http-errors');

app.use(cors());

const config = {
  user: '4DD_14',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_14', //(Nome del DB)
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select * from dbo.[cr-unit-attributes]', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
  });
});

router.post('/', cors(), function (req, res, next) {
  console.log(req.body);
  // Add a new Unit  
  let unit = req.body;
  if (!unit) {
    next(createError(400 , "Please provide a correct unit"));
  }
  sql.connect(config, err => {
    let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit,Cost,Hit_Speed) 
                     VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}')`;
    let sqlRequest = new sql.Request();
    sqlRequest.query(sqlInsert, (error, results) => {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
  })
});


router.get('/search/:name/', function(req, res, next) {
  sql.connect(config, err => {
    // ... error check
    if(err) console.log(err);
    // Query
    let sqlRequest = new sql.Request();
    sqlRequest.query(`select * from dbo.[cr-unit-attributes] where unit = '${req.params.name}'`, (err, result) => {
        // ... error checks
        if (err) console.log(err);

        res.send(result);
    });
  });
});
module.exports = router;
