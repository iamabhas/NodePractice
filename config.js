import dotenv from "dotenv";
dotenv.config();

const config = {
  accessTokenSecret: process.env.SECRET,
  serverPort: process.env.SERVER_PORT,
  mongodbPort: process.env.MONGODB_PORT,
};

export default config;
