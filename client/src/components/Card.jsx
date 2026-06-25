function Card({img,h4,p}) {
    return (<div className="card">
       
        <div> <img src={img} alt="" /></div>
        <div> <h4>{h4}</h4></div>
        <hr />
        <div><p>{p}</p></div>
    </div>)
}
export default Card;