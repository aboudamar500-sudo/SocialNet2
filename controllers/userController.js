const db=require("../services/db");


function cleanUser(u){

return {

id:u.id,

username:u.username,

avatar:u.avatar,

bio:u.bio,

followers:u.followers.length,

following:u.following.length

};

}



exports.list=(req,res)=>{

let users=db.read("users");

res.json(
users.map(cleanUser)
);

};



exports.search=(req,res)=>{

const q=(req.query.q||"").toLowerCase();


let users=db.read("users");


let result=users.filter(u=>

u.username.toLowerCase()
.includes(q)

);


res.json(
result.map(cleanUser)
);

};



exports.get=(req,res)=>{

let users=db.read("users");


let user=users.find(
u=>u.id===req.params.id
);


if(!user){

return res.status(404).json({
success:false
});

}


res.json(
cleanUser(user)
);

};



exports.follow=(req,res)=>{

if(!req.session.user){

return res.status(401).json({
success:false
});

}


let users=db.read("users");


let me=users.find(
u=>u.id===req.session.user.id
);


let target=users.find(
u=>u.id===req.params.id
);


if(!target){

return res.json({
success:false
});

}


if(me.following.includes(target.id)){


me.following=
me.following.filter(
id=>id!==target.id
);


target.followers=
target.followers.filter(
id=>id!==me.id
);


}else{


me.following.push(target.id);

target.followers.push(me.id);


}


db.write("users",users);


res.json({
success:true
});

};
