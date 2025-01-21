import React from "react";
import Fade, { FadeProps } from "../Fade/Fade";
import { useInView } from "react-intersection-observer";
import throttle from "../../helpers/throttle";

type Props = {
    whileInView: () => void,
} & FadeProps;

const ScrollEnd = React.memo((props: Props) => {
    const { whileInView, ...fadeProps } = props;
    const [ref, isInview] = useInView({ threshold: 0.1 });

    React.useEffect(() => {
        if (isInview) {
            throttle(whileInView, 2000);
        }
    }, [isInview, whileInView])

    return <Fade
        {...fadeProps}
        ref={ref} />
});

export default ScrollEnd;