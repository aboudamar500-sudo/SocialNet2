const router=require("express").Router();

const admin=require("../middleware/admin");

const controller=
require("../controllers/adminController");


router.use(admin);


router.get("/users",
controller.users);


router.post("/block/:id",
controller.block);


router.post("/unblock/:id",
controller.unblock);


module.exports=router;
