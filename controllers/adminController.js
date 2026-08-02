const db=require("../services/db");


exports.users=(req,res)=>{

let users=db.read("users");


res.json(

users.map(u=>({

id:u.id,

username:u.username,

email:u.email,

blocked:u.blocked||false,

admin:u.admin||false

}))

);

};



exports.block=(req,res)=>{


let users=db.read("users");


let user=users.find(
u=>u.id===req.params.id
);


if(!user){

return res.json({
success:false
});

}


user.blocked=true;


db.write("users",users);


res.json({
success:true
});

};



exports.unblock=(req,res)=>{


let users=db.read("users");


let user=users.find(
u=>u.id===req.params.id
);


if(user){

user.blocked=false;

}


db.write("users",users);


res.json({
success:true
});

};
