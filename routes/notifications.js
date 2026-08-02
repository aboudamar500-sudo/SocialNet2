const router=require("express").Router();

const notification=
require("../controllers/notificationController");


router.get(
"/",
notification.list
);


router.post(
"/",
notification.create
);


module.exports=router;
