var chat = require ("../chat/chatModel")

// addChat = async(req, res, next)=> {
//     await new chat({
//         dateSent: req.body.dateSent,
//         message: req.body.message
//     }).save().then((err, data)=> {
//         if (err) {
//             res.status(500).json(err);
//           } else {
//             console.log(data);
//             res.status(200).json(data);
//           }
//     })
// };
const addChat = async (req, res, next) => {
    const { dateSent, message } = req.body;
    let Chat;
    
    try {
        Chat = new chat({
            dateSent: dateSent,   
            message: message,
      });
      await Chat.save();
    } catch (err) {
      console.log(err);
    }
  
    if (!Chat) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    //return res.status(201).json({ Chat });
    return res.redirect('/chatCrud/listChat');
  };


 const listChat = async (req, res, next) => {
    try {
      await chat.find().then((data) => {
        console.log(data);
        res.render('listChat.twig', { list: data });
        //res.status(200).json(data);
      });
    } catch {
      (err) => res.status(500).json(err);
    }
  };
const modifChat = async (req, res, next) => {
    try {
      await chat.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json(itemToUpdate);
    } catch (error) {
      res.json(error);
    }
  };

const deleteChat = async (req, res, next) => {
    try {
      await chat.findByIdAndDelete(req.params.id);
      res.status(200).json("chat deleted !");
    } catch (error) {
      res.json(error);
    }
  };
module.exports = {addChat, listChat, modifChat, deleteChat}