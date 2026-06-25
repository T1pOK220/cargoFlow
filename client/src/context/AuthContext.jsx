import { createContext, useEffect, useState } from "react";
import * as Api from "../api/Api.jsx";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthorizated, setIsAuthorizated] = useState(!!token);
  const [cargos, setCargos] = useState([]);
  const [cargosByUser, setCargosByUser] = useState([]);
  const [carsByUser, setCarsByUser] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  console.log("Токен",token)
  console.log(isAuthorizated);
  console.log(cargos);
  console.log(cargosByUser)
  console.log(user)
  const login = async(formBody) => {
    try {
      const data = await Api.login(formBody);
      if (!data.res.ok) {
        setError(true)
        alert(data.data.message)
        return;
      }
      console.log(data)
      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token)
      setIsAuthorizated(true);
      navigate("/");
      return { data: data, res: data.res };
    }
    catch (err) {
      console.log(err);
    }
  }
  const logout = async () => {
    setToken(null)
    setUser(null);
    localStorage.removeItem("token")
    setIsAuthorizated(false);
    navigate("/")
  }
  const GetCargo = async () => {
    try {
      const data = await Api.getCargos(token);
      if (!data.res.ok)ThrowError("Невдалось отримати оголошення")
      setCargos(data.data.cargos);
    } catch (error) {
      console.log(error);
    }
  }
  const GetCargoByUser = async() => {
    try {
      const data = await Api.getByUser(token);
      if (!data.res.ok) ThrowError(data.data.message);
      console.log(data)
      setCargosByUser(data.data.cargosByUser)
    } catch (err) {
      console.log(err);
    }
  }
  const updateTokenAndUser = async (FormBody) => {
    try {
       const data = await Api.updateUser(FormBody, token);
            if (!data.res.ok) {
                console.log(data.data.message)
                return;
      };
      setToken(data.data.token);
      setUser(data.data.user);
      localStorage.removeItem("token");
      localStorage.setItem("token", data.data.token)
      console.log(data.data.message)
    } catch (error) {
        console.log(error);
    }
  }
  const getVehiclesByUser = async () => {
    try {
      const data = await Api.getCarByUser(token);
      if (!data.res.ok) {
        console.log(data.data.cars);
        return;
      }
      console.log(data.data.cars)
      setCarsByUser(data.data.cars);
    } catch (error) {
      console.log(error)
    }
  }
  const updateAvatar = async (file) => {
    try {
      const data = await Api.updateAvatar(file, token);
      if (!data.res.ok) {
        console.log(data.data.message);
        alert(data.data.message)
        return;
      }
      console.log(data.data)
      console.log(data.data.token);
      console.log(data.data.user);
        setToken(data.data.token);
      setUser(data.data.user);
      localStorage.removeItem("token");
      localStorage.setItem("token", data.data.token)
      console.log(data.data.message)
       alert(data.data.message)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!token) return;
    const verifyToken = async() => {
     try {
        const data = await Api.verifyToken(token)
       if (!data.res.ok) throw new Error();
      setUser(data.data.user);
     } catch (error) {
       console.log(error)
       logout();
     }
    }
    if (!isAuthorizated) logout();
    verifyToken();
    GetCargo();
    GetCargoByUser();
    getVehiclesByUser();
},[token])
  return (
    <AuthContext.Provider value={{ user, login,token,logout,isAuthorizated,GetCargo,cargos,cargosByUser,updateTokenAndUser,getVehiclesByUser,carsByUser,error,updateAvatar}}>
      {children}
    </AuthContext.Provider>
  );
};