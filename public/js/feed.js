async function load(){


const r=await fetch("/api/posts");

const posts=await r.json();


const box=document.getElementById("posts");

box.innerHTML="";


posts.forEach(p=>{


let comments="";


p.comments.forEach(c=>{


let replies="";


c.replies.forEach(rep=>{

replies+=`

<div style="margin-right:20px">

↪ ${rep.username}: ${rep.text}

</div>

`;

});


comments+=`

<div class="post">

<b>${c.username}</b>

<p>${c.text}</p>


${c.pinned?"📌 مثبت":""}


${replies}



<input id="reply-${c._id}"

placeholder="رد">


<button onclick="reply('${p._id}','${c._id}')">

رد

</button>



<button onclick="pin('${p._id}','${c._id}')">

تثبيت

</button>


</div>

`;

});



box.innerHTML+=`

<div class="post">

<h3>${p.username}</h3>

<p>${p.text}</p>


<button onclick="like('${p._id}')">

❤️ ${p.likes.length}

</button>



<input id="comment-${p._id}"

placeholder="تعليق">


<button onclick="comment('${p._id}')">

تعليق

</button>



${comments}


</div>

`;

});


}




async function post(){


await fetch("/api/posts",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

text:text.value

})

});


text.value="";

load();

}





async function like(id){


await fetch("/api/posts/"+id+"/like",
{
method:"POST"
});


load();

}




async function comment(id){


await fetch("/api/posts/"+id+"/comment",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

text:
document.getElementById(
"comment-"+id
).value

})

});


load();

}





async function reply(id,cid){


await fetch(
`/api/posts/${id}/comment/${cid}/reply`,
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

text:
document.getElementById(
"reply-"+cid
).value

})

});


load();

}





async function pin(id,cid){


await fetch(
`/api/posts/${id}/comment/${cid}/pin`,
{

method:"POST"

});


load();

}




load();
