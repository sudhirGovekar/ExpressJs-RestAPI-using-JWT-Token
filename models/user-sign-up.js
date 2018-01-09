var mongoose  = require('mongoose');
var schema  = mongoose.Schema;


var UserSignUp  = new schema({
  firstname:{type:String,required:true},
  middlename:String,
  lastname:{type:String,required:true},
  password:{type:String,required:true},
  email:{type:String,required:true},
  contact:{type:String,required:true},
  address:String
});

module.exports=mongoose.model('UserSignUp',UserSignUp);
