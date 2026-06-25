
function Title({title,color}) {
    return (<div className="headerBen"><hr /><h5 style={{ color: `${color}`,margin:"16px 16px 16px 16px" }}>{title}</h5><hr /></div>)
}
export default Title;