const Notification=require("../models/Notification");


exports.list=async(req,res)=>{


if(!req.session.user){

return res.status(401).json({

success:false

});

}


const notifications=await Notification.find({

user:req.session.user.id

})
.sort({
createdAt:-1
});


res.json(notifications);


};





exports.create=async(req,res)=>{


const notification=new Notification({

user:req.body.user,

type:req.body.type,

text:req.body.text

});


await notification.save();



res.json({

success:true

});


};
