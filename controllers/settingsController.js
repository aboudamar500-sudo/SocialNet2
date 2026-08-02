const db=require("../services/db");


exports.get=(req,res)=>{

if(!req.session.user){

return res.status(401).json({
success:false
});

}


let users=db.read("users");


let user=users.find(
u=>u.id===req.session.user.id
);


res.json({

username:user.username,

email:user.email,

bio:user.bio,

avatar:user.avatar

});

};



exports.update=(req,res)=>{

if(!req.session.user){

return res.status(401).json({
success:false
});

}


let users=db.read("users");


let user=users.find(
u=>u.id===req.session.user.id
);



if(req.body.username){

user.username=req.body.username;

req.session.user.username=
req.body.username;

}


if(req.body.bio!==undefined){

user.bio=req.body.bio;

}


db.write("users",users);


res.json({

success:true

});

};
