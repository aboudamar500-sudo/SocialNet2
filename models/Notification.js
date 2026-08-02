const mongoose=require("mongoose");


const NotificationSchema=new mongoose.Schema({

user:String,

type:String,

text:String,

read:{
type:Boolean,
default:false
},

createdAt:{
type:Date,
default:Date.now
}

});


module.exports=mongoose.model(
"Notification",
NotificationSchema
);
