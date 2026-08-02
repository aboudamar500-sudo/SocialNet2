const router=require("express").Router();

const auth=require("../controllers/authController");


router.post(
"/register",
auth.register
);


router.post(
"/login",
auth.login
);


router.post(
"/logout",
auth.logout
);


router.get(
"/profile",
auth.profile
);


module.exports=router;
