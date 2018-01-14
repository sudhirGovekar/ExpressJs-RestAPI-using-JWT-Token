var express = require('express');
var router = express.Router();
var bcrypt  = require('bcrypt');
var jwt = require('jsonwebtoken');

var signupModel = require('../models/user-sign-up');
/* GET users listing. */
router.post('/signin', function(req, res, next) {
  signupModel.findOne({email:req.body.email},function(err,data){
    if(err){
      return res.json({
        "status":500,
        "Error":err
      })
    }
    if(!data){
      return res.json({
        status:401,
        Message:"Invalid Login Details"
      })
    }
    if(!bcrypt.compareSync(req.body.password,data.password)){
      return res.json({
        "status":"401",
        "Message":"invalid login details"
      })
    }
    var token = jwt.sign({details:data},'secret',{expiresIn:7500});
    res.json({
      "status":200,
      "Message":"Login successfull",
      "Token":token
    })

  })
});

router.post('/',function(req,res,next){
  var saveUserSignData  = new signupModel({
     firstname:req.body.firstname,
     middlename:req.body.middlename,
     lastname:req.body.lastname,
     password:bcrypt.hashSync(req.body.password,10),
     email:req.body.email,
     contact:req.body.contact,
     address:req.body.address
  })

  signupModel.findOne({email:req.body.email},function(err,data){
    if(err){
      return res.json({
        "status":500,
        "Error":err
      })
    }
    if(!data){
      saveUserSignData.save(function(err,result){
        if(err){
          return res.json({
            "status":500,
            "Error":err
          })
        }
        res.json({"Result":result});
      })
    }

    return res.json({
      "status":200,
      "Error":"Records already exist"
    })
  })


})

module.exports = router;
