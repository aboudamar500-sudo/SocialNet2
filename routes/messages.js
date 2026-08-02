const router=require("express").Router();

const message=require("../controllers/messageController");

const auth=require("../middleware/auth");


router.get("/",
auth,
message.list
);


router.post("/",
auth,
message.send
);


module.exports=router;
