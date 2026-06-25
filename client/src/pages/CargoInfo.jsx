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
function CargoInfo() {
    const navigate = useNavigate();
    const [cargoByOne, setCargoOne] = useState(null);
    const { token } = useAuth();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [accept, setAccept] = useState(false);
    console.log(cargoByOne)
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
    getInfo();
}, []);

useEffect(() => {

    if(cargoByOne){
        setLoading(false);
    }

}, [cargoByOne]);
    return (<><section className="Header"><Header /></section>
        {loading?<p>Loadding...</p>:<main className="InfoByCargo">
            <div className="back" onClick={() => { navigate("/cargos") }}><img src={leftArrow} className="icon" alt="" /><p style={{ margin: "0", padding: "0", fontSize: "20px" }}>Повернутись до пошуку</p></div>
            <div><h4 style={{ color: "black", fontSize: "26", margin:"0"}}>ДЕТАЛІ ВАНТАЖУ</h4>
                <div style={{ display: "flex", color: "black",alignItems:"center",marginTop:"10px" }}><p className="routeItem">{cargoByOne?.from_city}</p><img src={arrow} className="icon" alt="" /><p className="routeItem">{cargoByOne?.to_city}</p><p className="routeItem">{formatedWeight(cargoByOne?.weight)+" кг"}</p></div>
            </div>
            <div className="PayemntInfo"><div><h4 className="routeItem">Вартість перевезеня</h4>
                <p className="routeItem" style={{fontSize:"28px",marginTop:"10px",marginBottom:"10px"}}>{formatedWeight(cargoByOne?.amount)+" грн"}</p>
                <p className="routeItem" style={{color:"gray",fontSize:"18px"}} >1% комісії від вартості</p>
            </div>
                <div style={{ display:"flex",marginLeft:"auto",alignItems:"center"}}>
                    <button className="pay" style={{padding:"22px 80px"}}onClick={()=>setAccept(!accept)}>оформити доставку</button><button className="pay" style={{ border: "1px solid #ed4700", backgroundColor: "white", color: "#ed4700", marginLeft: "30px", padding: "18px 80px" }}><img src={phone} className="icon" style={{ height: "30px" }} />зателефонувати</button>
                </div>

            </div>
           
            <div style={{display:"flex"}}> <div className="infoAboutCargo"style={{marginRight:"10px"}}>
                <h5 style={{
                    margin: 0, marginBottom: "20px"}}>Інформація про вантаж</h5>
                <div style={{display:"flex"}}>     <div style={{marginRight:"30px"}}>
                    <p className="itemOfCharacteristic">Тип вантажу</p>
                    <p className="itemOfCharacteristic">Об'єм</p>
                    <p className="itemOfCharacteristic">Масса</p>
                    <p className="itemOfCharacteristic">Дата завантаження</p>
                    <p className="itemOfCharacteristic">Адреса завантаження</p>
                    <p className="itemOfCharacteristic">Дата розвантаження</p>
                    <p className="itemOfCharacteristic">Адреса розвантаження</p>
                </div>
                   <div><p className="itemOfValue">{cargoByOne?.type}</p>
                    <p className="itemOfValue">{formatedWeight(cargoByOne?.volume)+" м"}<sup>3</sup></p>
                    <p className="itemOfValue">{formatedWeight(cargoByOne?.weight)+" кг"}</p>
                    <p className="itemOfValue">{formatedDate(cargoByOne?.date_from)}</p>
                    <p className="itemOfValue">{cargoByOne?.address_from}</p>
                    <p className="itemOfValue">{formatedDate(cargoByOne?.date_to)}</p>
                    <p className="itemOfValue">{cargoByOne?.address_from}</p>
                    </div>
                </div>
            </div>
                <div className="senderBox">
                    <h4 style={{
                        fontSize: "20px", margin: "0",
                        marginBottom: "20px"
                    }}>замовник</h4>
                    <div style={{ display: "flex", alignItems: "center",marginBottom:"30px" }}><img src={`http://localhost:5000${cargoByOne?.avatar_url}`} className="avatarkaa" alt="" /><p className="initials">{cargoByOne?.name} {cargoByOne?.last_name}</p></div>
                             <div className="contactInfoBox" style={{fontWeight:"600",fontSize:"18px"}}><img className="icon" src={phones} alt="" />{cargoByOne?.phone}</div>
                                            <div className="contactInfoBox" style={{fontWeight:"600",fontSize:"18px"}}><img src={envelop} alt="" className="icon" />{cargoByOne?.email}</div> 
                </div>
            </div>
            {accept && <div>
                <div><h4>Оформлення доставки</h4><img src="" alt="" /></div>
            </div>}
        </main>}
        <Footer/>
    </>)
}
export default CargoInfo;