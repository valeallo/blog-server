const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const Bcrypt = require("bcrypt");

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
    });
  }
});

router.post("/users", async (req, res) => {
  const salt = await Bcrypt.genSalt(10);
  const encryptedPassword = await Bcrypt.hash(req.body.password, salt);
  const newUser = new Users({
    userName: req.body.userName,
    email: req.body.email,
    password: encryptedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).send({
      message: "user saved successfully",
      payload: saveUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id).deleteOne();
    if (!user) return res.status(404).send(`user with id ${id} not found`);
    res.status(200).send(`user ${id} deleted successfully`);
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;
    const options = { new: true };

    const result = await Users.findByIdAndUpdate(id, updateUser, options);
    if (!result) return res.status(404).send(`user with id ${id} not found`);

    res.status(200).send({
      message: "user info updated successfully",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email })
  try{
  if (!user) {
    return res.status(404).send({
      message: "Email not found",
    });
  }
  const validPassword = await Bcrypt.compare(req.body.password, user.password); //confronta la password che mette l'utente con quella esistente
  if (!validPassword) {
    return res.status(404).send({
      message: "Wrong Password",
    });
  }
  res.status(200).send({
    message: "Hello, you are logged in",
    payload: {
      email: user.email,
      userName: user.userName
    },
  });}
  catch (error){
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

module.exports = router;
