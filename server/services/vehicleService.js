import { ThrowError } from "../utilits/error.js";
import { vehicles,routes } from "../models/index.js";
import { createRoute } from "../services/cargoService.js";
export const addCar = async (brand, model, typeOfVehicle, year, capacity, volume, status, plate_number, description,id,delivery_price,from_city,to_city,file) => {
    try {
        const avatarPath =
            `/uploads/avatars/${file.filename}`;
        const route = await routes.AddRouteToVehicle(from_city, to_city);
        if (!route.isCreate) ThrowError("Невдалось додати маршрут");
        const routeId = route.route_id;
        const isAdd = await vehicles.AddVehicles(brand, model, typeOfVehicle, year, capacity, volume, status, plate_number, description,id,delivery_price,avatarPath,routeId);
        if (!isAdd) ThrowError("Невдалось додати авто");
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
export const getCarbyUser = async (id) => {
    try {
        const isSelect = await vehicles.getAllByUser(id);
        if (!isSelect.succes) ThrowError("Невдалось отримати транспорт користувача");
        return {
            succes: isSelect.succes,
            rows:isSelect.row
        }
    } catch (error) {
        console.log(error)
        return {
            succes: false
        }
    }
}
export const editVehicle = async (brand, model, plate_number, capacity, type, year, cargo_volume, status, description, v_avatar_url, id) => {
    try {
        const isEdit = await vehicles.updateVehicle(brand, model, plate_number, capacity, type, year, cargo_volume, status, description, v_avatar_url, id);
        if (!isEdit) ThrowError("Невдалось оновити характеристики авто");
         return {succes:true}
    } catch (error) {
        console.log(error)
        return{message:error.message,succes:false}
    }
}
export const deleteVehicle = async (id) => {
    try {
        const isDelete = await vehicles.deleteVehicle(id);
        if (!isDelete) ThrowError("Невдалось Видалити транспорт");
        return {succes:true}
    } catch (error) {
        console.log(error)
        return{message:error.message,succes:false}
    }
}
export const getAllVehiclesI = async () => {
    try {
        const isGet = await vehicles.getAllVehicles();
        if (!isGet.succes) ThrowError("Невдалось отримати дані про авто");
        console.log("Service VEHICLE :",isGet)
        return {
            cars: isGet.row,
            succes: isGet.succes
        }
    } catch (error) {
        console.log(error)
        return { succes: false, cars: null}
    }
}
export const getFiltredVehicles = async (car_volume_max, car_volume_min, capacity_min, capacity_max, type) => {
    try {
        const isGet = await vehicles.getFiltred(car_volume_max, car_volume_min, capacity_min, capacity_max, type);
        if (!isGet.succes) ThrowError("Невдалось отримати відфільтровані авто");
        return {
            succes: true,
            cars:isGet.cars
        }
    } catch (error) {
        console.log(error)
        return {
            succes: false,
            cars:null
        }
    }
}
export const getOneCarInfo= async(car_id)=>{
    try {
        const isGet = await vehicles.getOneCarInfo(car_id);
        if (!isGet.succes) ThrowError("Невдалось отримати данні про авто");
        return {
            succes: true,
            carInfo: isGet.carInfo
        }
    } catch (error) {
         console.log(error)
        return {
            succes: false,
            carInfo:null
        }
    }
}