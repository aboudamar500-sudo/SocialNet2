const Post=require("../models/Post");



exports.list=async(req,res)=>{

const posts=await Post.find()
.sort({
createdAt:-1
});


res.json(posts);

};





exports.create=async(req,res)=>{


if(!req.session.user){

return res.status(401).json({
success:false
});

}


const post=new Post({

user:req.session.user.id,

username:req.session.user.username,

text:req.body.text||"",

image:req.body.image||"",

likes:[],

comments:[]

});


await post.save();


res.json({

success:true,

post

});


};






exports.like=async(req,res)=>{


const post=await Post.findById(
req.params.id
);


if(!post){

return res.json({
success:false
});

}


const id=req.session.user.id;


if(post.likes.includes(id)){

post.likes=post.likes.filter(
x=>x!==id
);

}else{

post.likes.push(id);

}



await post.save();


res.json({

success:true,

count:post.likes.length

});


};







exports.comment=async(req,res)=>{


const post=await Post.findById(
req.params.id
);


post.comments.push({

user:req.session.user.id,

username:req.session.user.username,

text:req.body.text,

replies:[]

});


await post.save();


res.json({

success:true

});


};






exports.reply=async(req,res)=>{


const post=await Post.findById(
req.params.id
);


const comment=
post.comments.id(
req.params.commentId
);



if(!comment){

return res.json({
success:false
});

}



comment.replies.push({

user:req.session.user.id,

username:req.session.user.username,

text:req.body.text

});



await post.save();


res.json({

success:true

});


};






exports.pinComment=async(req,res)=>{


const post=await Post.findById(
req.params.id
);


post.comments.forEach(c=>{

c.pinned=false;

});



const comment=
post.comments.id(
req.params.commentId
);


if(comment){

comment.pinned=true;

}



await post.save();



res.json({

success:true

});


};
