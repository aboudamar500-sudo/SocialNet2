const router=require("express").Router();

const settings=
require("../controllers/settingsController");


router.get("/",settings.get);

router.put("/",settings.update);


module.exports=router;
