var express= require("express")
var router=express.Router()
var {addChat, listChat, modifChat, deleteChat, getChatDatabyid, searchByChat} = require("../controllers/chatController")
router.get("/create", (req, res, next) => {
    res.render('formChat.twig');
});
router.post("/addChat", addChat);
router.get("/search", searchByChat);
router.get("/listChat", listChat);
router.get("/getChat/:id", getChatDatabyid);
router.post("/modifChat/:id", modifChat);
router.delete("/deleteChat/:id", deleteChat);

module.exports=router;