import { ThrowError } from "../utilits/error.js";
import { users } from "../models/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
export const addUser = async (name,phone,last_name,email,password) => {
    try {
        if (name == "" || phone == "" || last_name == "" || email == "" || password == "") ThrowError("Поля пусті", 400);
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        const isSuccses = await users.AddUser(name, phone, last_name, email, hash)
        if (!isSuccses) ThrowError("Невдалось додати користувача", 500);
         return {
            success: true,
            user: {
                name,
                phone,
                last_name,
                email,
                password,
              },message: "Користувача успішно додано"}
            
    } catch (error) {
         console.error(
            error.statusCode,
            error.message,
            "/registration"
        )
        return {
            success: false
        }
    }
}
export const login = async(email, password) =>{
    try {
        if (!email||!password) ThrowError("Поля пусті", 500);
        const user = await users.FindUserByEmail(email);
        if (user == null) ThrowError("Користувача з таким email не знайдено");
        console.log(user);
        const verify =  await bcryptjs.compare(password, user.password);
        if (!verify) ThrowError("Невірний пароль");
        const token = jwt.sign({ user }, SECRET_KEY,{ expiresIn: "1h" });
        return {
            success: true,
            token,
            user,
        }
    } catch (error) {
        console.error(
            error.statusCode,
            error.message,
            "/login"
        )
        return {
            success: false,
            message:error.message
        }
    }
}
export const deleteUserById = async(id) =>{
    try {
        const isDelete = await users.DeleteUserById(id);
        if (!isDelete) ThrowError("Невдалось видалити користувача з бази");
        console.log(isDelete)
        return true
    } catch (error) {
        console.error(
            error.statusCode,
            error.message,
            "/user/delete"
        )
        return false
    }
}
export const updateUser = async (name, last_name, email, phone, id) => {
    try {
        const isUpdate = await users.updateUser(name, last_name, email, phone, id);
        if (!isUpdate.succes) ThrowError("Невдалось оновити користувача");
        const userInBD = await users.getUserById(id);
        if (!userInBD.succes) ThrowError("Невдалось отримати данні про користувача");
        const user = userInBD?.user;
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
        return { user:user,token:token,succes:true}
    } catch (error) {
        console.log(error)
        return {succes:false}
    }
}
export const changePassword = async (oldPassword,NewPassword,id) => {
    try {
        if (!oldPassword || !NewPassword) ThrowError("Пусті поля", 500);
        const user = await users.getUserById(id);
        if (!user.succes) ThrowError("Користувача за таким ід не знайдено");
        const hashedPass = user.user.password;
        console.log("oldPassword:",oldPassword);
console.log("hash:", user.user.password);
console.log(await bcryptjs.compare(oldPassword, user.user.password));
        const valid = await bcryptjs.compare(oldPassword,hashedPass);
        if (!valid) ThrowError("Невірний пароль");
        const salt = await bcryptjs.genSalt(10);
        const password = await bcryptjs.hash(NewPassword, salt);
        const isChange = await users.changePassword(password, id);
        if (!isChange) ThrowError("Невдалось змінити пароль");
        return { succes:true}
    } catch (error) {
        console.log(error)
        return {
            succes: false,
            message: error.message
        }
    }
}
export const uploadAvatarService = async (file,useR) => {

  if (!file) {
   ThrowError("Файл не знайдено");
    }
    const id = useR.user_id;
    if (!id) ThrowError("Незнайдено ід");
  const avatarPath =
        `/uploads/avatars/${file.filename}`;
    const isUpdateAvartar = await users.updateAvatar(avatarPath, id);
    if (!isUpdateAvartar) ThrowError("Невдалось оновити аватар");
    const userInBD = await users.getUserById(id);
        if (!userInBD.succes) ThrowError("Невдалось отримати данні про користувача");
        const user = userInBD?.user;
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
    return {
    succes: true,
    message: "Аватар оновлено",
        avatar: avatarPath,
        token: token,
        user: useR
  };
};