const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.messages = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().exec();
  res.render("index", {
    title: "Messages",
    messages: allMessages,
  });
});

// Handle Genre create on POST.
exports.sendMessage = [
  // Validate and sanitize the name field.
  body("user", "Genre name must contain at least 3 characters")
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(errors);

    // Create a genre object with escaped and trimmed data.
    const message = new Message({
      user: req.body.user,
      text: req.body.text,
      color: req.body.color,
      date: new Date(),
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      // res.render("index", {
      //   title: "Messages",
      //   errors: errors.array(),
      // });
      // return;
      res.redirect("/");
      return;
    } else {
      // Data from form is valid.
      await message.save();
      // New genre saved. Redirect to genre detail page.
      res.redirect("/");
    }
  }),
];
