import { users } from "../models/index.js";
import { ThrowError } from "../utilits/error.js";
import jwt from "jsonwebtoken"
const SECRET_KEY = process.env.SECRET_KEY;
export const AuthMiddleWare = async (req, res, next) => {
   try {
       const AuthToken = req.headers.authorization;
       const token = AuthToken.split(" ");
       console.log(token
       )
       if (token == undefined) ThrowError("токен незнайдено");
       const verify = jwt.verify(token[1], SECRET_KEY);
      if (!verify) ThrowError("токен не валідний");
       const decoded = await jwt.decode(token[1]);
       req.user = decoded.user;
       console.log(decoded)
    //    res.json({
    //        message: "It`s work",
    //        user: decoded.user,
    //        statusCode: 200
       //    })
       next();
   } catch (error) {
    console.log(error)
   }
} 