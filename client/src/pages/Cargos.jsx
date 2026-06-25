import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import Cargo from "../components/Cargo";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as Api from "../api/Api.jsx";
function Cargos() {
    const { isAuthorizated, cargos, token } = useAuth();
    const [from_city, setFrom_city] = useState("");
    const [to_city, setTo_city] = useState("");
    const [amount_from, setAmount_from] = useState(0);
    const [amount_to, setAmount_to] = useState(0);
    const [weigth, setWeigth] = useState(0);
    const [filtredCargos, setFiltredCargos] = useState(cargos);
    console.log(filtredCargos)
    console.log(cargos)
    const HandleWeigth = (e) => {
        setWeigth(e.target.value);
    }
     const HandleFrom_city= (e) => {
        setFrom_city(e.target.value);
    }
     const HandleTo_city= (e) => {
        setTo_city(e.target.value);
    }
     const HandleAmount_from= (e) => {
        setAmount_from(e.target.value);
    }
       const HandleAmount_to= (e) => {
        setAmount_to(e.target.value);
    }
    const percent = (weigth - 0) / (30 - 0) * 100;
    useEffect(() => {
        setFiltredCargos(cargos)
    }, [cargos])
    const sendFilter = async (e) => { 
        e.preventDefault()
        try {
            const FormBody = {
            from_city: from_city == "" ? null :from_city,
            to_city: to_city==""? null :to_city,
            amount_from: amount_from==""? null :parseFloat(amount_from),
            amount_to: amount_to==""? null : parseFloat(amount_to),
            weight: weigth == 0 ? null : parseFloat(weigth * 1000)
            }
            const isEmptyFilter = Object.values(FormBody).every(v => v === null);
            if (isEmptyFilter) {
                setFiltredCargos(cargos)
                console.log("Фільтр пустий")
                return;
            }
            console.log(FormBody);
            const data = await Api.getCargosByFilter(token, FormBody);
            if (!data.res.ok) {
                console.log("невдалось отримати данні з серверу")
                return;
            }
            console.log(data.data)
            setFiltredCargos(data.data.filtredCargos)
        } catch (error) {
            console.log(error)
        }
    };
    return (<><section className="Header"><Header /></section>
        {!isAuthorizated ? <div className="loguotBox"><div><p className="logInMessage">Увійдіть щоб створити вантаж</p><Link className="logInBtn" to="/login">Увійти</Link></div></div>: <main className="MainBackGround"><Title title={"ПОШУК ВАНТАЖІВ"} color={"White"}/>
            <div className="BoxMain">
                <div>
                    <form className="searchForm" action="" onSubmit={sendFilter}>
                        <h6 className="titleFrom">Фільтри</h6>
                        <input type="text" placeholder="Звідки?" onChange={HandleFrom_city} className="filterInp"/><br />
                    <input type="text" placeholder="Куди?" onChange={HandleTo_city} className="filterInp"/><br />
                        <div><label htmlFor="" style={{fontSize:"20px"}}>Масса</label><input type="range" placeholder="Тонаж" id="range" max={30} min={0} value={weigth} onChange={HandleWeigth} style={{background: `linear-gradient(to right, #ff4d00 ${percent}%, #ddd ${percent}%)`}}/><label htmlFor="range" className="rangeLable" style={{fontSize:"20px"}}>{weigth}T</label></div><br />
                    <input type="number" placeholder="Ціна від"  onChange={HandleAmount_from} className="filterInp"/><br />
                        <input type="number" placeholder="Ціна до" onChange={HandleAmount_to} className="filterInp" /><br />
                    <button className="filterBtn">Знайти</button>
                </form>
                </div>
                <div className="cargosBox">
                    {filtredCargos.length < 1 ? <p>Оголошень немає</p> : filtredCargos.map(cargo => (
                         <Cargo obj={cargo} role={"public"} />
                    ))}
                </div>
            </div>
        </main>}
        <Footer/>
    </>)
}
export default Cargos;