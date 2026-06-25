import Footer from "../components/Footer";
import Header from "../components/Header";
import leftArrow from "../assets/leftArrow.png"
import arrow from "../assets/arrow.png"
import { useNavigate, useParams } from "react-router-dom";
import card from "../assets/card.png"
import phone from "../assets/phone.png"
import ava from "../assets/backgroundLogin25.png"
import phones from "../assets/phone.png"
import envelop from "../assets/envelop.png";
import { useEffect, useState } from "react";
import * as Api from "../api/Api.jsx"
import { useAuth } from "../hooks/useAuth.jsx";
import sprinter from "../assets/sprinter.jpg"
import profoleIcon2 from "../assets/profileIcon2.png"
import truck from "../assets/carOrange.png"
import close from "../assets/close.png"
function CarInfo() {
    const navigate = useNavigate();
    const [cargoByOne, setCargoOne] = useState(null);
    const { token,user} = useAuth();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [accept, setAccept] = useState(false);
    const [sum, setSum] = useState(0);
    const [carInfo, setCarInfo] = useState(null);
    const [bill, setBill] = useState(null);
    console.log(cargoByOne)
    console.log("CarINFO", carInfo);
    console.log(bill)
    const getBill = async () => {
           try {
                    const data = await Api.getBill(token);
                    if (!data.res.ok) {
                        console.log(data.data.message)
                        return;
                    }
                    setBill(data.data.bill);
                } catch (error) {
                    console.log(bill)
                }
    }
    const getInfo = async () => {
        try {
            const data = await Api.getCargoInfoByOne(token,id);
            if (!data.res.ok) {
                console.log(data.data);
                return;
            }
            setCargoOne(data.data.cargoInfo);
        } catch (error) {
            console.log(error);
        }
    }
    const formatedWeight = (txt) => {
        if (!txt) return;
        const edTxt = txt.split(".");
        const first =edTxt[0].slice(0, 2);
        const last = edTxt[0].slice(2, edTxt[0].length);
        return `${first}${last}`;
    }
    const formatedDate = (date) => {
           if (!date) return;
        const dates = new Date(date);
        const year = dates.getFullYear();
        const month = String(dates.getMonth()+ 1).padStart(2,'0');
        const day = String(dates.getDate()).padStart(2,'0')
        return `${day}.${month}.${year}`
    }
    useEffect(() => {
    getInfoByCar();
        getInfo();
        getBill();
    }, []);
    const HandleSum = (e) => {
        setSum(e.tagret.value);
    }
    useEffect(() => {
    if(carInfo||cargoByOne){
        setLoading(false);
    }

    }, [carInfo,cargoByOne]);
    const getInfoByCar = async () => {
        try {
            const data = await Api.getOneCar(id, token);
            if (!data.res.ok) {
                console.log(data.data.message);
                return;
            }
            setCarInfo(data.data.carInfo);
        } catch (error) {
            console.log(error)
        }
    }
    const getPercent = (value) => {
        return value*1 /100;
    }
    const createPayment = async (e) => {
        e.preventDefault();
        try {
            if (user?.user_id == carInfo?.user_id) {
                alert("Ви неможете оплатити доставку самому собі");
                return;
            }
            if (parseFloat(carInfo?.delivery_price) > parseFloat(bill?.balance)) {
                alert("Недостатньо коштів поповність ваш рахунок");
                return;
            }
            const FormBody = {
                sender_id: user?.user_id,
                receiver_id: carInfo?.user_id,
                general_sum: parseFloat(getPercent(carInfo?.delivery_price)) + parseFloat(carInfo?.delivery_price),
                sum_by_delivery: parseFloat(carInfo?.delivery_price),
                sum_by_commission: parseFloat(getPercent(carInfo?.delivery_price)),
                car_id: Number(id)
            }
            console.log(FormBody)
            const data = await Api.createPayments(FormBody, token);
            if (!data.res.ok) {
                console.log(data.data.message);
                return;
            }
            alert("Доставка оплачена")
            setAccept(!accept);
        } catch (error) {
            console.log(error)
        }
    }
    return (<><section className="Header"><Header /></section>
        {loading?<p>Loadding...</p>:<main className="InfoByCargo">
            <div className="back" onClick={() => { navigate("/vehicles") }}><img src={leftArrow} className="icon" alt="" /><p style={{ margin: "0", padding: "0", fontSize: "20px" }}>Повернутись до пошуку</p></div>
            <div><h4 style={{ color: "black", fontSize: "26", margin:"0"}}>МАРШРУТ</h4>
                <div style={{ display: "flex", color: "black",alignItems:"center",marginTop:"10px" }}><p className="routeItem">{carInfo?.from_city}</p><img src={arrow} className="icon" alt="" /><p className="routeItem">{carInfo?.to_city}</p></div>
            </div>
            <div style={{ display: "flex"}}>
                <div style={{marginRight:"20px"}}>
                    <div className="PayemntInfo">
                        <div style={{display:"flex"}}>
                            <img src={sprinter} style={{ width: "450px" }} alt="" />
                            <div>   <div style={{padding:"20px"}}>  <h4 className="routeItem" style={{ fontSize: "30px", textAlign: "center" }}>{carInfo?.brand} {carInfo?.model}</h4>
                                <p style={{
                                    color: "#000", margin: "0px", padding: "0px",
                                    width: "300px", marginLeft: "46px", marginTop: "10px", height: "max-content", marginBottom:"0"
                                }}>{carInfo?.description}</p>
                                <p style={{ color: "#060606", margin:"0",marginLeft:"26px",marginTop:"10px"}}>Ціна доставки:  <span style={{color:"#ed4700",fontSize:"22px",fontWeight:"600"}}>{carInfo?.delivery_price}грн</span></p>
                                <button className="pay" style={{
                                    padding: "22px 50px", marginLeft: "40px", marginTop: "10px",marginBottom:"10px"
                    }}onClick={()=>setAccept(!accept)}>Вибрати цей автомобіль</button><button className="pay" style={{ border: "1px solid #ed4700", backgroundColor: "white", color: "#ed4700", marginLeft: "40px", padding: "18px 70px" }}><img src={phone} className="icon" style={{ height: "30px" }} />зателефонувати</button>
                </div></div>
                        </div><br />
                       
            </div>  <div className="senderBox">
                    <h4 style={{
                        fontSize: "20px", margin: "0",
                        marginBottom: "20px"
                    }}>Інформація про водія</h4>
                    <div style={{ display: "flex", alignItems: "center",marginBottom:"30px" }}><img src={`http://localhost:5000${user?.avatar_url}`} className="avatarkaa" alt="" /><p className="initials">{carInfo?.name} {carInfo?.last_name}</p></div>
                             <div className="contactInfoBox" style={{fontWeight:"600",fontSize:"18px"}}><img className="icon" src={phones} alt="" />{carInfo?.phone}</div>
                                            <div className="contactInfoBox" style={{fontWeight:"600",fontSize:"18px"}}><img src={envelop} alt="" className="icon" />{carInfo?.email}</div> 
                    </div></div>
                 <div className="infoAboutCargo" style={{marginTop:"20px",height:"max-content",paddingBottom:"50px"}}>
                <h5 style={{
                    margin: 0, marginBottom: "20px"}}>Інформація про авто</h5>
                <div style={{display:"flex"}}>     <div style={{marginRight:"30px"}}>
                        <p className="itemOfCharacteristic">Тип авто</p>
                        <p className="itemOfCharacteristic">Об'єм кузова</p>
                    <p className="itemOfCharacteristic">Вантажопідйомність</p>
                    <p className="itemOfCharacteristic">Марка</p>
                    <p className="itemOfCharacteristic">Модель</p>
                    <p className="itemOfCharacteristic">Рік випуску</p>
                    <p className="itemOfCharacteristic">Реєестарційний номер</p>
                    <p className="itemOfCharacteristic">Стастус</p>
                </div>
                   <div><p className="itemOfValue">{carInfo?.type}</p>
                    <p className="itemOfValue">{formatedWeight(carInfo?.cargo_volume)+" м"}<sup>3</sup></p>
                    <p className="itemOfValue">{formatedWeight(carInfo?.capacity) + " кг"}</p>
                    <p className="itemOfValue">{carInfo?.brand}</p>
                            <p className="itemOfValue">{carInfo?.model}</p>
                             <p className="itemOfValue">{carInfo?.year+"р."}</p>
                    <p className="itemOfValue">{carInfo?.plate_number}</p>
                    <p className="itemOfValue">{carInfo?.status}</p>
                    </div>
                </div>
            </div>
            </div>
            {accept && <div className="wrapper"><div className="paymentCard">
                <div>
                    <div style={{display:"flex"}}>
                         <div>
                    <h4 style={{fontSize:"26px",margin:"0"}}>Оплата доставки</h4>
                            <p style={{
                                margin: "0", padding: "0", marginTop: "10px",marginBottom:"10px",color:"gray"
                    }}>Будь ласка,перевірте реквізити та суму платежу перед оплатою</p></div>
                          <img src={close} className="icon" onClick={()=>{setAccept(!accept)}}  alt="" />
                </div>
                    <form action="" className="formPay">
                        <div className="boxReciverInfo"><img src={profoleIcon2} style={{ height: "80px", marginTop: "4px", marginRight: "10px" }} alt="" /><div><p className="titlePayment">Рахунок замовника</p><p className="walletNumber">{bill?.bill_number}</p>
                        <p className="initialsInfo">{user?.name} {user?.last_name}</p></div>
                    </div>
                        <div className="boxReciverInfo"><img src={truck} style={{ height: "80px", marginTop: "4px", marginRight: "10px" }} alt="" /><div ><p className="titlePayment">Рахунок перевізника</p><p className="walletNumber">{carInfo?.bill_number}</p>
                        <p  className="initialsInfo">{carInfo?.name} {carInfo?.last_name}</p></div>
                        </div>
                        <div style={{display:"flex",borderBottom:"1px solid rgb(197, 197, 197)"}}>
                            <div>
                                <p className="initialsInfo" style={{margin:"10px",marginTop:"20px"}}>Сума доставки</p>
                                <p className="initialsInfo"  style={{margin:"10px",marginBottom:"20px"}}>Комісія сервісу (1%) від суми доствки</p>
                            </div>
                             <div style={{marginLeft:"110px",marginTop:"20px"}}>
                                 <p className="titlePayment"style={{marginBottom:"10px"}}>{carInfo?.delivery_price}грн</p>
                                <p className="titlePayment">{getPercent(carInfo?.delivery_price)}грн</p>
                            </div>
                            
                        </div>
                         <div style={{display:"flex"}}>
                            <div>
                                <p className="initialsInfo" style={{margin:"10px",marginTop:"20px"}}>Сума з комісією</p>
                            </div>
                             <div style={{marginLeft:"110px",marginTop:"20px"}}>
                                 <p className="titlePayment"style={{marginBottom:"10px",marginLeft:"220px",color:"#ed4700"}}>{parseFloat(getPercent(carInfo?.delivery_price))+parseFloat(carInfo?.delivery_price)}грн</p>
                            </div>
                        </div>
                    </form>
                    <button className="PayBTN" onClick={createPayment}>Оплатити {parseFloat(getPercent(carInfo?.delivery_price))+parseFloat(carInfo?.delivery_price)} грн</button>
                </div>
            </div></div>}
        </main>}
        <Footer/>
    </>)
}
export default CarInfo;