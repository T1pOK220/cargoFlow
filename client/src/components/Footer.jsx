import { Link } from "react-router-dom";
import envelop from "../assets/envelop.png";
import phone from "../assets/phone.png"
import tictok from "../assets/tikTok.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
function Footer() {
    return (
    <footer>
        <div className="ready">
            <h6>
              ГОТОВІ ПОЧАТИ?
            </h6>
            <p>Зареєструйтесь на CargoFlow та почніть знаходити вантажі та транспорт вже сьогодні!</p>
            <Link className="toKnowMore" to="/registration">Зареєструватись</Link>
        </div>
        <hr className="line"/>
        <div className="contactInfo">
                <div><img src={envelop} /><p>Email:cargoFlow@gmail.com</p></div>
            <div><img src={phone} /><p>Телефон:+38033266667</p></div>
                <div><div className="circleIcon"><img src={tictok} alt="" /></div>
                    <div className="circleIcon"><img src={instagram} alt="" /></div>
                    <div className="circleIcon"><img src={facebook} alt="" /></div>
              </div>
        </div>
        <div className="blacTriangleFooter"></div>
    </footer>)
}
export default Footer;