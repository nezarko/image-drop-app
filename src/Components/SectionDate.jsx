import "../App.css";
import ZoomTarget from '../Components/zoomTarget'
const SectionDate = ({ date  , title}) => {

    return (
        <div className="section-number">
            <span class="dot"></span>
            <div className="section-numberT">
            
                {date.toLocaleString("default", { month: "short" })}{" "}
                {date.getDate()}
            </div>
           {/* <ZoomTarget  title={title}/> */}
        </div>

    )
}

export default SectionDate ;