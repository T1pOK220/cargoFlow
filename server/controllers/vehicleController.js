import { ThrowError } from "../utilits/error.js";
import * as vehiclesService from "../services/vehicleService.js";
export const AddVehicle = async (req, res) => {
    try {
        console.log(req.body);
       console.log(req.file)
        const { brand, model, typeOfVehicle, year, capacity, volume, plate_number, status, description,delivery_price,from_city,to_city } = req.body;
        const id = req.user.user_id;
        if(!id)ThrowError("Id незнайдено",500)
        if (!brand || !model || !typeOfVehicle || !year || !capacity || !volume || !plate_number || !status || !description||!delivery_price||!from_city||!to_city)ThrowError("Поля пусті")
        const isAdd = await vehiclesService.addCar(brand, model, typeOfVehicle, year, capacity, volume, status, plate_number, description,id,delivery_price,from_city,to_city,req.file);
        if (!isAdd) ThrowError("Невдалось додати транспорт");
        res.status(200).json({ message:"Успішно додано"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}
export const CarsByUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        if(!id)ThrowError("Id незнайдено",500)
        const isSelect = await vehiclesService.getCarbyUser(id);
        if (!isSelect.succes) ThrowError("Невдалось отримати користувача");
        res.status(200).json({
            message: "Успішно отримано",
            cars: isSelect.rows
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}
export const UpdateCar = async (req, res) => {
    try {
       const {brand, model, plate_number, capacity, type, year, cargo_volume, status, description, v_avatar_url, id } = req.body;
        if(!id)ThrowError("Id незнайдено",500)
       const idEdit = await vehiclesService.editVehicle(brand, model, plate_number, capacity, type, year, cargo_volume, status, description, v_avatar_url, id);
       if (!idEdit.succes) ThrowError("Невдалось оновити характеристики транспорту");
       res.status(200).json({message:"Успішно змінено"})
   } catch (error) {
       console.log(error);
       return res.status(400).json({ message:error.message})
   }
}
export const DeleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) ThrowError("Незнайдено ід");
        const isDelete = await vehiclesService.deleteVehicle(id);
        if (!isDelete.succes) ThrowError("невдалось видалити транспорт");
         res.status(200).json({message:"Видалено успішно"})
    } catch (error) {
         console.log(error);
       return res.status(400).json({ message:error.message})
    }
}
export const GetAllCars = async (req, res) => {
    try {
        const isGet = await vehiclesService.getAllVehiclesI();
        if (!isGet.succes) ThrowError("Невдалось отримати данні про авто");
        res.status(200).json({
            message: "Отримано успішно",
            cars: isGet.cars
        })
    } catch (error) {
          console.log(error);
       return res.status(400).json({ message:error.message})
    }
}
export const getFiltredCars = async (req,res) => {
    try {
        const { car_volume_max, car_volume_min, capacity_min, capacity_max, type } = req.body;
        console.log( car_volume_max, car_volume_min, capacity_min, capacity_max, type)
        const isGet = await vehiclesService.getFiltredVehicles(car_volume_max, car_volume_min, capacity_min, capacity_max, type);
        if (!isGet.succes) ThrowError("Невдалось отримати відфільтровані данні");
        res.status(200).json({ message: "Отримано успішно", cars:isGet.cars });
    } catch (error) {
         console.log(error);
       return res.status(400).json({ message:error.message})
    }
}
export const getOneCarInfo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) ThrowError("Невдалось отримати айді авто");
        const isGet = await vehiclesService.getOneCarInfo(id);
        res.status(200).json({
            carInfo: isGet.carInfo,message:"Отримано успішно"
        });
    } catch (error) {
           console.log(error);
       return res.status(400).json({ message:error.message})
    }
}