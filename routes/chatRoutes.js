var express= require("express")
var router=express.Router()
var {addChat, listChat, modifChat, deleteChat} = require("../controllers/chatController")
router.get("/create", (req, res, next) => {
    res.render('formChat.twig');
});
router.post("/addChat", addChat);
router.get("/listChat", listChat);
router.put("/modifChat/:id", modifChat);
router.delete("/deleteChat/:id", deleteChat);
module.exports=router;