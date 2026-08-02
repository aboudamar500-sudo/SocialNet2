const socket=io();


socket.on("newMessage",(msg)=>{

chatBox.innerHTML+=`

<div class="post">
<p>${msg.text}</p>
</div>

`;

});


function join(){

let id=prompt("اكتب ID حسابك");

socket.emit(
"join",
id
);

}


async function sendMessage(){

const data={

receiver:receiver.value,

text:message.value

};


await fetch("/api/messages",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});


socket.emit(
"sendMessage",
data
);


message.value="";

}


join();
