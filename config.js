import dotenv from "dotenv";
dotenv.config();
const config = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
  serverPort: process.env.SERVER_PORT,
  mongodbPort: process.env.MONGODB_URL,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
};

export default config;
