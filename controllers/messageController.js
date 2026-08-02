const Message=require("../models/Message");


exports.list=async(req,res)=>{


if(!req.session.user){

return res.status(401).json({

success:false

});

}


const id=req.session.user.id;


const messages=await Message.find({

$or:[

{sender:id},

{receiver:id}

]

})
.sort({
createdAt:1
});


res.json(messages);


};





exports.send=async(req,res)=>{


if(!req.session.user){

return res.status(401).json({

success:false

});

}



const message=new Message({

sender:req.session.user.id,

receiver:req.body.receiver,

text:req.body.text

});



await message.save();



res.json({

success:true,

message

});


};
