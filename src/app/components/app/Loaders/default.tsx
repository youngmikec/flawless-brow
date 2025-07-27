import { FC } from "react";
import Lottie from "lottie-react";

type Props = {
    data: any;
    loop: boolean;
    style: any;
}

const LottieLoader: FC<Props> = ({ data, loop = true, style = {}}) => {

    return (
        <>
            <Lottie 
                animationData={data} 
                loop={loop}
                style={style} 
            />
        </>
    )
}

export default LottieLoader;