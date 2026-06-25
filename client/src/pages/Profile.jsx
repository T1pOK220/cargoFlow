import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import phone from "../assets/phone.png"
import envelop from "../assets/envelop.png";
import Cargo from "../components/Cargo";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../api/Api.jsx";
import profileIcon from "../assets/profileIcon.png";
import lockItem from "../assets/lockIcon.png";
import eyeHide from "../assets/eyeHide.png";
import eyeOpen from "../assets/eyeOpen.png";
import delivery from "../assets/car.png"
import Car from "../components/Car.jsx";
import plus from "../assets/plus.png"
import close from "../assets/close.png";
import bank from "../assets/bank.png";

import walletIcon from "../assets/walletIcon.png"
import deliveryIcon from "../assets/deliveryIcon.png"
import galochka from "../assets/galochka.png"
function Profile() {
    const { user,logout, isAuthorizated, cargos,cargosByUser,token,updateTokenAndUser,carsByUser,getVehiclesByUser,updateAvatar} = useAuth();
    const navigate = useNavigate();
    const [nav, setNav] = useState("announcements");
    const [showPass, setShowPass] = useState("");
    const [NewName, setNewName] = useState("");
    const [NewLastName, setNewLastName] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewPhone, setNewPhone] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [samePassword, setSamePassword] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [typeOfVehicle, setTypeOfVehicle] = useState("");
    const [year, setYear] = useState("");
    const [capacity, setCapacity] = useState("");
    const [volume, setVolume] = useState("");
    const [plate_number, setPlateNumber] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [add, setAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [SelectedCar, setSelectedCar] = useState(null);
    const [v_avatar_url, setAvatarUrl] = useState("");
    const [bill, setBill] = useState(null);
    const [createBill, setCreateBill] = useState(false);
    const [bill_title, setBillTitle] = useState("");
    const [bill_number, setBillNumber] = useState("");
    const [payments, setPayments] = useState([]);
    const [Isdep, setIsDep] = useState(false);
    const [depBill_num, setDepBillNum] = useState("");
    const [depSum, setDepSum] = useState("");
    const [isEditPhoto, setIsEditPhoto] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [tepmImg, setTempImg] = useState(null);
    const [delivery_price, setDeliveryPrice] = useState("");
    const [from_city, setFromCity] = useState("");
    const [to_city, setToCity] = useState("");

    useEffect(() => {

        if (!isAuthorizated) {
            logout()
        }
    }, [isAuthorizated])
    // useEffect(() => {
    //     getVehiclesByUser();
    // },[])
    useEffect(() => {
        getBill();
        getPayments();
    }, [])
    const HandleDeliveryPrice = (e) => {
        setDeliveryPrice(e.target.value);
    }
    const HandleFromCity = (e) => {
        setFromCity(e.target.value);
    }
     const HandleToCity = (e) => {
        setToCity(e.target.value);
    }
    const deleteUser = async () => {
        const isOk = confirm("Ви точно хочете видалити акаунт?");
        if (!isOk) return;
        const data = await Api.deleteUser(token);
        if (!data.res.ok) {
            console.log(data.data.message)
            return
        };
        alert("Користувача успішно видалено");
        logout();
    }
    const HandleDepNumber = (e) => {
        // setDepBillNum(bill.bill_number)
        setDepBillNum(e.target.value);
    }
    const HandleDepSum = (e) => {
        setDepSum(e.target.value);
    }
    const HandleBrand = (e) => {
        setBrand(e.target.value)
    }
     const HandleModel = (e) => {
        setModel(e.target.value)
    }
    const HandleYear = (e) => {
        setYear(e.target.value)
    }
    const HandleTypeOfVehicle = (e) => {
        setTypeOfVehicle(e.target.value)
    }
    const HandleCapacity = (e) => {
        setCapacity(e.target.value)
    }
     const HandleVolume = (e) => {
        setVolume(e.target.value)
    }
     const HandlePlateNumber = (e) => {
        setPlateNumber(e.target.value)
    }
      const HandleStatus = (e) => {
        setStatus(e.target.value)
    }
     const HandleDescription = (e) => {
        setDescription(e.target.value)
    }
    const HandleNewName = (e) => {
        setNewName(e.target.value);
    }
     const HandleNewLastName = (e) => {
        setNewLastName(e.target.value);
    }
     const HandleNewEmail = (e) => {
        setNewEmail(e.target.value);
    }
     const HandleNewPhone = (e) => {
        setNewPhone(e.target.value);
    }
      const HandleOldPassword = (e) => {
        setOldPassword(e.target.value);
    }
      const HandleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }
      const HandleSamePassword = (e) => {
        setSamePassword(e.target.value);
    }
    const HandleBillTitle = (e) => {
        setBillTitle(e.target.value);
    }
    const HandleBillNumber = (e) => {
        setBillNumber(e.target.value);
    }
    const updateInfo = async (e) => {
        e.preventDefault();
        try {
            const FormBody = {
                name: !NewName ? null : NewName,
                last_name: !NewLastName ? null : NewLastName,
                email: !NewEmail ? null : NewEmail,
                phone: !NewPhone? null:NewPhone
            }
            await updateTokenAndUser(FormBody);
            setNav("setting")
            setNewName(""),
            setNewLastName(""),
            setNewEmail(""),
            setNewPhone("")
        } catch (error) {
            console.log(error)
        }
    }
    const changePassword = async (e) => {
         e.preventDefault()
         try {
             if (!oldPassword || !NewPassword || !samePassword) {
                 alert("Поля не можуть бути пустими")
                   return;
             }
             if (NewPassword !== samePassword) {
                 console.log("Паролі не співпадають");
                 return;
             };
              const FormBody = {
                oldPassword: oldPassword.trim(),
                NewPassword: NewPassword.trim(),
            }
          const data = await Api.changePassword(FormBody, token);
             if (!data.res.ok) {
                 console.log(data.data.message);
                 return;
             }
             console.log(data.data.message);
                 setNewPassword("");
                 setOldPassword("");
                 setSamePassword("");
        } catch (error) {
          console.log(error)
        }
    }
    const addVehicle = async (e) => {
        e.preventDefault();
        try {
            if (!brand || !model || !year || !typeOfVehicle || !capacity || !volume || !plate_number || !status || !description||!delivery_price||!from_city||!to_city) return;
             const formData = new FormData();
        formData.append("avatar", fileData);
            formData.append("brand", brand);
            formData.append("model", model);
            formData.append("year", parseFloat(year));
            formData.append("typeOfVehicle", typeOfVehicle);
            formData.append("capacity", parseFloat(capacity));
            formData.append("volume", parseFloat(volume));
            formData.append("plate_number", plate_number);
            formData.append("status", status);
            formData.append("description", description);
            formData.append("delivery_price", parseFloat(delivery_price));
            formData.append("from_city", from_city);
            formData.append("to_city", to_city);
            for (const [key, value] of formData.entries()) {
    console.log(key, value);
}
            const data = await Api.addCar(formData, token);
            if (!data.res.ok) {
                console.log(data.data.message)
                   alert(data.data.message)
                return;
            }
            console.log(data.data.message);
            setBrand("");
            setCapacity("");
            setModel("");
            setTypeOfVehicle("");
            setDescription("");
            setYear("");
            setStatus("");
            setPlateNumber("")
            setVolume("");
            setDeliveryPrice("");
            setFromCity("");
            setToCity("");
            setTempImg("");
            getVehiclesByUser();
            alert("Транспорт додано успішно")
        } catch (error) {
            console.log(error)
        }
    }
    const HandleEdit = (car) => {
        setSelectedCar(car)
        setIsEdit(prev => !prev);
    }
    const EditCar = async (e) => {
        e.preventDefault();
        try {
            console.log(brand,model,year,typeOfVehicle,capacity,volume,plate_number,status,description)
            const FormBody = {
                brand: !brand?null:brand,
                model: !model?null:model,
                year: !year?null:parseFloat(year),
                type: !typeOfVehicle?null:typeOfVehicle,
                capacity: !capacity?null:parseFloat(capacity),
                cargo_volume: !volume?null:parseFloat(volume),
                plate_number: !plate_number ? null : plate_number,
                status: !status ? null : status,
                description: !description ? null : description,
                v_avatar_url:!v_avatar_url ? null : v_avatar_url,
                id:SelectedCar.vehicle_id
            }
            const data = await Api.EditVehicle(FormBody, token);
            if (!data.res.ok) {
                console.log(data.data.message)
                return;
            }
            console.log(data.data.message);
            alert(data.data.message);
            setBrand("");
            setCapacity("");
            setModel("");
            setTypeOfVehicle("");
            setDescription("");
            setYear("");
            setStatus("");
            setPlateNumber("")
            setVolume("");
            getVehiclesByUser()
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteCar = async (carId) => {
        try {
            const data = await Api.DeleteVehicle(token, carId);
            if (!data.res.ok) {
                console.log(data);
                return;
            }
            getVehiclesByUser();
            alert(data.data.message);
        } catch (error) {
            console.log(error);
        }
    }
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
    const createBillS = async (e) => {
        e.preventDefault();
        try {
            console.log("click")
            const FormBody = {
                bill_title: bill_title,
                bill_number:bill_number
            }
            console.log(FormBody)
            const data = await Api.createBill(FormBody,token);
            if (!data.res.ok) {
                console.log(data.data)
                return;
            }
            getBill();
        } catch (error) {
            console.log(error)
        }
    }
      const formatedDate = (date) => {
           if (!date) return;
        const dates = new Date(date);
        const year = dates.getFullYear();
        const month = String(dates.getMonth()+ 1).padStart(2,'0');
        const day = String(dates.getDate()).padStart(2,'0')
        return `${day}.${month}.${year}`
    }
    const getPayments = async () => {
        try {
            const data = await Api.getPaymentsByUser(token);
            if (!data.res.ok) {
                console.log(data.data.message);
                return;
            }
                setPayments(data.data.payments)
        } catch (error) {
            console.log(error);
        }
    }
     const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;
         setFileData(file);
    console.log(file);

         const imageUrl = URL.createObjectURL(file);
         setTempImg(imageUrl)
  };

    const deposit = async (e) => {
        e.preventDefault();
        try {
            const FormBody = {
                bill_number: depBill_num,
                sum: parseFloat(depSum)
            }
            console.log(FormBody);
            const data = await Api.depost(FormBody, token);
            if (!data.res.ok) {
                console.log(data.data.message);
                return;
            }
            alert("Успішно поповнено")
            getBill();
            setIsDep(!Isdep);
            getPayments();
        } catch (error) {
            console.log(error);
        }
    }
     const uploadAvatar = async (e) => {
         e.preventDefault();
    if (!fileData) {
      alert("Оберіть файл");
      return;
    }

    const formData = new FormData();

    // avatar - назва поля
    formData.append("avatar", fileData);

   try {
       await updateAvatar(formData);
       setTempImg("")
       setIsEditPhoto(!isEditPhoto);
   } catch (error) {
       console.log(error);
   }
         
    };
    const formatedTime = (date) => {
        const dates = new Date(date);
        const hour = String(dates.getHours()).padStart(1,'0')
        const minutes = String(dates.getMinutes()).padStart(2,'0')
        return `${hour}:${minutes}`
    }
    return (<> <section className="Header"><Header />
    </section>
        <main className="BackgroundProfile">
            <div className="userBox">
                <h3>МІЙ ПРОФІЛЬ</h3>
                <div className="userInfoBox">
                    <img className="avatar" src={`http://localhost:5000${user?.avatar_url}`} alt="" />
                    <div className="userInfo">
                        <h5>{user?.name} {user?.last_name}</h5>
                        <div className="contactInfoBox"><img className="icon" src={phone} alt="" />{user?.phone}</div>
                        <div className="contactInfoBox"><img src={envelop} alt="" className="icon" />{user?.email}</div> 
                    </div>
                    <div><Link className="editBtn" onClick={()=>{setIsEditPhoto(!isEditPhoto)}}>Змінити фото</Link></div>
                    <div><button className="deleteBtn" onClick={deleteUser}>Видалити профіль</button></div>
                 </div>
            </div>
            <section className="ToolsBox">
                <nav className="profileNavigation"><span className={nav=="announcements"?"backgroundItemNav":"navItem"} onClick={()=>{setNav("announcements")}}>Мої вантажі</span> <hr className="lineProfile" /><span className={nav=="payments"?"backgroundItemNav":"navItem"} onClick={()=>{setNav("payments")}}>Платежі</span>  <hr className="lineProfile" /><span className={nav=="vehicles"?"backgroundItemNav":"navItem"} onClick={()=>{setNav("vehicles")}}>Транспорт</span> <hr className="lineProfile" /><span className={nav=="setting"?"backgroundItemNav":"navItem"} onClick={()=>{setNav("setting")}} >Налаштування профілю</span><hr className="lineProfile" /><button className="loguotBtn" onClick={logout}>Вийти</button></nav>
                <hr style={{ width: `100%`, height: 1 }} />
                {nav == "announcements" && <div className="myAnnouncements"> {cargosByUser.length < 0 ? <p>Немає створених оголошень</p> : cargosByUser.map(cargo => (<Cargo obj={cargo} role={"profile"} />))}</div>}
                {nav == "setting" && <div className="settings">
                    <div className="changeUserInfoBox">
                        <div style={{ display: "flex",alignItems:"center" }}>
                            <img style={{height:"30px",width:"30px",marginRight:"20px"}} src={profileIcon}  alt="" />
                            <h3 style={{ margin: 0, fontSize: "16px" }}>Особисті дані</h3>
                        </div>
                        <form style={{display:"block",marginTop:"20px", padding:"0",background:"White"}}>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>  <label className="lableForEdit" htmlFor="">Ім'я</label><input type="text" className="editInput" placeholder={user?.name} value={NewName} onChange={HandleNewName} style={{marginLeft:"90px"}} /><br /></div>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>  <label className="lableForEdit" htmlFor="">Прізвище</label><input type="text" className="editInput" placeholder={user?.last_name} value={NewLastName} onChange={HandleNewLastName} style={{marginLeft:"38px"}} /><br /></div>
                             <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>  <label className="lableForEdit" htmlFor="">Email</label><input type="text" className="editInput" placeholder={user?.email} value={NewEmail} onChange={HandleNewEmail} style={{marginLeft:"76px"}} /><br /></div>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>  <label className="lableForEdit" htmlFor="">Телефон</label><input type="text" className="editInput" placeholder={user?.phone}value={NewPhone} onChange={HandleNewPhone} style={{ marginLeft: "50px" }} /><br /></div>
                            <button className="editBtn" onClick={updateInfo} style={{
                                border: "none", margin: 0, marginTop: "15px"}}>Зберегти зміни</button>
                        </form>
                    </div>
                    <div className="changeUserInfoBox">
                        <div style={{ display: "flex",alignItems:"center" }}>
                            <img style={{height:"30px",width:"30px",marginRight:"20px"}} src={lockItem}  alt="" />
                            <h3 style={{ margin: 0, fontSize: "16px" }}>Зміна пароля</h3>
                        </div>
                        <form style={{display:"block",marginTop:"20px", padding:"0",background:"White"}}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>  <label className="lableForEdit" htmlFor="">Старий пароль</label><input type={showPass=="oldPass"?"text":"password"} className="editInput" placeholder="Введіть старий пароль" value={oldPassword} onChange={HandleOldPassword} style={{ marginLeft: "96px" }} />{showPass=="oldPass"?<img src={eyeHide}style={{ position: "absolute", right:"92px"}} onClick={()=>{setShowPass("")}}/>:<img src={eyeOpen} style={{ position: "absolute", right:"92px"}}onClick={()=>{setShowPass("oldPass")}}/> }<br /></div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>  <label className="lableForEdit" htmlFor="">Новий пароль</label><input type={showPass == "newPass" ? "text" : "password"} className="editInput" placeholder="Введіть новий пароль" value={NewPassword} onChange={HandleNewPassword} style={{ marginLeft: "102px" }} />{showPass == "newPass" ? <img src={eyeHide} style={{ position: "absolute", right:"92px"}} onClick={()=>{setShowPass("")}}/>:<img src={eyeOpen} style={{ position: "absolute", right:"92px"}}onClick={()=>{setShowPass("newPass")}}/> }<br /></div>
                             <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>  <label className="lableForEdit" htmlFor="">Підтвердити новий пароль</label><input type={showPass=="repeatPass"?"text":"password"} className="editInput" placeholder="Підтвердіть новий пароль" value={samePassword} onChange={HandleSamePassword} style={{marginLeft:"-2px"}} />{showPass=="repeatPass"?<img src={eyeHide} style={{ position: "absolute", right:"92px"}}onClick={()=>{setShowPass("")}}/>:<img src={eyeOpen} style={{ position: "absolute", right:"92px"}} onClick={()=>{setShowPass("repeatPass")}}/> }<br /></div>
                            <button className="editBtn" style={{
                                border: "none", margin: 0, marginTop: "40px"}} onClick={changePassword}>Змінити пароль</button>
                        </form>
                    </div>
                    
                </div>}
                {nav == "vehicles" &&
                    <div className="carBox">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={delivery} style={{ height: "50px" }} alt="" />
                            <h3>Мій транспорт</h3>
                            <button className="editBtn" style={{ border: "none", margin: 0, marginLeft: "auto", cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => { setAdd(!add);setNav(" settings")}}><img src={plus} className="icon" ></img>Додати траспорт</button>
                        </div>
                        <div className="cars">
                            {carsByUser.length < 1 ? <p>У вас немає своїх авто</p> : carsByUser.map(car => (<Car obj={car} onClick={HandleEdit} onDelete={DeleteCar} isProfile={true} key={car.vehicle_id}/>))}
                        </div>
                    </div>}
                {add && <div className="wrapper" style={{height:"880px"}}><div className="AddVehicle" style={{left:"40%"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h3>Додати транспорт</h3> <img src={close} alt="" className="icon" style={{ marginLeft: "auto", height: "30px" }} onClick={() => { setAdd(!add);setNav("vehicles") }} />
                    </div>
                    <form style={{ background: "none" }}>
                        <div style={{display:"flex"}}>  <div className="update-avatar">
                        <img src={tepmImg} className="avatar" alt="" /><br/>
                         <input
            type="file"
            id="avatarInput"
                            accept="image/*"
                               onChange={handleFileChange}
            hidden
          />
                        <label for="avatarInput">обрати фото</label>
                    </div>
                            
                        </div>
                        <div className="formAddVehicle">
                            <div className="characteristicDescriptionCar">
                                <label htmlFor="" style={{ marginBottom: "10px" }}>Тип транспорту<span style={{ color: "red", marginLeft: "4px" }}>*</span></label><br />
                            <input type="text" className="editInput" placeholder="Вантажівка" onChange={HandleTypeOfVehicle} value={typeOfVehicle} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Марка<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleBrand}  placeholder="Man" value={brand} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Модель<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleModel} value={model}  placeholder="TGL" style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Рік випуску<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="next" className="editInput"  onChange={HandleYear} value={year}  placeholder="2018" style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Вантажопідйомність<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="next" className="editInput" onChange={HandleCapacity} value={capacity} placeholder="т" style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Об'єм кузова<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleVolume} value={volume}  placeholder="м2" style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Номер авто<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandlePlateNumber} placeholder="КС9999КС" value={plate_number} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Статус<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleStatus} placeholder="Доступний/Недоступний" value={status} style={{marginTop:"10px"}} />
                            </div>
                             <div className="characteristicDescriptionCar">
                                <label htmlFor="" style={{ marginBottom: "10px" }}>Ціна доставки<span style={{ color: "red", marginLeft: "4px" }}>*</span></label><br />
                            <input type="text" className="editInput" placeholder="грн" onChange={HandleDeliveryPrice} value={delivery_price} style={{marginTop:"10px"}} />
                        </div>
                         <div className="characteristicDescriptionCar">
                                <label htmlFor="" style={{ marginBottom: "10px" }}>Звідки?<span style={{ color: "red", marginLeft: "4px" }}>*</span></label><br />
                            <input type="text" className="editInput" placeholder="Луцьк" onChange={HandleFromCity} value={from_city} style={{marginTop:"10px"}} />
                            </div>
                            <div className="characteristicDescriptionCar">
                                <label htmlFor="" style={{ marginBottom: "10px" }}>Куди?<span style={{ color: "red", marginLeft: "4px" }}>*</span></label><br />
                            <input type="text" className="editInput" placeholder="Львів" onChange={HandleToCity} value={to_city} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Додаткова інформація<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <textarea type="text" className="editInput" onChange={HandleDescription} value={description} placeholder="опис" style={{ marginLeft: "0", marginTop: "10px" }} name="" id=""></textarea> 
                        </div>
                        </div>
                       <button className="editBtn" onClick={addVehicle} style={{ border:"none",width:"99%",margin:"0"}}>Додати транспорт</button>
                        </form>
                </div></div>}
                 {isEdit && <div className="AddVehicle" style={{height:"550px"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h3>Змінити характеристики транспорту</h3> <img src={close} alt="" className="icon" style={{ marginLeft: "auto", height: "30px" }} onClick={HandleEdit} />
                    </div>
                    <form style={{background:"none"}}>
                        <div className="formAddVehicle">
                            <div className="characteristicDescriptionCar">
                                <label htmlFor="" style={{ marginBottom: "10px" }}>Тип транспорту<span style={{ color: "red", marginLeft: "4px" }}>*</span></label><br />
                            <input type="text" className="editInput" placeholder={SelectedCar.type} onChange={HandleTypeOfVehicle} value={typeOfVehicle} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Марка<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleBrand}  placeholder={SelectedCar.brand} value={brand} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Модель<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleModel} value={model}  placeholder={SelectedCar.model} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Рік випуску<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="next" className="editInput"  onChange={HandleYear} value={year}  placeholder={SelectedCar.year} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Вантажопідйомність<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="next" className="editInput" onChange={HandleCapacity} value={capacity} placeholder="т" style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Об'єм кузова<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleVolume} value={volume}  placeholder="м2" style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Номер авто<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandlePlateNumber} placeholder={SelectedCar.plate_number} value={plate_number} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Статус<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <input type="text" className="editInput" onChange={HandleStatus} placeholder={SelectedCar.status} value={status} style={{marginTop:"10px"}} />
                        </div>
                        <div className="characteristicDescriptionCar"><label htmlFor="" style={{marginBottom:"10px"}}>Додаткова інформація<span style={{ color: "red",marginLeft:"4px"}}>*</span></label><br/>
                            <textarea type="text" className="editInput" onChange={HandleDescription} value={description} placeholder={SelectedCar.description} style={{ marginLeft: "0", marginTop: "10px" }} name="" id=""></textarea> 
                        </div>
                        </div>
                       <button className="editBtn" onClick={EditCar} style={{ border:"none",width:"99%",margin:"0"}}>Змінити</button>
                        </form>
                </div>}
                {nav == "payments" && <div style={{padding:"0px 20px 20px 20px"}}>
                    {!bill?.users_user_id ? <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"80px"}}> <div><p style={{ margin: "0", padding:"0",fontWeight:"600",fontSize:"20px"}}>У вас немає рахунку</p><br/><button className="createBill" onClick={()=>{setCreateBill(!createBill)}}>Створити рахунок</button></div></div> : <div>
                    <h3>Мій рахунок</h3>
                    <div className="bill">
                        <img src={bank} style={{ height: "60px" }} alt="" />
                        <div style={{marginLeft:"20px"}}>
                            <p className="titlePayment">{bill?.bill_title}</p>
                            <p className="walletNumber">{bill?.bill_number}</p>
                            <p  className="initialsInfo" style={{fontSize:"16px"}}> Створено: {formatedDate(bill?.create_at)}</p>
                        </div>
                        <div style={{marginLeft:"100px"}}>
                            <p className="initialsInfo" style={{fontSize:"16px"}} >Баланс</p>
                                <p className="walletNumber" style={{ color: "green", fontSize: "28px" }}>{bill?.balance}грн.</p>
                        </div>
                        <button className="debit" onClick={()=>{setIsDep(!Isdep)}}>Поповнити рахунок</button>
                    </div>
                    <div className="PaymentsHistory">
                            <h3 className="HistoryPaymentsTitle" >Історія платежів</h3>
                            <div className="colmuns"><p className="colmun">№</p><p className="colmun" style={{paddingRight:"180px"}}>Дата</p><p className="colmun">Тип</p><p className="colmun">Сума</p><p className="colmun">Статус</p></div>
                            <div className="payments">
                                {payments.length < 1 ? <p>У вас немає платежів</p> : payments.map((pay,index) => (
                                    <div className="payment"><span className={pay?.sender_id == user?.user_id ? "red" : "green"}></span><div className={pay?.sender_id == user?.user_id ? "minus" : "plus"}><p className="colmun" style={{ fontWeight: "600" }}>{index + 1}</p><p className="colmun" style={{ fontWeight: "600", paddingLeft: "30px" }}>{formatedDate(pay?.pay_date)}<br /> <span className="colmun" style={{ color: "gray", marginLeft: "10px" }}>{formatedTime(pay?.pay_date)}</span></p><img src={pay?.sender_id == user?.user_id ? deliveryIcon : walletIcon} alt="" style={{ height: "60px" }} /><p className="colmun" style={{ fontWeight: "600" }} >{pay?.type}</p><p className={pay?.sender_id == user?.user_id ? "minusPay" : "plusPay"} style={{fontWeight:"600"}}>{pay?.sender_id == user?.user_id ? "-" : "+"} {pay?.amount}грн</p><p className="colmun" style={{ display: "flex", alignItems: "center", backgroundColor: "#c5fcbc", padding: "10px 10px", borderRadius: "10px", color: "green", boxSizing: "border-box", height: "max-content", marginTop: "10px" }}><img src={galochka} className="icon" />{pay?.status}</p></div></div>
                                ))}
                            </div>
                    </div></div>}
                </div>}
                {createBill && <div className="wrapper">
                    <div className="CreateBillModal">
                        <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
                            <h3 style={{marginLeft:"0"}}>Створити рахунок</h3> <img src={close} alt="" className="icon" style={{ marginLeft: "auto", height: "30px" ,marginRight:"0"}} onClick={() => { setCreateBill(!createBill) }} />
                        </div>
                        <p className="tip">Заповніть інформацію для створення рахунку</p>
                        <form action="" style={{backgroundColor:"white",padding:"0"}}>
                            <div>
                            <label htmlFor="" className="lableBill">Назва рахунку</label><br/>
                            <input type="text" placeholder="Oсновний рахунок" className="billInp" onChange={HandleBillTitle}/>
                            </div>
                             <div>
                                   <label htmlFor="" className="lableBill">Номер рахунку</label><br/>
                                <input type="text" className="billInp"  onChange={HandleBillNumber} placeholder="4444 3333 2222 1111"/>
                                <p className="tip">Ви можете залишити згенерований номер або придумайте власний</p>
                            </div>
                            <button className="EditBTN" style={{width:"100%",borderRadius:"8px",marginTop:"10px"}} onClick={createBillS}>створити рахунок</button>
                        </form>
                    </div>
                </div>}
                {Isdep&&<div className="wrapper"><div className="paymentCard">
                               <div style={{display:"flex"}}>
                                                        <div>
                                                   <h4 style={{fontSize:"26px",margin:"0"}}>Поповнити рахунок</h4>
                                                           <p style={{
                                                               margin: "0", padding: "0", marginTop: "10px",marginBottom:"10px",color:"gray",fontSize:"14px"
                                                   }}>Будь ласка,перевірте номер рахунку та суму платежу перед поповненням</p></div>
                                                         <img src={close}  style={{height:"30px"}} className="icon" onClick={()=>{setIsDep(!Isdep)}}  alt="" />
                    </div>
                    <form action="" style={{backgroundColor:"#ffffff"}} onSubmit={deposit}>
                         <div>
                        <label htmlFor="" className="lableBill">Номер рахунку</label><br/>
                        <input type="text" className="billInp" onChange={HandleDepNumber} value={depBill_num} />
                    </div>
                    <div>
                        <label htmlFor=""  className="lableBill">Сума поповнення</label><br/>
                        <input type="text" className="billInp" onChange={HandleDepSum} value={depSum}/>
                        </div>
                         <button className="EditBTN" style={{width:"100%",borderRadius:"8px",marginTop:"10px"}}>поповнити рахунок</button>
                    </form>
                                            
                </div></div>}
                {isEditPhoto && <div className="wrapper" style={{height:"980px"}}><div className="paymentCard" style={{ left:"40%",top:"20%"}}>
                     <div class="modal-header">
                        <h2 style={{marginRight:"60px"}}>Зміна аватарки</h2>
                         <img src={close}  style={{height:"30px"}} className="icon" onClick={()=>{setIsEditPhoto(!isEditPhoto)}}  alt="" />
    </div>
    <div className="update-avatar">
                        <img src={tepmImg} className="avatar" style={{marginBottom:"20px",marginTop:"20px"}} alt="" /><br/>
                         <input
            type="file"
            id="avatarInput"
                            accept="image/*"
                               onChange={handleFileChange}
            hidden
          />
                        <label for="avatarInput" className="lableAvatar">обрати фото</label>
                    </div>
                    <button onClick={uploadAvatar} className="buttonUploadPhoto">Оновити фото</button>
                        
                </div></div>}
            </section>
        </main>
        <Footer/>
    </>

    )
}
export default Profile;

