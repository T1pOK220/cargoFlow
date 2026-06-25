import { ThrowError } from "../utilits/error.js";
import { announcements, cargos,routes } from "../models/index.js";
export const createCargo = async (type,weight,description,amount,height,length,width) => {
    try {
        if (type == "" || height == "" || weight == "" || width == "" || length == "" || amount == "") ThrowError("Поле пусте", 500);
        const isSuccess = await cargos.AddCargo(type, weight, description, amount, height, length, width);
        if (!isSuccess.isCreate) ThrowError("Невдалось додати данні про вантаж");
        return {
            success: true,
            cargo_id: isSuccess.cargo_id
        }
    } catch (error) {
           console.error(
            error.statusCode,
            error.message,
            "/cargos-create"
        )
        return {
            success: false
        }
    }
}
export const createRoute = async (from_city,to_city,address_from,address_to) => {
     try {
         if (from_city == "" || to_city == "" || address_from == "" || address_to == "" ) ThrowError("Поле пусте", 500);
        const isSuccess = await routes.AddRoute(from_city,to_city,address_from,address_to);
         if (!isSuccess.isCreate) ThrowError("Невдалось додати маршрут");
         return ({
             success: true,
             route_id: isSuccess?.route_id
             
         })
    } catch (error) {
           console.error(
            error.statusCode,
            error.message,
            "/cargos-create"
        )
        return {
            success: false
        }
    }
}
export const createAnnouncement = async (date_from,date_to,cargo_id,routes_id,sender_id) => {
    try {
        if (date_from == "" || date_to == "" || cargo_id == "" || routes_id == "" || sender_id == "") ThrowError("Поле пусте", 500);
        const isSuccess = await announcements.AddAnnouncement(date_from, date_to, cargo_id, routes_id, sender_id);
         if (!isSuccess.isCreate) ThrowError("Невдалось створити оголошення");
         return ({
             success: true,
         })
    } catch (error) {
          console.error(
            error.statusCode,
            error.message,
            "/cargos-create"
        )
        return {
            success: false
        }
    }
}
export const getCargos = async () => {
    try {
        const isGet = await announcements.getForCargoCard();
        if (!isGet.succes) ThrowError("Невдалось отримати данні з бази данних", 500);
        return {
            success: true,
            cargos: isGet.arr
        }
    } catch (error) {
          console.error(
            error.statusCode,
            error.message,
            "/cargos"
        )
        return {
            success: false
        }
    }
}
export const getFilterCargos = async (amount_from, amount_to, weight, from_city, to_city)=>{
    try {
        if (amount_from == "" || amount_to == "" || weight == "" || from_city == "" || to_city == "") ThrowError("Пусті поля ");
        const IsGet = await announcements.getFiltredCargos(amount_from, amount_to, weight, from_city, to_city);
        if (!IsGet.succes) ThrowError("Невдалось отримати відфільтровані дані");
        console.log(IsGet.arr);
        return {
            success: true,
            cargos: IsGet.arr
        }
    } catch (error) {
         console.error(
            error.statusCode,
            error.message,
            "/cargos/filter"
        )
        return {
            success: false
        }
    }
}
export const getCargosByUser = async (id) => {
    try {
        if (id == null) ThrowError("Помилка при отриманні ід", 404);
        const isSucess = await announcements.getCargosByUser(id);
        if (!isSucess.succes) ThrowError("Невдалось отримати данні з бд");
        return{success: true,
            cargos: isSucess.arr}
    } catch (error) {
        console.error(
            error.statusCode,
            error.message,
            "/cargos/byUser"
        )
        return {
            success: false
        }
    }
}
export const getCargoInfoByOne = async (id) => {
    try {
        const isGet = await announcements.getCargoInfo(id);
        if (!isGet.succes) ThrowError("Невдалось отримати данні");
        return {
            cargoInfo: isGet.arr,
            succes:true
        }
    } catch (error) {
        console.log(error);
        return{succes:false}
    }
} 