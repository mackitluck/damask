import { useState } from "react";
import squareplaceholder from "../../../Assets/img/Square-placeholder.png";
import rectangleplaceholder from "../../../Assets/img/rectangle-placeholder.png";

const LazyImage = (props: any) => {
    const [loaded, setLoaded] = useState(false)
    const imageStyle = !loaded ? { display: "none" } : {};
    if (props?.src?.split("/").length >= 4) {
        if (props.type === "square") {
            return (
                <>
                    {!loaded && <img src={squareplaceholder} />}
                    <img {...props} style={imageStyle} onLoad={() => setLoaded(true)} />
                </>
            );
        }
        if (props.type === "rectangle") {
            return (
                <>
                    {!loaded && <img src={rectangleplaceholder} />}
                    <img {...props} style={imageStyle} onLoad={() => setLoaded(true)} />
                </>
            );
        }
        else {
            return (
                <>
                    {!loaded && <img src={squareplaceholder} />}
                    <img {...props} style={imageStyle} onLoad={() => setLoaded(true)} />
                </>
            );
        }
    }
    else {
        return (<img src={squareplaceholder} />);
    }
};

export default LazyImage;
