import { useState } from "react";
import Logo from "../components/Logo";
import {Link} from "react-router-dom"
import { useAuth } from "../hooks/useAuth.jsx";
import eyeHide from "../assets/hiddenOrangeEye.png";
import eyeOpen from "../assets/orangeEye.png";
// import Notification from "../components/Notification.jsx";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [showPass, setShowPass] = useState("");
    const { error } = useAuth();
    // const [objd, setObjs] = useState()
    // const obj = {
    //     sucess: false,
    //     title:"Невірний пароль"
    // }
    const HandleEmail = (e) => {
        setEmail(e.target.value);
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    const send = async (e) => {
        e.preventDefault();
       try {
           if (email == "" || password == "") throw new Error("Поле пусте");
           console.log(email);
           console.log(password);
           const FormBody = {
               email: email,
               password:password
           }
           const data = await login(FormBody);
           console.log(data);
       } catch (error) {
        console.log(error)
       }
    }

    return (<div className="backgroundLogin"><div className="boxForm"><div className="LogoBox"><Logo /></div><div className="contentBox"><p className="welcome">З Поверненям!</p></div><div className="contentBox"><p className="des">увійдіть щоб мати змогу керувати оголошенянми</p></div>
        <form action="" onSubmit={send}>
            <div className="contentBox"><h6>Вхід</h6></div>
            <div className="inputBox"><label htmlFor="">Email</label><br />
                <input type="email" onChange={HandleEmail} className="logInp"/></div>
            <div className="inputBox"><label htmlFor="">Пароль</label><br /><input type={showPass=="login"?"text":"password"} onChange={HandlePassword} className="logInp" />{showPass=="login"?<img src={eyeHide} style={{ position: "absolute", left:"908px",bottom:"250px"}}onClick={()=>{setShowPass("")}}/>:<img src={eyeOpen} style={{ position: "absolute",left:"908px",bottom:"250px"}} onClick={()=>{setShowPass("login")}}/> }</div>
            <div className="contentBox"><button className="btnLogin">Увійти</button></div>
        </form><div className="contentBox"><p className="HaventAcount">Немає акаунту?<Link to="/registration">Зареєструватись</Link></p></div></div>
        {/* {error && <Notification obj={obj}/>} */}
    </div>
    )
}
export default Login;