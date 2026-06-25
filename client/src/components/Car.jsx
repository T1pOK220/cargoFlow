import sprinter from "../assets/sprinter.jpg";
import truck from "../assets/truck.png";
import weight from "../assets/weight.png"
import measure from "../assets/measure.png"
import plate from "../assets/plateNumber.png";
import pen from "../assets/pen.png";
import deleteIcon from "../assets/delete.png";
import { Navigate, useNavigate } from "react-router-dom";
function Car({obj,onClick,onDelete,isProfile}) {
    const { brand, model, capacity, type, cargo_volume, status, plate_number,v_avatar_url } = obj;
    const navigate = useNavigate();
    return (<>
        <div>
            <div className="car"><img src={`http://localhost:5000${v_avatar_url}`} className="carImg" alt="" /><div className="status" style={status == "Доступний" ? { color: "rgb(22, 212, 22)" } : { color: "rgb(245, 69, 69)"}}>{status}</div>
                <div className="carInfoBox">
                    <div>
                    <h4 className="brandAndModel">{brand} {model}</h4>
                </div>
                  <div className="carInfo">
                    <img src={truck} style={{ height: "25px" }} className="icon" alt="" />
                    <p className="category">Тип</p>
                    <p className="characteristic">{type}</p>
                    </div>
                     <div className="carInfo">
                    <img src={weight} style={{ height: "25px" }} className="icon" alt="" />
                    <p className="category">Вантажопідйомність</p>
                    <p className="characteristic">{capacity}т</p>
                    </div>
                     <div className="carInfo">
                    <img src={measure} style={{ height: "25px" }} className="icon" alt="" />
                    <p className="category">Об'єм</p>
                    <p className="characteristic">{cargo_volume}м<sup>2</sup></p>
                    </div>
                     <div className="carInfo">
                    <img src={plate} style={{ height: "25px" }} className="icon" alt="" />
                    <p className="category">Номерний знак</p>
                    <p className="characteristic">{plate_number}</p>
                    </div>
                    {!isProfile ? <div style={{
                        display: "flex", justifyContent: "center",
                        marginTop: "10px"
                    }}><button className="EditBTN" style={{width:"100%"}} onClick={()=>navigate(`/vehicles/${obj.vehicle_id}`)}>Детальніше</button></div> :<div style={{ display: "flex", alignItems: "center", marginTop: "10px", padding: "0 5px" }}><button className="CarBtn" onClick={() => { onClick(obj) }}> <img src={pen} style={{ height: "15px" }} alt="" className="icon" onClick={onClick} />Редагувати</button><button className="CarBtn" style={{ color: "red", border: "1px red solid", marginLeft: "auto" }} onClick={()=>{onDelete(obj.vehicle_id)}}><img src={deleteIcon} style={{ height: "15px" }} className="icon" />Видалити</button></div>}
                </div>
            </div>
        </div>
    </>)
}
export default Car;