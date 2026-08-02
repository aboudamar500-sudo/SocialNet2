const mongoose=require("mongoose");


async function connect(){

try{

await mongoose.connect(
process.env.MONGO_URI
);


console.log(
"🗄️ MongoDB connected"
);


}catch(err){

console.log(
"Database error:",
err.message
);

}

}



module.exports={
connect
};
