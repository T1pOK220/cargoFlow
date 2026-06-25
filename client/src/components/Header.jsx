import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../hooks/useAuth";
import locationFrom from "../assets/locationFrom.png"
import { useNavigate } from "react-router-dom";
function Header() {
    const { user,isAuthorizated} = useAuth();
    const navigate = useNavigate();
    console.log(user);
    return (<>
        <header>
            <Logo/>
            <nav className="navigation"><Link to="/" className="link">Головна</Link><Link className="link" to="/cargos">Вантажі</Link><Link className="link" to="/cargos/create">Створити вантаж</Link><Link className="link" to="/vehicles">Транспорт</Link>{!isAuthorizated ? <Link className="login-btn" to="/login">Увійти</Link> : <div className="boxProfile" onClick={()=>{navigate("/profile")}} ><img src={`http://localhost:5000${user?.avatar_url}`} alt="" className="avatarka" />{user?.name} {user?.last_name}</div> }</nav>
        </header>
    </>)
}
export default Header;