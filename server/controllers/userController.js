import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import { ThrowError } from "../utilits/error.js";
export const registrationUser = async(req,res) => {
    try {
        const { name, phone, last_name, email, password } = req.body;
    if (name == "" || phone == "" || last_name == "" || email == "" || password == "") res.json({
        message: "Поля пусті",
        statusCode: 400
    });
        const user = await userService.addUser(name, phone, last_name, email, password);
    if(!user.success)res.json({
        message: "невдалось додати користувача",
        statusCode: 500
    });
    res.json({
        message: "Користувача успішно додано",
        statusCode: 200,
    })
    } catch (error) {
        console.log(error);
    }
}
export const LoginUser = async(req,res) => {
    try {
        const { email, password } = req.body;
        if (email == "" || password == "") ThrowError("Поля пусті", 400);
        const data = await userService.login(email, password);
    if(!data.success)ThrowError(data.message,400)
    res.json({
        message: "Авторизовано успішно",
        ...data
    })
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message})
    }
}
export const verifyToken = async (req, res) => {
    const SECRET_KEY = process.env.SECRET_KEY;
       try {
           const AuthToken = req.headers.authorization;
           const token = AuthToken.split(" ");
           console.log(token
           )
           if (token == undefined) ThrowError();
           const verify = jwt.verify(token[1], SECRET_KEY);
           if (!verify) return res.status(400).json({ message: "Токен не валідний"})
           const decoded = await jwt.decode(token[1]);
           req.user = decoded.user;
           console.log(decoded)
           res.status(200).json({
               message: "It`s work",
               user: decoded.user
              })
       } catch (error) {
        console.log(error)
       }
}
export const deleteUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        console.log(id)
        if (id == null) ThrowError("ІД незнайдено", 400);
        const isDelete = await userService.deleteUserById(id);
        console.log(isDelete)
        if (!isDelete) return res.status(400).json({ message: "Невдалось видалити" })
        res.status(200).json({message:"Видалено успішно"})
    } catch (error) {
        console.log(error)
    }
}
export const UpdateUser = async (req,res) => {
    try {
        const { name, last_name, email, phone } = req.body
        const id = req.user.user_id;
        if (!id) ThrowError("Немає ід");
        const isUpdate = await userService.updateUser(name, last_name, email, phone, id);
        if (!isUpdate.succes) return res.status(400).json({ message: "Невдалось оновити данні" });
        req.user = isUpdate.user;
        res.status(200).json({
            user: isUpdate.user,
            token: isUpdate.token,
            message:"успішно оновлено"
        })
    } catch (error) {
         console.log(error)
    }
}
export const ChangePassword = async (req,res) => {
    try {
        const { oldPassword, NewPassword } = req.body;
        const id = req.user.user_id;
        if (!oldPassword || !NewPassword || !id) return res.status(400).json({ message: "Пусті поля" });
        const isChangePass = await userService.changePassword(oldPassword, NewPassword, id);
        if (!isChangePass.succes) return res.status(400).json({ message: isChangePass?.message });
        res.status(200).json({ message: "Пароль усіпшно змінено" });
    } catch (error) {
        console.log(error);
    }
}
export const uploadAvatarController =async (req, res) => {
  try {

    const result = await userService.uploadAvatarService(req.file, req.user);
      if(!result)ThrowError("Невдалось оновити автарку")
    res.status(200).json(result);
    console.log("Успішно оновлено")
  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};