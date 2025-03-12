const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../model/user");

async function registerUser(req, res) {
  const { userName, email, password } = req.body;

  try {
    const userExists = await Users.findOne({ $or: [{ userName }, { email }] }); //check if user already exists

    if (userExists) {
      return res
        .status(400)
        .json({ message: "useralready exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 12); //hash the password

    const newUser = new Users({ userName, email, password: hashPassword }); //create a new user

    await newUser.save(); //save user in database

    res.status(201).json({
      message: "user created successfully",
      success: true,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
      success: true,
    }); //return success response with token and user details
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", success: false });
  }
}

async function login(req, res) {
  const { userName, password } = req.body;
  try {
    const checkUser = await Users.findOne({ userName });
  
    if (!checkUser)
      return res.json({
        success: false,
        message: "user doesnt exist so please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "password doesnt match please try again",
      });

    const token = jwt.sign(
      {id: checkUser._id, role: checkUser.role, email: checkUser.email, userName:checkUser.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h"}
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        userName:checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
}

async function logout(req, res) {
  res.clearCookie("token").json({ success: true, message: "logged out successfully" });
}

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthozized user",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized ascess",
    });
  }
};

module.exports = { login, registerUser, logout, authMiddleware };
