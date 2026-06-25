import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import volumeCar from "../assets/measure.png";
import truck from "../assets/truck.png";
import weight from "../assets/weight.png"
import { useAuth } from "../hooks/useAuth";
import Car from "../components/Car";
import * as Api from "../api/Api.jsx"
function Vehicles() {
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");
  const [car_volume, setCarVolume] = useState("");
  const [allCars, setAllCars] = useState([]);
  console.log(allCars)
     const { user,logout, isAuthorizated, cargos,cargosByUser,token,updateTokenAndUser,carsByUser,getVehiclesByUser} = useAuth();
  useEffect(() => {
    AllCars();
  }, [])
  const HandleType = (e) => {
    if (e.target.checked) {
      setType(e.target.value) 
    }
    else{setType("");}
  }
   const HandleCapacity = (e) => {
    if (e.target.checked) {
      setCapacity(e.target.value) 
    }
    else{setType("");}
  }
   const HandleVolume = (e) => {
    if (e.target.checked) {
       setCarVolume(e.target.value) 
    }
    else{setType("");}
  }
  const sendFilter = async (e) => {
    e.preventDefault();
    try {
      const capacityS = HandleFilter(capacity);
      const car_volumeS = HandleFilter(car_volume);
    const FormBody = {
      type: !type ? null:type,

    capacity_max:
        !capacity || capacityS[1] === "null"
            ? null
            : parseFloat(capacityS[1]),

    capacity_min:
        !capacity
            ? null
            : parseFloat(capacityS[0]),

    car_volume_max:
        !car_volume || car_volumeS[1] === "null"
            ? null
            : parseFloat(car_volumeS[1]),

    car_volume_min:
        !car_volume
            ? null
            : parseFloat(car_volumeS[0]),
};
      console.log(FormBody)
      const data = await Api.getFiltredCar(FormBody, token);
      if (!data.res.ok) {
        console.log(data.data.message);
        return;
      }
      console.log(data.data)
      setAllCars(data.data.cars);
      setType("");
      setCapacity("")
      setCarVolume("");
    } catch (error) {
      console.log(error);
    }
  }
  const HandleFilter = (value) => {
    const [min, max] = value.split("-");
    return [min, max];
  }
  const AllCars = async () => {
    try {
      const data = await Api.getAllCars(token);
      if (!data.res.ok) {
        console.log(data.data.message);
        return;
      };
      setAllCars(data.data.cars);
    } catch (error) {
      console.log(error);
    }
  }
  return (<>
        <section className="Header"><Header /></section>
        <main className="VehiclesBox">
            <Title title={"Пошук транспорту"} color={"Black"} />
            <div style={{display:"flex"}}>
                <form action="" className="FilterCarBox">
                    <h3 style={{fontSize:"20px"}}>Фільтри пошуку</h3>
                   <div class="filter-box">
                       <div class="filter-header">
                         <span><img src={volumeCar} className="icon" alt="" /></span>
                         <h3 >Об'єм кузову</h3>
                       </div>
  <label class="custom-checkbox">
    <input type="checkbox" value={"10-20"} onChange={HandleVolume}/>
    <span class="checkmark"></span>
    10 - 20 м³
  </label>

  <label class="custom-checkbox">
    <input type="checkbox"/>
    <span class="checkmark" value={"20-40"} onChange={HandleVolume}></span>
    20 - 40 м³
  </label>

  <label class="custom-checkbox">
    <input type="checkbox"  value={"40-60"} onChange={HandleVolume}/>
    <span class="checkmark"></span>
    40 - 60 м³
  </label>

  <label class="custom-checkbox">
    <input type="checkbox"  value={"60-null"} onChange={HandleVolume}/>
    <span class="checkmark"></span>
    Більше 60 м³
  </label>
</div>
                    <div class="filter-box">
                       <div class="filter-header">
                         <span><img src={weight} className="icon" alt="" /></span>
                         <h3>Вантажопідйомність</h3>
                       </div>

  <label class="custom-checkbox">
    <input type="checkbox" value={"1-3"} onChange={HandleCapacity}/>
    <span class="checkmark"></span>
    1-3 т
  </label>

  <label class="custom-checkbox">
    <input type="checkbox"  value={"3-5"} onChange={HandleCapacity}/>
    <span class="checkmark"></span>
   3-5 т
  </label>

  <label class="custom-checkbox">
    <input type="checkbox" value={"5-10"} onChange={HandleCapacity}/>
    <span class="checkmark"></span>
    5-10 т
    </label>
    <label class="custom-checkbox">
    <input type="checkbox" value={"10-null"} onChange={HandleCapacity}/>
    <span class="checkmark"></span>
    Більше 10 т
  </label>
</div>
               <div class="filter-box">
                       <div class="filter-header">
                         <span><img src={truck} className="icon" alt="" /></span>
                         <h3>Тип авто</h3>
                       </div>
 <label class="custom-checkbox">
    <input type="checkbox" value={"Бус"} onChange={HandleType} />
    <span class="checkmark"></span>
     Бус
  </label>

  <label class="custom-checkbox">
    <input type="checkbox" value={"Фура"} onChange={HandleType}/>
              <span class="checkmark"></span>
              Фура
  </label>

  <label class="custom-checkbox">
    <input type="checkbox"value={"Тягач"} onChange={HandleType}/>
    <span class="checkmark"></span>
    Тягач
            </label> 
            <label class="custom-checkbox">
    <input type="checkbox"value={"Мікроавтобус"} onChange={HandleType}/>
    <span class="checkmark"></span>
    Мікроавтобус
            </label> 
                    <label class="custom-checkbox">
    <input type="checkbox"value={"Фургон"} onChange={HandleType}/>
    <span class="checkmark"></span>
    Фургон
  </label> 
                    </div>
                    <button className="find" onClick={sendFilter}>Знайти</button><br/>
          <button className="reset" type="button" onClick={() => { setCapacity(""); setCarVolume(""); setType("")}}>Скинути фільтри</button>
                </form>
                <div className="cardsCar">  {allCars.length < 1 ? <p>Доступних авто немає</p> : allCars.map(car => (<Car obj={car}  key={car.vehicle_id}/>))}</div>
            </div>
        </main>
        <Footer/>
    </>)
}
export default Vehicles;