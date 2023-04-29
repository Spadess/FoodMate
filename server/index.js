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
import cookieParser from "cookie-parser";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use("/pictures", express.static(path.join(__dirname, 'public/pictures'))); //when we need to load a picture
app.use("/videos", express.static(path.join(__dirname, 'public/videos'))); //when we need to load a video


//ROUTES
app.use("/auth", authRoutes); 
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

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

