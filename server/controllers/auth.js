import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//REGISTER USER

export const register = async(req, res) =>{
  try{
    const{
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friendsList,
      location,
      status
    } = req.body;
  
    const salt = await bcrypt.genSalt(); 
    //A salt is a random string that makes the hash unpredictable. Bcrypt is a popular and trusted method for salt and hashing passwords
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friendsList,
      location,
      status,
      viewedProfile: Math.floor(Math.random() * 10000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //201: smt has been created
  }catch(error){
    res.status(500).json({Error: error.message}); //500: error code
  }
}

//LOGIN FUNCTION
export const login = async(req,res) => {
  try{
    const {email, password} = req.body;
    
    const user = await User.findOne({ email: email});
    if(!user) return res.status(400).json({Error: "User doesn't exist!"});

    const passMatch = await bcrypt.compare(password, user.password); //the server is gonna use the salt to compare the 2 hashes
    if(!passMatch) return res.status(400).json({Error: "Invalid Password!"})
    
    //to create a token, jwt.sign() method takes a payload and the secret key defined in .env as parameters. 
    //It creates a unique string of characters representing the payload (here its the id of the user)
  
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    //delete user.password; //delete the password -> we dont want to send it back to the frontend
    res
    .cookie("access_token", token, {httpOnly: true})
    .status(200)
    .json({user});

  }catch(error){
    res.status(500).json({Error: error.message});
  }
}

//LOGOUT FUNCTION
export const logout = async(req,res) => {
  try{
    res
    .clearCookie("access_token")
    .redirect("/")

  }catch(error){
    res.status(500).json({Error: error.message});
  }
}