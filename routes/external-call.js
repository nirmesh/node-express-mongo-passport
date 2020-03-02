var express = require('express');
var router = express.Router();
var request = require('request-promise');
router.get('/', async (req, resp) => {
  
    request({
      "method":"GET", 
      "uri": "https://jsonplaceholder.typicode.com/users",
      "json": true,
      "headers": {
      }
    }).then((res)=>{
      resp.send(res);}
    );
  });

  module.exports = router;