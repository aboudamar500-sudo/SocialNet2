const router=require("express").Router();

const post=require("../controllers/postController");

const auth=require("../middleware/auth");



router.get(
"/",
post.list
);



router.post(
"/",
auth,
post.create
);



router.post(
"/:id/like",
auth,
post.like
);



router.post(
"/:id/comment",
auth,
post.comment
);



router.post(
"/:id/comment/:commentId/reply",
auth,
post.reply
);



router.post(
"/:id/comment/:commentId/pin",
auth,
post.pinComment
);



module.exports=router;
