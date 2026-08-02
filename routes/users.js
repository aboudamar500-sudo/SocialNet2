const router=require("express").Router();

const user=require("../controllers/userController");


router.get("/",user.list);

router.get("/search/query",user.search);

router.get("/:id",user.get);

router.post("/:id/follow",user.follow);


module.exports=router;
