import { Link } from "react-router-dom";
function MoreBtn({ id }) {
    return (
        <Link className="more" to={`cargo/${id}`}>Детальніше</Link>
    )
}
export default MoreBtn;