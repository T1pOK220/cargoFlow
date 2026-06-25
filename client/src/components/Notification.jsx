import chek from "../assets/chek.png";
import cancle from "../assets/cancle.png";
import close from "../assets/close.png"
import { useEffect, useState } from "react";
function Notification({obj}) {
    const [isSucces, setIsSucces] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!obj) return;
        setIsSucces(obj?.succes)
        console.log(obj.succes)
    const idTime = setInterval(() => {
        setCount(prev => {
            if (prev >= 10) {
                clearInterval(idTime);
                return prev;
            }
            console.log("Сповіщення",count)
            return prev + 1;
        });
    }, 1000);
    return () => clearInterval(idTime);
}, []);
    return (<>
        {count <= 10 && <div className={!isSucces ? "notifyFailedBox" : "notifySuccesBox"}><img className="notifyImg" src={!isSucces ? cancle : chek} alt="" /><div><h5 style={{ margin: "0", color:"black", fontSize:"20px",fontWeight:"600"}}>{obj?.title }</h5><p style={{margin:"0",padding:"0",color:"gray", marginTop:"10px"}}>Сталася помилка.Спробуйте ще раз</p></div><img className="closeIcon" onClick={()=>{setCount(11)}} src={close} alt="" /></div>}
    </>)
}
export default Notification;