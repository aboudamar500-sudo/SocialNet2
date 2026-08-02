const db=require("../services/db");


module.exports=(req,res,next)=>{


if(!req.session.user){

return res.status(401).json({

success:false,

message:"Login required"

});

}


let users=db.read("users");


let user=users.find(
u=>u.id===req.session.user.id
);



if(user && user.blocked){

req.session.destroy();


return res.status(403).json({

success:false,

message:"Account blocked"

});

}


next();

};
