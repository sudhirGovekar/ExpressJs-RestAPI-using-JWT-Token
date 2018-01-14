var express=require('express');
var bcrypt  = require('bcrypt');
var jwt = require('jsonwebtoken');

var signupModel = require('../models/user-sign-up');
var todo    =   require('../models/todoModel');

var router=express.Router();

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.get('/profileDetails',function(req,res,next){

    var decoded = jwt.decode(req.query.token);
    signupModel.findOne({email:decoded.details.email},function(err,data){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        return res.status(201).json({
            title: 'Profile Record`',
            Result: data
        });
       
    })
   
});

router.post('/addTask',function(req,res,next){
    console.log(req.body);
    var tododetails =   new todo({
        title:req.body.title,
        description:req.body.description
    });

    tododetails.save(function(err,data){
        return res.json({
            title:"Todo Added Successfully",
            Result:data
        })
    })
});

router.patch('/updateTask/:id',function(req,res,next){

    console.log(req.body);
    todo.findById(req.params.id,function(err,result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!result){
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }

        result.title=req.body.title;
        result.description=req.body.description;

        result.save(function(err,data){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(!result){
                return res.status(500).json({
                    title: 'No Message Found!',
                    error: {message: 'Message not found'}
                });
            }
            return res.json({
                title:"Todo updated Successfully",
                Result:data
            })
        })
    })

});

router.delete('/deleteTask/:id',function(req,res,next){
    todo.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        todo.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });

});
module.exports=router;