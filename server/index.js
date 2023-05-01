import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";


//CONFIGURATIONS
const app = express();
dotenv.config(); //for reading .env files
const __filename = fileURLToPath(import.meta.url); //returns the path to the file
const __dirname = path.dirname(__filename); //returns the directory where the file is in
app.use(express.json());
//app.use(cookieParser()); 
app.use(morgan("common"));//for logging errors

app.use(bodyParser.json({ extended: true })); //parsing json parameters
app.use(bodyParser.urlencoded({ extended: true })); //parsing parameters in the URL
app.use("/pictures", express.static(path.join(__dirname, 'public/pictures'))); //when we need to load a picture
app.use("/videos", express.static(path.join(__dirname, 'public/videos'))); //when we need to load a video

//SECURITY
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({origin: 'http://localhost:3000' }));
//allow ressource sharing with the frontend domain

//ROUTES
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log(`MongoDB Server connected`);
}).then(()=> {
  app.listen(PORT, () => console.log(`Application Server connected on Port: ${PORT}`));
}).catch((error) => console.log(`${error} Couldn't connect to MongoDB/Application Server`));

