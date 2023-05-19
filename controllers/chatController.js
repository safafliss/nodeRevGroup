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

  const getChatDatabyid = async (req, res, next) => {
    const chatId = req.params.id;
    try {
      const chatData = await chat.findOne({ _id: chatId });
      console.log(chatData);
      res.render('updateChat.twig', { chat: chatData });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // const getChatDatabyid=(req, res)=>{
  //   const chatId = req.params.id;
      
  //   chat.findById(chatId, (err, chatData) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Internal Server Error');
  //     } else {
  //       res.render('updateChat.twig', { chat: chatData });
  //     }
  //   });
  // }

const modifChat = async (req, res, next) => {
    try {
      await chat.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.redirect('/chatCrud/listChat');
      //res.status(200).json(itemToUpdate);
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
 

  const searchByChat = async (req, res) => {
    try {
      const chatMsg = req.query.message;
      const chatData = await chat.find({ message: chatMsg });
      res.render('listChat.twig', { list: chatData });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };
  
module.exports = {addChat, listChat, modifChat, deleteChat, getChatDatabyid, searchByChat}