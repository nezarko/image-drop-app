const SectionDate = ({ date  , title}) => {

    return (
        <div className="section-number">
            <div className="section-numberT">
                <span className="dash">_</span>
                {date.toLocaleString("default", { month: "short" })}{" "}
                {date.getDate()}
            </div>
            <h1 className="title">
                <div className="title">{title} </div>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
            </h1>
        </div>

    )
}

export default SectionDate ;