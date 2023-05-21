const mongoose = require("mongoose");
const Chatroom = require("../models/chatroommodel")

exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) return res.status(400).send( "Chatroom name can contain only alphabets.");

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) return res.status(400).send( "Chatroom with that name already exists!");

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};