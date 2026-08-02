async function register(){


const r=await fetch(
"/api/auth/register",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username.value,

email:newEmail.value,

password:newPassword.value

})

});


const data=await r.json();


alert(
data.success?
"تم إنشاء الحساب":
data.message
);


}



async function login(){


const r=await fetch(
"/api/auth/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:email.value,

password:password.value

})

});


const data=await r.json();


if(data.success){

location="/pages/feed.html";

}else{

alert("بيانات الدخول غير صحيحة");

}


}
