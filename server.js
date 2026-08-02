require("dotenv").config();

const express=require("express");
const session=require("express-session");
const cors=require("cors");
const path=require("path");
const http=require("http");

const {Server}=require("socket.io");

const db=require("./services/db");


const app=express();

const server=http.createServer(app);


const io=new Server(server,{
cors:{
origin:"*"
}
});


db.connect();


app.use(cors());


app.use(express.json({
limit:"50mb"
}));


app.use(express.urlencoded({
extended:true
}));


app.use(session({

secret:process.env.SESSION_SECRET || "change-this-secret",

resave:false,

saveUninitialized:false,

cookie:{
maxAge:1000*60*60*24*7,
httpOnly:true,
sameSite:"lax"
}

}));


app.use(express.static(
path.join(__dirname,"public")
));


app.use("/uploads",
express.static(
path.join(__dirname,"uploads")
));



// Routes

app.use("/api/auth",
require("./routes/auth")
);


app.use("/api/posts",
require("./routes/posts")
);


app.use("/api/upload",
require("./routes/upload")
);


app.use("/api/messages",
require("./routes/messages")
);


app.use("/api/notifications",
require("./routes/notifications")
);


app.use("/api/users",
require("./routes/users")
);


app.use("/api/settings",
require("./routes/settings")
);


app.use("/api/admin",
require("./routes/admin")
);



// Socket

io.on("connection",(socket)=>{


socket.on("join",(id)=>{

socket.join(id);

});


socket.on("sendMessage",(data)=>{

io.to(data.receiver)
.emit("newMessage",data);

});


});



// API test

app.get("/api",(req,res)=>{

res.json({

app:"SocialNet",

version:"1.0 MongoDB",

status:"running"

});

});



// بدل *

app.use((req,res)=>{

res.sendFile(
path.join(
__dirname,
"public",
"index.html"
)
);

});



const PORT=process.env.PORT || 3000;


server.listen(PORT,()=>{

console.log(
"🚀 SocialNet server running on port "+PORT
);

});
