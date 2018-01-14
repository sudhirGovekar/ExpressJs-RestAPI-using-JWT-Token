var mongoose    =   require('mongoose');
var schema  =   mongoose.Schema;

var todoModel   =   schema({
    title:{ type:String,required:true},
    description:{type:String,require:true}
});

module.exports=mongoose.model('todoModel',todoModel);