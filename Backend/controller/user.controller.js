import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import cloudinary from "cloudinary";
// dotenv 
import dotenv from "dotenv";
import getDataUri from "../middleware/getdatauri.js";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    console.log("Signup request received:", { fullname, email, password, confirmPassword });
    console.log("File received: ", req.file); // Log the file object

    // Check if passwords match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already registered with email:", email);
      return res.status(400).json({ error: "User already registered with this email." }); // Updated response
    }

    // Hash the password
    console.log("Hashing password...");
    const hashPassword = await bcrypt.hash(password, 10);

    // Initialize imageData
    let imageData = { public_id: "", url: "" };

    // Handle file uploads
    if (req.file) {
      console.log("File is ready for processing...");
      const fileUri = getDataUri(req.file); // Convert file to data URI
      const cdb = await cloudinary.uploader.upload(fileUri); // Upload to Cloudinary

      // Set image data
      imageData = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      console.log("Image uploaded successfully:", imageData);
    } else {
      console.log("No image provided in the request.");
      return res.status(400).json({ error: "No image provided." });
    }

    // Create and save the new user
    console.log("Creating new user...");
    const newUser = await User.create({
      fullname,
      email,
      password: hashPassword,
      image: imageData,
    });

    console.log("User created successfully:", newUser);

    // Set JWT token in cookies and return the user response
    createTokenAndSaveCookie(newUser._id, res);
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};







export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid user credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If password doesn't match
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid user credentials" });
    }

    // Set JWT token in cookies and return the user response
    createTokenAndSaveCookie(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in login: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
