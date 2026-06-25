import { ThrowError } from "../utilits/error.js";
import * as cargoService from "../services/cargoService.js";
export const CargoCreate = async (req,res) => {
   try {
     const { from_city, to_city, address_from, address_to, date_from, date_to, type, height, weight, width, length, amount ,description} = req.body;
    if (from_city == "" || to_city == "", address_from == "" || address_to == "" || date_from == "" || date_to == "" || type == "" || height == "" || weight == "" || width == "" || length == "" || amount == "") ThrowError("Пусті поля",500);
       const sender_id = req.user.user_id;
       console.log("iд користувача",sender_id)
    if (sender_id == null) ThrowError("ід не знайдено", 400);
    const cargo = await cargoService.createCargo(type, weight, description, amount, height, length, width);
    if (!cargo.success) return res.status(400).json({
        message:"невдалось додати інформацію про вантаж"
    })
       const cargo_id = cargo.cargo_id;
       console.log("iд вантажу",cargo_id)
    const route = await cargoService.createRoute(from_city, to_city, address_from, address_to);
    if(!route.success) return  res.status(400).json({
        message:"невдалось додати інформацію про маршрут"
    })
       const route_id = route?.route_id;
         console.log("iд маршруту",cargo_id)
    const announcement = await cargoService.createAnnouncement(date_from, date_to, cargo_id, route_id, sender_id);
    if(!announcement.success) return  res.status(400).json({
        message: "невдалось створити оголошення"
    })
    res.status(200).json({
        message:"Успішно додано"
    })
   } catch (error) {
    console.log(error)
   }

}
export const Cargos = async (req, res) => {
    try {
        const cargos = await cargoService.getCargos();
        if (!cargos.success) ThrowError("Немає данних з бд");
        res.status(200).json({
            cargos: cargos.cargos
        })
    } catch (error) {
            console.log(error)
    }
}
export const FiltredCargos = async (req, res) => {
    try {
        const { from_city, to_city, amount_from, amount_to, weight } = req.body;
        console.log(amount_from);
        const filtredCargos = await cargoService.getFilterCargos(amount_from, amount_to, weight, from_city, to_city);
        if (!filtredCargos.success) return res.status(400).json({
            message:"невдалось отримати фільтрованні данні"
        })
        res.status(200).json({
            filtredCargos: filtredCargos.cargos,
            message:"Дані успішно отримано"
        })
    } catch (error) {
        console.log(error)
    }
}
export const CargosByUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        console.log("СargosByUser",id);
        const cargosByUser = await cargoService.getCargosByUser(id);
        if (!cargosByUser.success) return res.status(400).json({ message: "Невдалось отримати данні" });
        res.status(200).json({
            cargosByUser: cargosByUser.cargos
        })
    } catch (error) {
        console.log(error)
        
    }
}
export const InfoCargoByOne = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id) ThrowError("Ід незнайдено");
        const isGet = await cargoService.getCargoInfoByOne(id);
        if (!isGet.succes) ThrowError("Невдалось отримати данні");
        res.status(200).json({cargoInfo:isGet.cargoInfo})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message:error.message})
    }
}