async function loadProfile(){


const r=await fetch(
"/api/auth/profile"
);


const user=await r.json();


if(!user.id){

document.getElementById("profile").innerHTML=

"لم يتم تسجيل الدخول";


return;

}



document.getElementById("profile").innerHTML=

`

<h2>${user.username}</h2>

<p>${user.email}</p>

<p>${user.bio||"لا يوجد وصف"}</p>

<p>

المتابعون: ${user.followers?.length||0}

</p>

`;

}



async function logout(){


await fetch(
"/api/auth/logout",
{
method:"POST"
}
);


location="/";

}



loadProfile();
