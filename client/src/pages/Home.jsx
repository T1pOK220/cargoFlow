import Header from "../components/Header";
import { Link } from "react-router-dom";
import aboutUs from "../assets/AboutUs3.png";
import Card from "../components/Card";
import search from "../assets/search.png";
import payment from "../assets/payments.png";
import safety from "../assets/safety.png";
import app from "../assets/app.png";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
function Home() {
  const {isAuthorizated}=useAuth()
  return (<>
    <section className="Hero"><div className="blackBox"></div><div className="orangeBox"></div><Header /><div className="blackTriangle"></div><div className="blackBigTriangle"></div>
      <div className="description"><h2>LOGISTIC SERVICE</h2><p>це онлайн платформа,яка допомагає
        логістичним компаніям,
        перевізниками,замовникам швидко 
        знаходити вантажі та транспорт </p>
        <Link className="toKnowMore">Дізнатись більше</Link>
      </div>
    </section>
    <main className="mainContent">
      <section className="aboutUs">
        <div> <hr /><h3>ПРО НАС</h3><hr /></div>
        <div><div><p><b>CargoFlow</b>-це інноваційна онлайн платформа,на якій ви можете розміщувати оголошення про перевезення вантажу або вільний транспорт</p>
         <Link className="toKnowMore">Дізнатись більше</Link>
        </div>
          <img src={aboutUs} alt="" />
        </div>
      </section>
      <section className="benefits">
        <div className="headerBen"><hr /><h5>ПЕРЕВАГИ CARGOFLOW</h5><hr /></div>
        <div className="cards"><Card img={search} h4={"Пошук вантажів"} p={"Швидке знаходження вантажів та транспорту"} />
        <Card img={safety} h4={"Рейтинг перевізників"} p={"Тільки надійні перевізники і високий рейтнг"} />
        <Card img={payment} h4={"Безпечні платежі"} p={"Проста та надійна банківська система"} />
          <Card img={app} h4={"Зручний додаток"} p={"Швидкий доступ до оголошень у два тапи"} /></div>
        <div className="orangreSmallTriangle"></div>
      </section>
    </main>
    <Footer/>
    </>)
}
export default Home;