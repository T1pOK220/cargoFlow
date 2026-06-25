import { useState} from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom"
import * as Api from "../api/Api.jsx";
import { useNavigate } from "react-router-dom";
import eyeHide from "../assets/hiddenOrangeEye.png";
import eyeOpen from "../assets/orangeEye.png";
function Registration() {
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
        const [showPass, setShowPass] = useState("");
    const navigate = useNavigate();
    const HandleLast_name = (e) => {
        setLast_name(e.target.value)
    }
    const HandlePhone = (e) => {
        setPhone(e.target.value);   
    }
    const HandleName = (e) => {
        setName(e.target.value)
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    const HandleEmail = (e) => {
        setEmail(e.target.value)
    }
    const send = async (e) => {
        e.preventDefault();
        console.log(name)
        console.log(last_name)
        console.log(phone)
        console.log(email)
        console.log(password)
        const FormBody = {
            name: name,
            phone:phone,
            last_name: last_name,
            email: email,
            password:password
        }
        try {
            const data = await Api.registration(FormBody);
            if (data.statusCode == 200) {
                setEmail("");
            setPassword("");
            setName("");
            setLast_name("");
                setPhone("");
                navigate("/login")
            }
         }
        catch (error) {
            console.log(error);
        }
    }
    return (<div className="backgroundRegistration"><div className="boxForm"><div className="LogoBox"><Logo /></div><div className="contentBox"><p className="welcome">Приєднайтесь до CargoFlow</p></div><div className="contentBox"><p className="des">Зареєструйтесь шоб розпопочати достваляти</p></div>
        <form action="" onSubmit={send}>
            <div className="contentBox"><h6>Реєстрація</h6></div>
            <div className="inputBox"><label htmlFor="">Ім'я</label><br />
                <input type="text" onChange={HandleName}  className="logInp"/></div>
            <div className="inputBox"><label htmlFor="">Прізвище</label><br /><input type="text" onChange={HandleLast_name} className="logInp" /></div>
            <div className="inputBox"><label htmlFor="">Email</label><br /><input type="email" onChange={HandleEmail} className="logInp" /></div>
            <div className="inputBox"><label htmlFor="">Номер телефону</label><br /><input type="text" onChange={HandlePhone} className="logInp" /></div>
            <div className="inputBox"><label htmlFor="">Пароль</label><br /><input type={showPass=="login"?"text":"password"} onChange={HandlePassword} className="logInp" />{showPass=="login"?<img src={eyeHide} style={{ position: "absolute", left:"885px",bottom:"33px"}}onClick={()=>{setShowPass("")}}/>:<img src={eyeOpen} style={{ position: "absolute",left:"885px",bottom:"33px"}} onClick={()=>{setShowPass("login")}}/> }</div>
            <div className="contentBox"><button className="btnLogin">Зареєструватись</button></div>
        </form><div className="contentBox"><p className="HaventAcount">У вас вже акаунт?<Link to="/Login">Увійти</Link></p></div></div></div>)
}
export default Registration;