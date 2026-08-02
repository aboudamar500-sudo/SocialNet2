async function loadMessages(){


const r=await fetch(
"/api/messages"
);


const data=await r.json();


const box=document.getElementById(
"messages"
);


box.innerHTML="";


data.forEach(m=>{


box.innerHTML+=`

<div class="post">

<p>${m.text}</p>

<small>

${new Date(m.createdAt).toLocaleString()}

</small>

</div>

`;

});


}




async function sendMessage(){


await fetch(
"/api/messages",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

receiver:receiver.value,

text:message.value

})

}

);


message.value="";


loadMessages();


}



loadMessages();
