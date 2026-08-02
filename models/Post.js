const mongoose=require("mongoose");


const PostSchema=new mongoose.Schema({

user:{
type:String,
required:true
},

username:String,

text:String,

image:String,

likes:[String],


comments:[{

user:String,

username:String,

text:String,

pinned:{
type:Boolean,
default:false
},

replies:[{

user:String,

username:String,

text:String,

createdAt:{
type:Date,
default:Date.now
}

}],

createdAt:{
type:Date,
default:Date.now
}

}],


createdAt:{
type:Date,
default:Date.now
}


});


module.exports=mongoose.model(
"Post",
PostSchema
);
