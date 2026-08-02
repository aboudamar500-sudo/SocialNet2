const bcrypt=require("bcryptjs");
const User=require("../models/User");



exports.register=async(req,res)=>{

try{


const username=String(req.body.username||"").trim();

const email=String(req.body.email||"")
.toLowerCase()
.trim();

const password=String(req.body.password||"");


if(!username||!email||!password){

return res.json({

success:false,

message:"Missing data"

});

}



const exists=await User.findOne({
email
});


if(exists){

return res.json({

success:false,

message:"Email exists"

});

}



const user=new User({

username,

email,

password:await bcrypt.hash(password,12)

});


await user.save();



res.json({

success:true

});



}catch(e){

res.status(500).json({

success:false,

error:e.message

});

}


};






exports.login=async(req,res)=>{


try{


const email=String(req.body.email||"")
.toLowerCase()
.trim();


const password=String(req.body.password||"");



const user=await User.findOne({
email
});



if(!user){

return res.json({

success:false

});

}



if(user.blocked){

return res.json({

success:false,

message:"Blocked"

});

}



const ok=await bcrypt.compare(
password,
user.password
);



if(!ok){

return res.json({

success:false

});

}



req.session.user={

id:user._id.toString(),

username:user.username,

admin:user.admin

};



res.json({

success:true

});



}catch(e){

res.status(500).json({

success:false

});

}


};






exports.logout=(req,res)=>{


req.session.destroy(()=>{


res.json({

success:true

});


});


};






exports.profile=async(req,res)=>{


if(!req.session.user){

return res.json({

success:false

});

}


const user=await User.findById(
req.session.user.id
);



if(!user){

return res.json({

success:false

});

}



res.json({

id:user._id,

username:user.username,

email:user.email,

avatar:user.avatar,

bio:user.bio,

followers:user.followers,

following:user.following

});


};

