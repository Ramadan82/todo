const jwt = require("jsonwebtoken");
const TodoUsers = require("../models/todoUsers");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRETE, { expiresIn: "3d" });
};

// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await TodoUsers.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up controller
const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await TodoUsers.signUp(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
