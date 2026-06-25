import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import locationTo from "../assets/locationTo.png";
import locationFrom from "../assets/locationFrom.png";
import tick from "../assets/tick.png";
import appDon from "../assets/appDon.png";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Api from "../api/Api.jsx";
function Create() {
    const { isAuthorizated, logout, token,GetCargo} = useAuth();
    const [from_city, setFromCity] = useState("");
    const [to_city, setToCity] = useState("");
    const [from_address, setFromAddres] = useState("");
    const [to_addres, setToAddres] = useState("");
    const [date_from, setDateFrom] = useState("");
    const [date_to, setDateTo] = useState("");
    const [type, setType] = useState("");
    const [height,setHeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [weight, setWeight] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const HandleFromCity = (e) => {
        setFromCity(e.target.value);
    }
     const HandleToCity = (e) => {
        setToCity(e.target.value);
    }
       const HandleFromAddres = (e) => {
        setFromAddres(e.target.value);
    }
     const HandleToAddress = (e) => {
        setToAddres(e.target.value);
    }
       const HandleDateFrom = (e) => {
        setDateFrom(e.target.value);
    }
     const HandleDateTo = (e) => {
        setDateTo(e.target.value);
    }
     const HandleType = (e) => {
        setType(e.target.value);
    }
      const HandleHeight = (e) => {
        setHeight(e.target.value);
    }
      const HandleLength = (e) => {
        setLength(e.target.value);
    }
      const HandleWidth = (e) => {
        setWidth(e.target.value);
    }
      const HandleWeight = (e) => {
        setWeight(e.target.value);
    }
       const HandleAmount = (e) => {
        setAmount(e.target.value);
    }
       const HandleDescription = (e) => {
        setDescription(e.target.value);
    }
    const createCargo = async (e) => {
        e.preventDefault();
        try {
            if (from_city == "" || to_city == "", from_address == "" || to_addres == "" || date_from == "" || date_to == "" || date_to=="" || type == "" || height == "" || weight == "" || width == "" || length == "" || amount == "") return;
            const FormBody = {
                from_city: from_city,
                to_city: to_city,
                address_from: from_address,
                address_to: to_addres,
                date_from: date_from,
                date_to: date_to,
                type: type,
                height: parseFloat(height),
                length: parseFloat(length),
                width: parseFloat(width),
                weight: parseFloat(weight),
                amount: parseFloat(amount),
                description: description
            }
            const data = await Api.createCargo(token, FormBody)
            if (!data.res.ok) {
                console.log(data.data.message)
                 alert(data.data.message);
                return;
            }
            console.log(data.data.message);
            alert(data.data.message);
            GetCargo();
             setFromCity("");
            setToCity("");
            setWidth("");
            setAmount("");
            setDateFrom("");
            setDateTo("");
            setDescription("");
            setFromAddres("");
            setFromCity("");
            setHeight("");
            setToAddres("");
            setLength("");
            setToCity("");
            setType("");
            setWeight("");
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        <section className="Header"><Header />
        </section>
       {!isAuthorizated?<div className="loguotBox"><div><p className="logInMessage">Увійдіть щоб створити вантаж</p><Link className="logInBtn" to="/login">Увійти</Link></div></div>: <main className="CreateBackground">
            <Title title={"СТВОРЕННЯ ВАНТАЖУ"} color={"Black"} />
            <div className="BoxAdviceAndCreate">
                <form className="CreateBoxDiv" onSubmit={createCargo}>
                <div><div className="lableFrom"><h4>Маршрут</h4><hr /></div>
                    <div className="locationBigBox">
                        <div className="locationBox"><img className="locationImg" src={locationFrom} alt="" /><label htmlFor="">Звідки</label><input type="text" className="inputCreate" onChange={HandleFromCity} value={from_city} placeholder="Київ" />
                        </div>
                        <hr />
                        <div className="locationBox"><img src={locationTo} alt="" className="locationImg" /><label htmlFor="">
                        Куди</label><input type="text" onChange={HandleToCity} value={to_city} className="inputCreate" placeholder="Львів" /></div>
                    </div>
                        <div className="locationBox"><label htmlFor="">Адреса відправки</label><input type="text" placeholder="вул.Лесі Українки 12" className="inputCreate" onChange={HandleFromAddres} value={from_address} />
                            <label htmlFor="">Адреса доставки</label><input type="text" onChange={HandleToAddress} value={to_addres} className="inputCreate" placeholder="вул.Степана Бандери 24" /></div>
                </div>
                <div><div className="lableFrom"><h4>Дата</h4><hr /></div>
                    <div className="locationBigBox">
                        <div>
                            <label htmlFor="">Від</label><input type="datetime-local" onChange={HandleDateFrom} value={date_from} className="inputCreate" />    
                        </div>
                        <hr />
                        <div> <label htmlFor="">До</label><input className="inputCreate" type="datetime-local" onChange={HandleDateTo} value={date_to} /></div>
                    </div>
                </div>
                <div><div className="lableFrom"><h4>Інформація про вантаж</h4><hr /></div>
                    <div className="cargoParamBox">
                        <div className="ParamBox"><label htmlFor="" className="lableParam">Тип вантажу</label><br/><input type="text" onChange={HandleType} value={type} className="inputCreate" placeholder="Будь-що"/></div>
                        <div  className="ParamBox"><label htmlFor=""  className="lableParam">Висота</label><br/><input type="text" onChange={HandleHeight} value={height} className="inputCreate" placeholder="м."/></div>
                        <div  className="ParamBox"><label htmlFor=""  className="lableParam">Довжина</label><br/><input type="text"  onChange={HandleLength} value={length} className="inputCreate"placeholder="м." /></div>
                        <div  className="ParamBox"><label htmlFor=""  className="lableParam">Ширина</label><br/><input type="text" onChange={HandleWidth} value={width} className="inputCreate" placeholder="м."/></div>
                        <div className="ParamBox"><label htmlFor="" className="lableParam">Масса</label><br /><input type="text" onChange={HandleWeight} value={weight} className="inputCreate" placeholder="кг"/></div>
                         <div  className="ParamBox"><label htmlFor=""  className="lableParam">Вартість</label><br/><input type="text" onChange={HandleAmount} value={amount} className="inputCreate"placeholder="грн." /></div>
                    </div>
                    <div className="ParamBox"><label htmlFor="" className="lableParam">Опис</label><br /><textarea placeholder="Особливості вантажу та побажання при перевезенні" onChange={HandleDescription} value={description}></textarea></div>
                    <button className="CreateBtn">Опублікувати вантаж</button>
                </div>
                </form>
              <div className="reklama"> <div className="advices">
                <div><div><h5>Поради по створенню вантажу</h5></div>
                        <div className="advice"><img className="tick" src={tick} alt="" /><p>Вказуйте точні габарати та вагу вантажу</p></div>
                        <div className="advice"><img className="tick" src={tick} alt="" /><p>Обирайте перевірених перевізників з високим рейтингом.</p></div>
                         <div className="advice"><img className="tick" src={tick} alt="" /><p>Детально описуйте тип вантажу для підбору правильного транспорту.</p></div>
                </div>
                </div>
                      <img src={appDon} className="appDon" alt="" />
                </div>
           </div>
        </main>}
        <Footer/>
    </>)
}
export default Create;