import { Link } from "react-router-dom";
import arrow from "../assets/arrow.png"
import MoreBtn from "./More.jsx";
function Cargo({obj,role}) {
    const { from_city, to_city, amount, create_date, announcement_id, type, distance} = obj;
    const formatedDate=(date) => {
        const dates = new Date(date);
        const year = dates.getFullYear();
        const month = String(dates.getMonth()+ 1).padStart(2,'0');
        const day = String(dates.getDate()).padStart(2,'0')
        return `${year}.${month}.${day}`
    }
    return (<div className="cargoCard">
        <div className="routerBox"><div><p><b>{from_city}</b><img className="arrow" src={arrow} alt="" /><b>{to_city}</b></p></div> <p className="dateCard">{formatedDate(create_date)}</p></div>
        <div> <p className="typeCargo">Відстань: <span className="PriceBox">{distance}км.</span></p></div>
        <div> <p className="typeCargo">Тип вантажу: {type}</p></div>
        <div className="routerBox"><p>Вартість:<span className="PriceBox">{amount}грн.</span></p>{ role=="profile"?<button className="EditBTN" >Змінити</button>:<Link to={`/cargos/${announcement_id}`} className="EditBTN" style={{textDecoration:"none"}}>Детальніше</Link>}</div>
    </div>)
}
export default Cargo;