var express = require("express");
var router = express.Router();
const message_controller = require("../controllers/messageController");

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

// const Message = require("./models/message");
// const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

/* GET home page. */
router.get("/", message_controller.messages);

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Mini Message Board", messages: messages });
// });

// router.get("/new", function (req, res, next) {
//   res.render("form", {});
// });

// router.post("/new", function (req, res, next) {
//   let text = req.body.text;
//   messages.push({ text: text, user: req.body.user, added: new Date() });
//   res.redirect("/");
// });

router.post("/", message_controller.sendMessage);

module.exports = router;
