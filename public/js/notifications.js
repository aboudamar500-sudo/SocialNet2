async function loadNotifications(){

const r=await fetch(
"/api/notifications"
);


const data=await r.json();


notifications.innerHTML="";


data.reverse().forEach(n=>{


notifications.innerHTML+=`

<div class="post">

<p>${n.text}</p>

<small>
${new Date(n.createdAt).toLocaleString()}
</small>

</div>

`;


});


}


loadNotifications();


setInterval(
loadNotifications,
5000
);
