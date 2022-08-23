import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";


const secret = process.env.TOKEN_SECRET;

export const signin = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ username });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        email: oldUser.username,
        id: oldUser._id,
      },
      secret,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        result: oldUser,
        token,
      });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { userName, userType, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ userName });

    if (oldUser)
      {return res.status(400).json({ message: "User already exists" });}

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      userName,
      userType,
      password: hashedPassword,
    });

    const token = jwt.sign({ 1: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const createUser = async (req, res) => {
  try {
    console.log(req.body)
    const { username, userType, fullName, password } = req.body;
    const existing = await UserModal.findOne({ username });
    if(existing) {
      return res.status(400).json({ message: "User Already Exists." })
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const data = await UserModal.create({
      username, userType, password: hashedPassword, fullName
    });

    console.log(data);
    res.status(200).json({ users: data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const allUser = async (req, res) => {
  try {
    const data = await UserModal.find({userType: 'citizen'});
    res.status(200).json({ users: data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editUser = async (req, res) => {
  try {
    const { userType, username, fullName, password  } = req.body;
    const { id } = req.params;
    console.log(id)
    const updateUser = {
      userType, username, fullName, password
    }

    const editedUser = await UserModal.findByIdAndUpdate(id,updateUser,{ new: true });
    res.status(200).json({ editedUser });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await UserModal.findByIdAndDelete(id)
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
}

